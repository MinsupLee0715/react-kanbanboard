import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getClassInfoRequest } from '../actions/classroom';
import { getClassStudentRequest } from '../actions/classroom';
import {
  getKanbanListRequest,
  getKanbanRequest,
  putKanbanStatusRequest
} from '../actions/kanban';
import { getFeedbackRequest } from '../actions/feedback';

import KanbanInfo from '../components/KanbanInfo';
import KanbanAdd from '../components/KanbanAdd';

import { Row, Col, Button, message, Switch, Spin } from 'antd';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import type {
  DraggableStyle,
    DroppableProvided,
    DroppableStateSnapshot,
    DraggableProvided,
    DraggableStateSnapshot,
    DropResult
} from 'react-beautiful-dnd';

type Item = {|
  id: string,
    title: string,
      date: String
        |}

// a little function to help us with reordering the result(결과 재정렬을 돕는 함수)
const reorder = (startIndex, endIndex, list, list2) => {

  if (!list2) { /* 같은 라인에서 이동했을 시 */
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;

  } else { /* 다른 라인으로 이동했을 시 */
    const result = Array.from(list);
    const result2 = Array.from(list2);
    const [removed] = result.splice(startIndex, 1);
    result2.splice(endIndex, 0, removed);

    return [result, result2];
  }
};

// using some little inline style helpers to make the app look okay(보기좋게 앱을 만드는 인라인 스타일 헬퍼)
const grid = 8;

// Item -> Kanban
const getItemStyle = (draggableStyle: ?DraggableStyle, isDragging: boolean): Object => ({
  // some basic styles to make the items look a bit nicer(아이템을 보기 좋게 만드는 몇 가지 기본 스타일)
  userSelect: 'none',
  padding: grid * 2,

  // change background colour if dragging(드래깅시 배경색 변경)
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables(드래그에 필요한 스타일 적용)
  ...draggableStyle,

  margin: draggableStyle && draggableStyle.margin ? draggableStyle.margin : `${ grid }px`,
  boxShadow: 'lightgrey 0px 1px 2px'
});

// List -> Swimlane
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'rgba(207,216,220,.2)',
  padding: `${ grid }px 0`,
  minHeight: 700,
  width: '100%',
  float: 'left'
});


class KanbanBoard extends Component<*, State> {

  constructor(props) {
    super(props);

    this.state = {

      title: '',
      divide: '',
      classID: '',
      projectTitle: '',

      loading: false,

      students: '',

      todo: [],
      doing: [],
      feedback: [],
      finish: [],

      kanbanInfo: {
        id: '',
        title: '',
        content: '',
        updated_date: '',
        filename: '',
        score: 0,
        kstatus: '',
        feedback: null,
        status: false // visible
      },
      kanbanAddInfo: {
        status: false // visible
      }
    }

    this.setInitialize = this.setInitialize.bind(this);
    this.handleKanbanAddClick = this.handleKanbanAddClick.bind(this);
    this.handleKanbanClick = this.handleKanbanClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.setItems = this.setItems.bind(this);
    this.getClassInfo = this.getClassInfo.bind(this);
    this.getKanbanList = this.getKanbanList.bind(this);
  }

  componentDidMount() {
    let pathname = this.props.history.location.pathname;
    let pathSplit = pathname.split('/');

    for (let i in this.props.project.project) {
      if (this.props.project.project[i].projectID == pathSplit[4]) {
        this.setState({ projectTitle: this.props.project.project[i].title });
        break;
      }
    }

    this.setState({ classID: pathSplit[2] }, () => {
      this.getClassInfo();
    });

    this.getKanbanList();
    this.getProjectStudent();
  }

  getClassInfo() {
    this.props.getClassInfoRequest(this.state.classID)
      .then(() => {
        if (this.props.getClassInfo.status === "SUCCESS") {
          this.setState({
            title: this.props.getClassInfo.info.title,
            divide: this.props.getClassInfo.info.divide
          });
        }
      });
  }

  setInitialize() {
    this.setState({
      todo: [],
      doing: [],
      feedback: [],
      finish: []
    });
  }

  // 서버로부터 학생 정보를 가져온다.
  getProjectStudent() {
    let project;
    let pathname = this.props.history.location.pathname;
    let pathSplit = pathname.split('/');

    if (this.props.currentUser.type === 'professor') {
      project = pathSplit[4];
    } else if (this.props.currentUser.type === 'student') {
      project = this.props.project.project[0].projectID;
    }

    let classID = this.state.classID;

    this.props.getClassStudentRequest(classID)
      .then(() => {
        if (this.props.getStudents.status === "SUCCESS") {
          console.log("학생 목록 가져옴");
          let studentList = this.props.getStudents.student;
          let students = '';

          for (let i in studentList) {
            if (studentList[i].projectID == project) {
              if (students == '')
                students = studentList[i].name;
              else
                students += ', ' + studentList[i].name;
            }
          }
          this.setState({ students: students })
        }
      });
  }

  // 서버로부터 칸반 정보를 가져온다.
  getKanbanList() {
    let project;
    let pathname = this.props.history.location.pathname;
    let pathSplit = pathname.split('/');

    if (this.props.currentUser.type === 'professor') {
      project = pathSplit[4];
    } else if (this.props.currentUser.type === 'student') {
      project = this.props.project.project[0].projectID;
    }

    this.setInitialize();

    if (project) {
      // 칸반 리스트 가져오기
      this.setState({ loading: true });
      this.props.getKanbanListRequest(project)
        .then(() => {
          this.setState({ loading: false });
          if (this.props.kanban.status === "SUCCESS") {
            message.success('칸반을 불러왔습니다.');
            this.setItems(this.props.kanban.kanbanList);
          }
        });
    }
  }

  // 칸반 정보를 종류별로 분류한다.
  setItems(kanbanList) {
    let todo = [];
    let doing = [];
    let feedback = [];
    let finish = [];

    kanbanList.forEach(e => {
      switch (e.status) {
        case "TODO":
          todo.push({
            id: e.created_date,
            title: e.title,
            date: e.updated_date
          });
          break;
        case "DOING":
          doing.push({
            id: e.created_date,
            title: e.title,
            date: e.updated_date
          });
          break;
        case "FEEDBACK":
          feedback.push({
            id: e.created_date,
            title: e.title,
            date: e.updated_date
          });
          break;
        case "FINISH":
          finish.push({
            id: e.created_date,
            title: e.title,
            date: e.updated_date
          });
          break;
        default: break;
      }

      this.setState({ todo, doing, feedback, finish });
    });
  }


  // 칸반 추가 버튼(+) 클릭 시, 팝업
  handleKanbanAddClick() {
    this.setState({
      kanbanAddInfo: { status: true }
    });
  }

  // 칸반 클릭 시, 칸반 불러오기
  handleKanbanClick(e) {
    let kanbanID = e.currentTarget.id;
    if (kanbanID) {
      this.setState({ loading: true });
      // 칸반 불러오기
      this.props.getKanbanRequest(kanbanID)
        .then(() => {
          if (this.props.kanbanInfo.status === 'SUCCESS') {
            this.setState({ loading: false });

            // 칸반의 피드백(comment) 불러오기
            this.props.getFeedbackRequest(kanbanID)
              .then(() => {
                if (this.props.getFeedback.status === "SUCCESS") {
                  this.setState({
                    kanbanInfo: {
                      id: this.props.kanbanInfo.kanban[0].created_date,
                      title: this.props.kanbanInfo.kanban[0].title,
                      content: this.props.kanbanInfo.kanban[0].content,
                      updated_date: this.props.kanbanInfo.kanban[0].updated_date,
                      filename: this.props.kanbanInfo.kanban[0].filename,
                      score: this.props.kanbanInfo.kanban[0].score,
                      kstatus: this.props.kanbanInfo.kanban[0].status,
                      feedback: this.props.getFeedback.feedback,
                      status: true
                    }
                  });
                }
              });
          } else {
            message.error('문제 발생');
          }
        });
    }
  }

  // 칸반 정보 팝업 닫기
  handleCancel() {
    this.setState({
      kanbanInfo: {
        id: '',
        title: '',
        content: '',
        feedback: null,
        status: false
      },
      kanbanAddInfo: {
        status: false
      }
    });
  };


  /* 드래그 후 드랍 했을 시 */
  onDragEnd = (result: DropResult) => {

    try {
      console.log(result.draggableId + ": " + result.source.droppableId + "->" + result.destination.droppableId);
    } catch (e) { }

    // dropped outside the list(리스트 밖으로 드랍한 경우)
    if (!result.destination) {
      return;
    }


    // 1st -> 1st or 2nd -> 2nd or 3rd -> 3rd (같은 라인에서 이동할 경우)
    if (result.source.droppableId === result.destination.droppableId) {
      let todo, doing, feedback;

      switch (result.source.droppableId) {

        case 'droppable-1':
          todo = reorder(
            result.source.index,
            result.destination.index,
            this.state.todo,
          );
          this.setState({
            todo
          });
          break;

        case 'droppable-2':
          doing = reorder(
            result.source.index,
            result.destination.index,
            this.state.doing,
          );
          this.setState({
            doing
          });
          break;

        case 'droppable-3':
          feedback = reorder(
            result.source.index,
            result.destination.index,
            this.state.feedback,
          );
          this.setState({
            feedback
          });
          break;

        default: break;
      }
      return;
    }

    if (!window.confirm("상태를 변경하시겠습니까?")) {
      return;
    }


    let change = [];

    // 1st Lane -> 2nd Lane
    if (result.source.droppableId === 'droppable-1' && result.destination.droppableId === 'droppable-2') {
      this.props.putKanbanStatusRequest(this.state.classID, result.draggableId, 'DOING')
        .then(() => {
          if (this.props.putStatus.status === 'SUCCESS') {
            message.success('상태를 변경하였습니다.');
            change = reorder(
              result.source.index,
              result.destination.index,
              this.state.todo,
              this.state.doing
            );
            this.setState({
              todo: change[0],
              doing: change[1]
            });
          }
        });
    }

    // 2nd Lane -> 3rd Lane
    if (result.source.droppableId === 'droppable-2' && result.destination.droppableId === 'droppable-3') {
      this.props.putKanbanStatusRequest(this.state.classID, result.draggableId, 'FEEDBACK')
        .then(() => {
          if (this.props.putStatus.status === 'SUCCESS') {
            message.success('상태를 변경하였습니다.');
            change = reorder(
              result.source.index,
              result.destination.index,
              this.state.doing,
              this.state.feedback
            );
            this.setState({
              doing: change[0],
              feedback: change[1]
            });
          }
        });
    }

    // 2nd Lane -> 1st Lane
    if (result.source.droppableId === 'droppable-2' && result.destination.droppableId === 'droppable-1') {
      this.props.putKanbanStatusRequest(this.state.classID, result.draggableId, 'TODO')
        .then(() => {
          if (this.props.putStatus.status === 'SUCCESS') {
            message.success('상태를 변경하였습니다.');
            change = reorder(
              result.source.index,
              result.destination.index,
              this.state.doing,
              this.state.todo
            );
            this.setState({
              doing: change[0],
              todo: change[1]
            });
          }
        });
    }

  }


  render() {
    return (
      <div>
        <h3>
          { this.state.title }&#40;{ this.state.divide }&#41; / { this.state.projectTitle }
          <h5>MEMBER - { this.state.students }</h5>
        </h3>
        <br />

        <Row gutter={ 16 } style={ { whiteSpace: 'nowrap', overflowX: 'auto' } }>

          <Spin spinning={ this.state.loading }>
            {/* DragDropContext > Droppable > Draggable */ }
            <DragDropContext onDragEnd={ this.onDragEnd }>
              <Col className='swimlane' style={ { padding: '0 8px', float: 'left' } }>
                <Droppable droppableId='droppable-1'>
                  { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                      ref={ dropProvided.innerRef }
                      style={ getListStyle(snapshot.isDraggingOver) }
                    >
                      <div
                        style={ { height: 30, padding: '0 12px' } }
                      >
                        <div style={ { display: 'flex', justifyContent: 'space-between' } }>
                          <h5>할 일 { this.state.todo.length }</h5>
                          { this.props.currentUser.type == "student" ? <Button type='primary' shape='circle' size='middle' icon='plus' onClick={ this.handleKanbanAddClick } /> : null }
                        </div>

                      </div>
                      { this.state.todo.map(item => (
                        <Draggable key={ item.id } draggableId={ item.id }>
                          { (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                            <div id={ item.id } onClick={ this.handleKanbanClick }>
                              <div
                                ref={ provided.innerRef }
                                style={ getItemStyle(
                                  provided.draggableStyle,
                                  snapshot.isDragging
                                ) }
                                { ...provided.dragHandleProps }
                              >
                                <h5>{ item.title }</h5>
                                <br />
                                <h6 style={ { textAlign: 'right' } }>{ item.date }</h6>
                              </div>
                              { provided.placeholder }
                            </div>
                          ) }
                        </Draggable>
                      )) }
                    </div>
                  ) }
                </Droppable>
              </Col>
              <Col className='swimlane' style={ { padding: '0 8px' } }>
                <Droppable droppableId='droppable-2'>
                  { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                      ref={ dropProvided.innerRef }
                      style={ getListStyle(snapshot.isDraggingOver) }
                    >
                      <div
                        style={ { height: 30, padding: '0 12px' } }
                      >
                        <h5>진행 중 { this.state.doing.length }</h5>
                      </div>
                      { this.state.doing.map(item => (
                        <Draggable key={ item.id } draggableId={ item.id }>
                          { (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                            <div id={ item.id } onClick={ this.handleKanbanClick }>
                              <div
                                ref={ provided.innerRef }
                                style={ getItemStyle(
                                  provided.draggableStyle,
                                  snapshot.isDragging
                                ) }
                                { ...provided.dragHandleProps }
                              >
                                <h5>{ item.title }</h5>
                                <br />
                                <h6 style={ { textAlign: 'right' } }>{ item.date }</h6>
                              </div>
                              { provided.placeholder }
                            </div>
                          ) }
                        </Draggable>
                      )) }
                    </div>
                  ) }
                </Droppable>
              </Col>
              <Col className='swimlane' style={ { padding: '0 8px' } }>
                <Droppable droppableId='droppable-3'>
                  { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                      ref={ dropProvided.innerRef }
                      style={ getListStyle(snapshot.isDraggingOver) }
                    >
                      <div
                        style={ { height: 30, padding: '0 12px' } }
                      >
                        <h5>피드백 { this.state.feedback.length }</h5>
                      </div>
                      { this.state.feedback.map(item => (
                        <Draggable key={ item.id } draggableId={ item.id } isDragDisabled='flase'>
                          { (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                            <div id={ item.id } onClick={ this.handleKanbanClick }>
                              <div
                                ref={ provided.innerRef }
                                style={ getItemStyle(
                                  provided.draggableStyle,
                                  snapshot.isDragging
                                ) }
                                { ...provided.dragHandleProps }
                              >
                                <h5>{ item.title }</h5>
                                <br />
                                <h6 style={ { textAlign: 'right' } }>{ item.date }</h6>
                              </div>
                              { provided.placeholder }
                            </div>
                          ) }
                        </Draggable>
                      )) }
                    </div>
                  ) }
                </Droppable>
              </Col>
              <Col className='swimlane' style={ { padding: '0 8px' } }>
                <Droppable droppableId='droppable-4' isDropDisabled='flase'>
                  { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                      ref={ dropProvided.innerRef }
                      style={ getListStyle(snapshot.isDraggingOver) }
                    >
                      <div
                        style={ { height: 30, padding: '0 12px' } }
                      >
                        <h5>완료 { this.state.finish.length }</h5>
                      </div>
                      { this.state.finish.map(item => (
                        <Draggable key={ item.id } draggableId={ item.id } isDragDisabled='flase'>
                          { (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                            <div id={ item.id } onClick={ this.handleKanbanClick }>
                              <div
                                ref={ provided.innerRef }
                                style={ getItemStyle(
                                  provided.draggableStyle,
                                  snapshot.isDragging
                                ) }
                                { ...provided.dragHandleProps }
                              >
                                <h5>{ item.title }</h5>
                                <br />
                                <h6 style={ { textAlign: 'right' } }>{ item.date }</h6>
                              </div>
                              { provided.placeholder }
                            </div>
                          ) }
                        </Draggable>
                      )) }
                    </div>
                  ) }
                </Droppable>
              </Col>
            </DragDropContext>
          </Spin>

          <KanbanInfo
            data={ this.state.kanbanInfo }
            handleCancel={ this.handleCancel }
            getKanbanList={ this.getKanbanList }
          />
          <KanbanAdd
            data={ this.state.kanbanAddInfo }
            handleCancel={ this.handleCancel }
            getKanbanList={ this.getKanbanList }
          />
        </Row>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.status.currentUser,
    project: state.project.get,
    kanban: state.kanban.getList,
    kanbanInfo: state.kanban.get,
    putStatus: state.kanban.putStatus,
    getClassInfo: state.classroom.getClassInfo,
    getStudents: state.classroom.classStudent,
    getFeedback: state.feedback.get
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    getClassInfoRequest: (classID) => {
      return dispatch(getClassInfoRequest(classID));
    },
    getKanbanListRequest: (projectID) => {
      return dispatch(getKanbanListRequest(projectID));
    },
    getKanbanRequest: (kanbanID) => {
      return dispatch(getKanbanRequest(kanbanID));
    },
    putKanbanStatusRequest: (classID, kanbanID, status) => {
      return dispatch(putKanbanStatusRequest(classID, kanbanID, status));
    },
    getClassStudentRequest: (classID) => {
      return dispatch(getClassStudentRequest(classID));
    },
    getFeedbackRequest: (kanbanID) => {
      return dispatch(getFeedbackRequest(kanbanID));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchProps)(KanbanBoard));
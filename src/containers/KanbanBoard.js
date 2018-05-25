import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import {
  getKanbanListRequest,
  putKanbanStatusRequest
} from '../actions/kanban';

import KanbanInfo from '../components/KanbanInfo';
import KanbanAdd from '../components/KanbanAdd';

import { Row, Col, Button, message, Switch } from 'antd';

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
      todo: [],
      doing: [],
      feedback: [],
      finish: [],

      kanbanInfo: {
        id: '',
        title: '',
        content: '',
        status: false
      },
      kanbanAddInfo: {
        status: false
      }
    }

    this.handleKanbanAddClick = this.handleKanbanAddClick.bind(this);
    this.handleKanbanClick = this.handleKanbanClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.setItems = this.setItems.bind(this);
    this.getKanbanList = this.getKanbanList.bind(this);
  }

  componentDidMount() {
    this.getKanbanList();
  }

  // 서버로부터 칸반 정보를 가져온다.
  getKanbanList() {
    let project = this.props.project.project[0];

    if (project.projectID) {
      // 칸반 리스트 가져오기
      this.props.getKanbanListRequest(project.projectID)
        .then(() => {
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
            id: moment(e.created_date).tz('Asia/Seoul').format().slice(0, 19),
            title: e.title,
            date: moment(e.updated_date).tz('Asia/Seoul').format().slice(0, 10)
          });
          break;
        case "DOING":
          doing.push({
            id: moment(e.created_date).tz('Asia/Seoul').format().slice(0, 19),
            title: e.title,
            date: moment(e.updated_date).tz('Asia/Seoul').format().slice(0, 10)
          });
          break;
        case "FEEDBACK":
          feedback.push({
            id: moment(e.created_date).tz('Asia/Seoul').format().slice(0, 19),
            title: e.title,
            date: moment(e.updated_date).tz('Asia/Seoul').format().slice(0, 10)
          });
          break;
        case "FINISH":
          finish.push({
            id: moment(e.created_date).tz('Asia/Seoul').format().slice(0, 19),
            title: e.title,
            date: moment(e.updated_date).tz('Asia/Seoul').format().slice(0, 10)
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
    this.setState({
      kanbanInfo: {
        id: e.currentTarget.id,
        title: 'title is updated',
        content: 'ㄲㅈ',
        status: true
      }
    });
  }

  // 칸반 정보 팝업 닫기
  handleCancel() {
    this.setState({
      kanbanInfo: {
        id: '',
        title: '',
        content: '',
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

    if (!window.confirm("상태를 변경하시겠습니까?")) {
      return;
    }

    let change = [];

    // 1st Lane -> 2nd Lane
    if (result.source.droppableId === 'droppable-1' && result.destination.droppableId === 'droppable-2') {
      this.props.putKanbanStatusRequest(result.draggableId, 'DOING')
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
      this.props.putKanbanStatusRequest(result.draggableId, 'FEEDBACK')
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
      this.props.putKanbanStatusRequest(result.draggableId, 'TODO')
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
    }
  }


  render() {
    return (
      <div>
        <h1>
          { this.props.selectedClass.title }&#40;{ this.props.selectedClass.divide }&#41; / { "프로젝트 명" }
          <h6>MEMBER - { "정화평" }</h6>
        </h1>
        <br />

        <Row gutter={ 16 }>
          {/* DragDropContext > Droppable > Draggable */ }
          <DragDropContext onDragEnd={ this.onDragEnd }>
            <div style={ { display: "inline" } }>
              <Col span={ 6 } style={ { padding: '0 8px' } }>
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
                          <h3>할 일 { this.state.todo.length }</h3>
                          <Button type='primary' shape='circle' size='middle' icon='plus' onClick={ this.handleKanbanAddClick } />
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
                                <h3>{ item.title }</h3>
                                <br />
                                <h5 style={ { textAlign: 'right' } }>{ item.date }</h5>
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
              <Col span={ 6 } style={ { padding: '0 8px' } }>
                <Droppable droppableId='droppable-2'>
                  { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                      ref={ dropProvided.innerRef }
                      style={ getListStyle(snapshot.isDraggingOver) }
                    >
                      <div
                        style={ { height: 30, padding: '0 12px' } }
                      >
                        <h3>진행 중 { this.state.doing.length }</h3>
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
                                <h3>{ item.title }</h3>
                                <br />
                                <h5 style={ { textAlign: 'right' } }>{ item.date }</h5>
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
              <Col span={ 6 } style={ { padding: '0 8px' } }>
                <Droppable droppableId='droppable-3'>
                  { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                      ref={ dropProvided.innerRef }
                      style={ getListStyle(snapshot.isDraggingOver) }
                    >
                      <div
                        style={ { height: 30, padding: '0 12px' } }
                      >
                        <h3>피드백 { this.state.feedback.length }</h3>
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
                                <h3>{ item.title }</h3>
                                <br />
                                <h5 style={ { textAlign: 'right' } }>{ item.date }</h5>
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
              <Col span={ 6 } style={ { padding: '0 8px' } }>
                <Droppable droppableId='droppable-4' isDropDisabled='flase'>
                  { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                      ref={ dropProvided.innerRef }
                      style={ getListStyle(snapshot.isDraggingOver) }
                    >
                      <div
                        style={ { height: 30, padding: '0 12px' } }
                      >
                        <h3>완료 { this.state.finish.length }</h3>
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
                                <h3>{ item.title }</h3>
                                <br />
                                <h5 style={ { textAlign: 'right' } }>{ item.date }</h5>
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
            </div>
          </DragDropContext>

          <KanbanInfo
            data={ this.state.kanbanInfo }
            handleCancel={ this.handleCancel }
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
    selectedClass: state.classroom.selectedClass.classInfo,
    project: state.project.get,
    kanban: state.kanban.getList,
    putStatus: state.kanban.putStatus
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    getKanbanListRequest: (projectID) => {
      return dispatch(getKanbanListRequest(projectID));
    },
    putKanbanStatusRequest: (kanbanID, status) => {
      return dispatch(putKanbanStatusRequest(kanbanID, status));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchProps)(KanbanBoard));
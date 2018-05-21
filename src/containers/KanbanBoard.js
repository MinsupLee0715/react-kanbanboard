import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import KanbanInfo from '../components/KanbanInfo';
import KanbanAdd from '../components/KanbanAdd';

import { Row, Col, Button } from 'antd';


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

// fake data generator(가짜 데이터 제너레이터)
const getItems = (index: number, count: number): Item[] =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `${ index }-${ k }`,
    title: `${ index }-${ k }`,
    date: ''
  }));

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
  width: '23%',
  float: 'left',
  margin: '0 10px'
});


class KanbanBoard extends Component<*, State> {

  constructor(props) {
    super(props);

    /*
    서버에서 칸반정보 받아오자
    교수일 때는 주소 :project 값으로 가져오고
    학생이면 수업id로 DB 조회하면됨
    */
    this.state = {
      items1: getItems(1, 5),
      items2: getItems(2, 5),
      items3: getItems(3, 5),
      items4: getItems(4, 3),

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
  }

  handleKanbanAddClick() {
    this.setState({
      kanbanAddInfo: { status: true }
    });
  }

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

    /* if (!window.confirm("상태를 변경하시겠습니까?")) {
      return;
    } */

    let change = [];

    // 1st Lane -> 2nd Lane
    if (result.source.droppableId === 'droppable-1' && result.destination.droppableId === 'droppable-2') {
      change = reorder(
        result.source.index,
        result.destination.index,
        this.state.items1,
        this.state.items2
      );
      this.setState({
        items1: change[0],
        items2: change[1]
      });
    }

    // 2nd Lane -> 3rd Lane
    if (result.source.droppableId === 'droppable-2' && result.destination.droppableId === 'droppable-3') {
      change = reorder(
        result.source.index,
        result.destination.index,
        this.state.items2,
        this.state.items3
      );
      this.setState({
        items2: change[0],
        items3: change[1]
      });
    }

    // 2nd Lane -> 1st Lane
    if (result.source.droppableId === 'droppable-2' && result.destination.droppableId === 'droppable-1') {
      change = reorder(
        result.source.index,
        result.destination.index,
        this.state.items2,
        this.state.items1
      );
      this.setState({
        items2: change[0],
        items1: change[1]
      });
    }

    // 1st -> 1st or 2nd -> 2nd or 3rd -> 3rd (같은 라인에서 이동할 경우)
    if (result.source.droppableId === result.destination.droppableId) {
      let items1, items2, items3;

      switch (result.source.droppableId) {

        case 'droppable-1':
          items1 = reorder(
            result.source.index,
            result.destination.index,
            this.state.items1,
          );
          this.setState({
            items1
          });
          break;

        case 'droppable-2':
          items2 = reorder(
            result.source.index,
            result.destination.index,
            this.state.items2,
          );
          this.setState({
            items2
          });
          break;

        case 'droppable-3':
          items3 = reorder(
            result.source.index,
            result.destination.index,
            this.state.items3,
          );
          this.setState({
            items3
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
              <Droppable droppableId='droppable-1'>
                { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                  <div
                    ref={ dropProvided.innerRef }
                    style={ getListStyle(snapshot.isDraggingOver) }
                  >
                    <div
                      style={ { height: 30, paddingLeft: 12 } }
                    >
                      <Row>
                        <Col span={ 20 }>
                          <h3>할 일 <small>{ this.state.items1.length }</small></h3>
                        </Col>
                        <Col span={ 4 }>
                          <Button type='primary' shape='circle' size='middle' icon='plus' onClick={ this.handleKanbanAddClick } />
                        </Col>
                      </Row>
                    </div>
                    { this.state.items1.map(item => (
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
                              <h5 style={ { textAlign: 'right' } }>{ "2018-05-05" }</h5>
                            </div>
                            { provided.placeholder }
                          </div>
                        ) }
                      </Draggable>
                    )) }
                  </div>
                ) }
              </Droppable>
              <Droppable droppableId='droppable-2'>
                { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                  <div
                    ref={ dropProvided.innerRef }
                    style={ getListStyle(snapshot.isDraggingOver) }
                  >
                    <div
                      style={ { height: 30, paddingLeft: 12 } }
                    >
                      <h3>진행 중 <small>{ this.state.items2.length }</small></h3>
                    </div>
                    { this.state.items2.map(item => (
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
                              <h5 style={ { textAlign: 'right' } }>{ "2018-05-05" }</h5>
                            </div>
                            { provided.placeholder }
                          </div>
                        ) }
                      </Draggable>
                    )) }
                  </div>
                ) }
              </Droppable>
              <Droppable droppableId='droppable-3'>
                { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                  <div
                    ref={ dropProvided.innerRef }
                    style={ getListStyle(snapshot.isDraggingOver) }
                  >
                    <div
                      style={ { height: 30, paddingLeft: 12 } }
                    >
                      <h3>피드백 <small>{ this.state.items3.length }</small></h3>
                    </div>
                    { this.state.items3.map(item => (
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
                              <h5 style={ { textAlign: 'right' } }>{ "2018-05-05" }</h5>
                            </div>
                            { provided.placeholder }
                          </div>
                        ) }
                      </Draggable>
                    )) }
                  </div>
                ) }
              </Droppable>
              <Droppable droppableId='droppable-4' isDropDisabled='flase'>
                { (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                  <div
                    ref={ dropProvided.innerRef }
                    style={ getListStyle(snapshot.isDraggingOver) }
                  >
                    <div
                      style={ { height: 30, paddingLeft: 12 } }
                    >
                      <h3>완료 <small>{ this.state.items4.length }</small></h3>
                    </div>
                    { this.state.items4.map(item => (
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
                              <h5 style={ { textAlign: 'right' } }>{ "2018-05-05" }</h5>
                            </div>
                            { provided.placeholder }
                          </div>
                        ) }
                      </Draggable>
                    )) }
                  </div>
                ) }
              </Droppable>
            </div>
          </DragDropContext>

          <KanbanInfo
            data={ this.state.kanbanInfo }
            handleCancel={ this.handleCancel }
          />
          <KanbanAdd
            data={ this.state.kanbanAddInfo }
            handleCancel={ this.handleCancel }
          />
        </Row>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo
  };
};

export default withRouter(connect(mapStateToProps)(KanbanBoard));
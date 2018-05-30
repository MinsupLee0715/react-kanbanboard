import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import {
  putKanbanInfoRequest,
  deleteKanbanRequest
} from '../actions/kanban';

import { Modal, Button, Icon, Row, Col, Divider, Input } from 'antd';
const { TextArea } = Input;

class KanbanInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isChange: false,
      title_value: '',
      content_value: ''
    };

    this.isDownload = this.isDownload.bind(this);
    this.isUpdating = this.isUpdating.bind(this);
    this.setInitialize = this.setInitialize.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleContentClick = this.handleContentClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  // 첨부파일이 있을 시 표시
  isDownload() {
    if (this.props.data.filename) {
      return (
        <React.Fragment>
          <Icon type="download" style={ { fontSize: 25, background: '#e8e8e8' } } />
          <span style={ { fontSize: 18 } }>&nbsp;&nbsp;{ this.props.data.filename }</span>
        </React.Fragment>
      )
    }
  }

  // 데이터 수정 중 표시
  isUpdating() {
    if (this.state.isChange) {
      return (
        <div className="ant-modal-header" style={ { padding: 0 } }>
          <p><strong>수정중...</strong></p>
        </div>
      )
    }
  }

  // state 초기화
  setInitialize() {
    this.setState({
      title_value: '',
      content_value: '',
      isChange: false
    });
  }

  // 제목을 클릭 시 input 으로 변경
  handleTitleClick(e) {
    this.setState({ title_value: this.props.data.title });
  }

  // 내용을 클릭 시 input 으로 변경
  handleContentClick(e) {
    this.setState({ content_value: this.props.data.content });
  }

  // input 상태 변경 시
  handleChange(e) {
    this.setState({ isChange: true });
    let nextState = {};
    nextState[e.target.id] = e.target.value;
    this.setState(nextState);
  }

  // 화면을 닫을 때 state 초기화 및 창닫기
  handleCancel() {
    if (this.state.isChange) {
      console.log('데이터 교체');
      this.setInitialize();
      this.props.handleCancel();
    } else {
      this.setInitialize();
      this.props.handleCancel();
    }
  }

  render() {
    return (
      <Modal
        visible={ this.props.data.status }
        width="800px"
        onCancel={ this.handleCancel }
        footer={ [] }
      >
        { this.isUpdating() }
        <Row gutter={ 16 }>
          <Col md={ 16 }>
            <Input
              id="title_value"
              value={ this.state.title_value == '' ? this.props.data.title : this.state.title_value }
              onChange={ this.handleChange }
              placeholder="제목을 입력하세요"
            />

            <TextArea
              id="content_value"
              value={ this.state.content_value == '' ? this.props.data.content : this.state.content_value }
              onChange={ this.handleChange }
              placeholder="내용을 입력하세요"
              autosize={ { minRows: 5, maxRows: 15 } }
            />
          </Col>

          <Col md={ 8 }>
            <h3><strong>상태<Divider type="vertical" />{ this.props.data.kstatus }</strong></h3>
            { this.isDownload() }
            <br /><br /><br /><br />
            <p>생성일 { moment(this.props.data.id).tz('Asia/Seoul').format().slice(0, 10) }</p>
            <p>업데이트 날짜 { moment(this.props.data.updated_date).tz('Asia/Seoul').format().slice(0, 10) }</p>
          </Col>
        </Row>
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    project: state.project.get.project,
    get: state.kanban.get,
    put: state.kanban.put,
    delete: state.kanban.delete
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    putKanbanInfoRequest: (kanbanID, status) => {
      return dispatch(putKanbanInfoRequest(kanbanID, status));
    },
    deleteKanbanRequest: (kanbanID, title, content, contribute) => {
      return dispatch(deleteKanbanRequest(kanbanID, title, content, contribute));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchProps)(KanbanInfo));
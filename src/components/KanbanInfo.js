import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import {
  putKanbanInfoRequest,
  deleteKanbanRequest
} from '../actions/kanban';

import { Modal, Button, Icon, Row, Col, Divider, Input, message } from 'antd';
const { TextArea } = Input;

class KanbanInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isChange: false,
      title_value: '',
      content_value: '',
      loading: false,
      updateModalVisible: false,
      deleteModalVisible: false
    };

    this.isDownload = this.isDownload.bind(this);
    this.isUpdating = this.isUpdating.bind(this);
    this.confirmUpdate = this.confirmUpdate.bind(this);

    this.setInitialize = this.setInitialize.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleModalCancel = this.handleModalCancel.bind(this);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
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

  // 데이터 수정 버튼
  confirmUpdate() {
    if (this.state.isChange) {
      return (
        <Button onClick={ this.handleUpdate }>Update</Button>
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

  // input 상태 변경 시
  handleChange(e) {
    this.setState({ isChange: true });
    let nextState = {};
    nextState[e.target.id] = e.target.value;
    this.setState(nextState);
  }

  // 화면을 닫을 때 (state 초기화 및 창닫기) 또는 (데이터 수정 확인)
  handleCancel() {
    this.setInitialize();
    this.props.handleCancel();
  }

  // 데이터 업로드 확인창
  handleUpdate() {
    this.setState({ updateModalVisible: true });
  }
  // 삭제 확인창
  handleDelete() {
    this.setState({ deleteModalVisible: true });
  }

  // 데이터 업로드 실행
  onUpdate() {
    this.setState({ loading: true });

    let kanbanID = moment(this.props.data.id).tz('Asia/Seoul').format();
    let title = this.state.title_value == '' ? this.props.data.title : this.state.title_value;
    let content = this.state.content_value == '' ? this.props.data.content : this.state.content_value;
    this.props.putKanbanInfoRequest(kanbanID, title, content, null)
      .then(() => {
        if (this.props.put.status == "SUCCESS") {
          message.success("수정되었습니다.");
          this.setState({
            updateModalVisible: false,
            deleteModalVisible: false,
            loading: false
          });
          this.setInitialize();
          this.props.handleCancel();
          this.props.getKanbanList();
        }
      });
  }

  // 삭제 실행
  onDelete() {
    this.setState({ loading: true });

    let kanbanID = moment(this.props.data.id).tz('Asia/Seoul').format();

    this.props.deleteKanbanRequest(kanbanID)
      .then(() => {
        if (this.props.delete.status == "SUCCESS") {
          message.info('삭제되었습니다.');
          this.setState({
            updateModalVisible: false,
            deleteModalVisible: false,
            loading: false
          });
          this.setInitialize();
          this.props.handleCancel();
          this.props.getKanbanList();
        }
      });
  }

  // 수정 확인 modal Cancel 시
  handleModalCancel() {
    this.setState({ updateModalVisible: false, deleteModalVisible: false });
  }

  render() {

    // 삭제 버튼
    let deleteButton = (
      <Button onClick={ this.handleDelete }>Delete</Button>
    );

    return (
      <React.Fragment>
        <Modal
          visible={ this.props.data.status }
          width="800px"
          onCancel={ this.handleCancel }
          footer={ [deleteButton, this.confirmUpdate()] }
        >
          { this.isUpdating() } {/* 수정 중 표시 */ }
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

        <Modal
          visible={ this.state.updateModalVisible }
          width="480px"
          onOk={ this.onUpdate }
          confirmLoading={ this.state.loading }
          onCancel={ this.handleModalCancel }
        >
          <h3>칸반을 수정하시겠습니까?</h3>
        </Modal>
        <Modal
          visible={ this.state.deleteModalVisible }
          width="480px"
          onOk={ this.onDelete }
          confirmLoading={ this.state.loading }
          onCancel={ this.handleModalCancel }
        >
          <h3>칸반을 삭제하시겠습니까?</h3>
        </Modal>
      </React.Fragment>
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
    putKanbanInfoRequest: (kanbanID, title, content, contribute) => {
      return dispatch(putKanbanInfoRequest(kanbanID, title, content, contribute));
    },
    deleteKanbanRequest: (kanbanID) => {
      return dispatch(deleteKanbanRequest(kanbanID));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchProps)(KanbanInfo));
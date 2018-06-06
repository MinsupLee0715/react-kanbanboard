import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import { post, get } from 'axios';

import {
  putKanbanInfoRequest,
  deleteKanbanRequest
} from '../actions/kanban';

import { Modal, Button, Icon, Row, Col, Divider, Input, message, Upload, Spin } from 'antd';
const { TextArea } = Input;


class KanbanInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      spin_loading: false,

      isChange: false,
      title_value: '',
      content_value: '',
      loading: false,
      updateModalVisible: false,
      deleteModalVisible: false,

      uploadFile: null
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

    this.onFileChange = this.onFileChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
  }

  componentDidMount() {

  }

  // 첨부파일이 있을 시 표시
  isDownload() {
    let kanbanID = moment(this.props.data.id).tz('Asia/Seoul').format().slice(0, 19);
    if (this.props.data.filename) {
      return (
        <form method="get" action={ `/api/classroom/kanban/download/${ kanbanID }` }>
          <label htmlFor="dwfile" className="btn btn-outline-secondary btn-sm"
            style={ { maxWidth: "200px", overflow: "hidden" } }>
            <Icon type="download" /> { this.props.data.filename }</label>
          <input type="submit" id="dwfile" name="dwfile" style={ { display: 'none' } } />
        </form>
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
      isChange: false,
      uploadFile: null
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
    this.setState({ loading: true, spin_loading: false });

    //let kanbanID = this.props.data.id;
    let kanbanID = moment(this.props.data.id).tz('Asia/Seoul').format();
    let title = this.state.title_value == '' ? this.props.data.title : this.state.title_value;
    let content = this.state.content_value == '' ? this.props.data.content : this.state.content_value;
    this.props.putKanbanInfoRequest(kanbanID, title, content, null)
      .then(() => {
        this.setState({ spin_loading: false, loading: false });
        if (this.props.put.status === "SUCCESS") {
          message.success("수정되었습니다.");
          this.setState({
            updateModalVisible: false,
            deleteModalVisible: false
          });
          this.setInitialize();
          this.props.handleCancel();
          this.props.getKanbanList(this.props.project[0].projectID);
        }
      });
  }

  // 삭제 실행
  onDelete() {
    this.setState({ loading: true, spin_loading: false });

    //let kanbanID = this.props.data.id;
    let kanbanID = moment(this.props.data.id).tz('Asia/Seoul').format();

    this.props.deleteKanbanRequest(kanbanID)
      .then(() => {
        this.setState({ spin_loading: false, loading: false });
        if (this.props.delete.status === "SUCCESS") {
          message.info('삭제되었습니다.');

          this.setState({
            updateModalVisible: false,
            deleteModalVisible: false
          });
          this.setInitialize();
          this.props.handleCancel();
          this.props.getKanbanList(this.props.project[0].projectID);
        }
      });
  }

  // 수정 확인 modal Cancel 시
  handleModalCancel() {
    this.setState({ updateModalVisible: false, deleteModalVisible: false });
  }

  // 업로드 할 파일 선택
  onFileChange(e) {
    this.setState({ uploadFile: e.target.files[0] });
  }
  // 업로드 실행
  onFormSubmit(e) {
    e.preventDefault();
    this.onFileUpload(this.state.uploadFile)
      .then((res) => {
        this.handleCancel();
        message.success('Success Upload');
      })
      .catch((err) => {
        message.error('Failed Upload');
      });
  }

  // 업로드 관련 정의
  onFileUpload(file) {
    const url = '/api/classroom/kanban/upload';
    const formData = new FormData();
    formData.append('kanbanID', moment(this.props.data.id).tz('Asia/Seoul').format().slice(0, 19));
    formData.append('filename', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config);
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
                value={ this.state.title_value || this.props.data.title }
                onChange={ this.handleChange }
                placeholder={ this.props.data.title }
              />

              <TextArea
                id="content_value"
                value={ this.state.content_value || this.props.data.content }
                onChange={ this.handleChange }
                placeholder={ this.props.data.content }
                autosize={ { minRows: 5, maxRows: 15 } }
              />
            </Col>

            <Col md={ 8 }>
              <h5><strong>상태<Divider type="vertical" />{ this.props.data.kstatus }</strong></h5>

              <div>
                <form onSubmit={ this.onFormSubmit } >
                  <label htmlFor="filename" className="btn btn-outline-secondary btn-sm">
                    <Icon type="upload" /> Click to Upload</label>
                  <input type='file' id='filename' name='filename'
                    onChange={ this.onFileChange }
                    style={ { display: 'none' } } />
                  <br />
                  { this.state.uploadFile
                    ? <React.Fragment>
                      { this.state.uploadFile.name }
                      <br />
                      <label htmlFor="upload" className="btn btn-outline-secondary btn-sm">Upload</label>
                      <input type='submit' id='upload' value='Upload' style={ { display: 'none' } } />
                    </React.Fragment>
                    : "파일을 선택해주세요." }
                </form>
              </div>
              <br />
              { this.isDownload() }
              <br /><br /><br /><br />
              <p>생성일 { moment(this.props.data.id).tz('Asia/Seoul').format().slice(0, 10) }</p>
              <p>업데이트 날짜 { moment(this.props.data.updated_date).tz('Asia/Seoul').format().slice(0, 10) }</p>
              {/* <p>생성일 { this.props.data.id.slice(0, 10) }</p>
              <p>업데이트 날짜 { this.props.data.updated_date.slice(0, 10) }</p> */}
            </Col>
          </Row>
        </Modal>

        <Spin spinning={ this.state.spin_loading }>
          <Modal
            visible={ this.state.updateModalVisible }
            width="480px"
            onOk={ this.onUpdate }
            confirmLoading={ this.state.loading }
            onCancel={ this.handleModalCancel }
          >
            <h5>칸반을 수정하시겠습니까?</h5>
          </Modal>
          <Modal
            visible={ this.state.deleteModalVisible }
            width="480px"
            onOk={ this.onDelete }
            confirmLoading={ this.state.loading }
            onCancel={ this.handleModalCancel }
          >
            <h5>칸반을 삭제하시겠습니까?</h5>
          </Modal>
        </Spin>
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
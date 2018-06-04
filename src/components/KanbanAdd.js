import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { postKanbanRequest } from '../actions/kanban';

import { Modal, Button, message, Divider, Input, Icon } from 'antd';
const { TextArea } = Input;
const confirm = Modal.confirm;

class KanbanAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      modalVisible: false,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
    this.showCancel = this.showCancel.bind(this);
    this.handleModalCancel = this.handleModalCancel.bind(this);
  }

  // 데이터 입력
  handleChange(e) {
    let nextState = {};
    nextState[e.target.id] = e.target.value;
    this.setState(nextState);
  }

  // 첫번째 modal에서 upload 시
  showConfirm() {
    if (this.state.title == '' || this.state.content == '')
      message.error('제목과 내용을 입력하십시오.');
    else
      this.setState({ modalVisible: true });
  }
  // 첫번째 modal에서 close 시
  showCancel() {
    this.setState({
      title: '',
      content: ''
    });
    this.props.handleCancel();
  }

  // 두번째 modal에서 OK 시
  handleAdd() {
    this.setState({ loading: true });

    let projectID = this.props.project[0].projectID;
    let title = this.state.title;
    let content = this.state.content;

    this.props.postKanbanRequest(projectID, title, content)
      .then(() => {
        this.setState({
          modalVisible: false,
          loading: false,
        });

        if (this.props.kanban.status === "SUCCESS") {
          message.success('칸반을 등록하였습니다.');
          this.showCancel();
          this.props.getKanbanList();
        }
      });
  }

  // 두번째 modal에서 Cancel 시
  handleModalCancel() {
    this.setState({ modalVisible: false });
  }

  render() {

    return (
      <React.Fragment>
        <Modal
          className='kanban-upload'
          visible={ this.props.data.status }
          title='칸반 등록 - 할 일 추가'
          width="700px"
          onCancel={ this.showCancel }
          footer={ [
            <Button key="add" type='primary' onClick={ this.showConfirm }>Upload</Button>,
            <Button key="back" type='danger' onClick={ this.showCancel }>Close</Button>
          ] }
        >
          <Input
            id='title'
            className="title kanban-input"
            placeholder="제목을 입력하세요"
            value={ this.state.title }
            onChange={ this.handleChange }
          />
          <Divider style={ { margin: "12px 0" } } />
          <div style={ { minHeight: 150 } }>
            <TextArea
              id='content'
              className="content kanban-input"
              placeholder="내용을 입력하세요"
              autosize={ { minRows: 5, maxRows: 10 } }
              value={ this.state.content }
              onChange={ this.handleChange }
            />
          </div>

        </Modal>

        <Modal
          visible={ this.state.modalVisible }
          width="520px"
          onOk={ this.handleAdd }
          confirmLoading={ this.state.loading }
          onCancel={ this.handleModalCancel }
        >
          <h5>입력한 정보로 칸반을 등록하시겠습니까?</h5>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project.get.project,
    kanban: state.kanban.post
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    postKanbanRequest: (projectID, title, content) => {
      return dispatch(postKanbanRequest(projectID, title, content));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchProps)(KanbanAdd));
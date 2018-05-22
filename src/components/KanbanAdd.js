import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal, Button, message, Divider, Input } from 'antd';
const { TextArea } = Input;

class KanbanAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.id] = e.target.value;
    this.setState(nextState);
  }

  handleAdd() {
    message.success(this.state.title);
    message.error(this.state.content);
    message.success(this.props.project[0].projectID);
  }

  render() {
    return (
      <Modal
        className='kanban-upload'
        visible={ this.props.data.status }
        title='칸반 등록 - 할 일 추가'
        width="700px"
        onCancel={ this.props.handleCancel }
        footer={ [
          <Button key="add" type='primary' onClick={ this.handleAdd }>Upload</Button>,
          <Button key="back" onClick={ this.props.handleCancel }>Close</Button>
        ] }
      >
        <Input
          id='title'
          className="title kanban-input"
          placeholder="제목을 입력하세요"
          size="large"
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project.get.project
  };
};

export default withRouter(connect(mapStateToProps)(KanbanAdd));
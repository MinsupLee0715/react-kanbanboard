import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  getKanbanRequest,
  putKanbanRequest,
  deleteKanbanRequest
} from '../actions/kanban';

import { Modal, Button } from 'antd';

class KanbanInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        visible={ this.props.data.status }
        title={ this.props.data.title }
        width="700px"
        onCancel={ this.props.handleCancel }
        footer={ [
          <Button key="back" onClick={ this.props.handleCancel }>Close</Button>
        ] }
      >
        <p>item.id : { this.props.data.id }</p>
        <p>{ this.props.data.content }</p>
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
    getKanbanRequest: (kanbanID) => {
      return dispatch(getKanbanRequest(kanbanID));
    },
    putKanbanRequest: (kanbanID, status) => {
      return dispatch(putKanbanRequest(kanbanID, status));
    },
    deleteKanbanRequest: (kanbanID) => {
      return dispatch(deleteKanbanRequest(kanbanID));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchProps)(KanbanInfo));
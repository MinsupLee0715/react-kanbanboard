import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import { postFeedbackRequest } from '../actions/feedback';

import { Modal, message, Input, Icon } from 'antd';
const { TextArea } = Input;
const confirm = Modal.confirm;

class KanbanFeedback extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      feedback_content: '',
      point: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  // 데이터 입력
  handleChange(e) {
    let nextState = {};
    nextState[e.target.id] = e.target.value;
    this.setState(nextState);
  }

  // 등록 창 close 시
  handleCancel() {
    this.setState({ feedback_content: '', point: null });
    this.props.onCancel();
  }

  // 재수행 시
  handleRedo() {
    let kanbanID = moment(this.props.kanbanID).tz('Asia/Seoul').format().slice(0, 19);

    this.props.postFeedbackRequest(kanbanID, this.state.feedback_content, "TODO", null)
      .then(() => {
        if (this.props.postFeedback.status === "SUCCESS") {
          message.info('피드백을 등록하였습니다 -> 재수행');
          this.handleCancel()
          this.props.handleCancel();
        }
      });
  }
  // 완료 시
  handleFinish() {

    let kanbanID = moment(this.props.kanbanID).tz('Asia/Seoul').format().slice(0, 19);

    this.props.postFeedbackRequest(kanbanID, this.state.feedback_content, "FINISH", this.state.point)
      .then(() => {
        if (this.props.postFeedback.status === "SUCCESS") {
          message.info('피드백을 등록하였습니다 -> 완료');
          this.handleCancel();
          this.props.handleCancel();
        }
      });
  }


  render() {

    return (
      <React.Fragment>
        <Modal
          className='feedback-upload'
          visible={ this.props.visible }
          title='피드백 등록'
          width="480px"
          onCancel={ this.handleCancel }
          footer={ [
            <button className="btn btn-outline-danger btn-sm"
              onClick={ this.handleRedo }>&lt; 재수행</button>,
            <button className="btn btn-outline-success btn-sm"
              onClick={ this.handleFinish }>완료 &gt;</button>
          ] }
        >

          <TextArea
            id="feedback_content"
            value={ this.state.feedback_content }
            onChange={ this.handleChange }
            placeholder={ "내용을 입력하세요." }
            autosize={ { minRows: 5, maxRows: 7 } }
          />

          <select class="custom-select" id="point"
            style={ { border: 0, boxShadow: 'none' } }
            onChange={ this.handleChange }
          >
            <option selected="" value={ null }>점수</option>
            <option value="1">1점</option>
            <option value="2">2점</option>
            <option value="3">3점</option>
            <option value="4">4점</option>
            <option value="5">5점</option>
            <option value="6">6점</option>
            <option value="7">7점</option>
            <option value="8">8점</option>
            <option value="9">9점</option>
            <option value="10">10점</option>
          </select>

        </Modal>
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postFeedback: state.feedback.post
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    postFeedbackRequest: (kanbanID, content, status, point) => {
      return dispatch(postFeedbackRequest(kanbanID, content, status, point));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchProps)(KanbanFeedback));
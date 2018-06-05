import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import { deleteNoticeRequest } from '../actions/notice';

import { Row, Col, Divider, message, Modal } from 'antd';

class Notices extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      date: "",
      id: "",

      loading: false,
      deleteModalVisible: false
    };

    this.onDelete = this.onDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.isProfessor = this.isProfessor.bind(this);
  }

  componentDidMount() {
    let notices = this.props.notices;
    for (let i in notices) {
      if (notices[i].date == this.props.match.params.number) {
        this.setState({
          title: notices[i].title,
          content: notices[i].content,
          date: moment(notices[i].date).tz('Asia/Seoul').format().slice(0, 10),
          id: moment(notices[i].date).tz('Asia/Seoul').format().slice(0, 19)
        });
        break;
      }
    }
  }

  onDelete() {
    this.setState({ loading: true });

    let classID = this.props.selectedClass.classID;

    this.props.deleteNoticeRequest(this.state.id)
      .then(() => {
        this.setState({ loading: false });

        if (this.props.delete.status === "SUCCESS") {
          message.success("삭제 완료.");
          this.props.history.push(`/classroom/${ classID }/notice`);
        }
      });
  }

  showModal() {
    this.setState({ deleteModalVisible: true });
  }

  isProfessor() {
    if (this.props.currentUser.type === 'professor') {
      return (
        <div style={ { textAlign: 'right' } }>
          <button type="button" className="btn btn-outline-danger"
            onClick={ this.showModal }>삭제</button>
        </div>
      );
    }
  }

  render() {

    return (
      <div style={ { maxWidth: 1024, margin: "auto" } }>
        <Divider style={ { margin: "12px 0" } } />
        <Row>
          <Col span={ 18 }>
            <h4>{ this.state.title }</h4>
          </Col>
          <Col span={ 6 } style={ { textAlign: "right" } }>
            <span>{ this.state.date }</span>
          </Col>
        </Row>

        <Divider style={ { margin: "12px 0" } } />

        <div style={ { minHeight: 150 } }>
          <pre>{ this.state.content }</pre>
        </div>
        <Divider style={ { margin: "12px 0" } } />

        { this.isProfessor() }

        <Modal
          visible={ this.state.deleteModalVisible }
          width="480px"
          onOk={ this.onDelete }
          confirmLoading={ this.state.loading }
          onCancel={ this.handleModalCancel }
        >
          <h5>공지를 삭제하시겠습니까?</h5>
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo,
    notices: state.notice.notice,
    currentUser: state.auth.status.currentUser,
    delete: state.notice.delete
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNoticeRequest: (id) => {
      return dispatch(deleteNoticeRequest(id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notices));
import React from 'react';
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { postNoticeRequest } from '../actions/notice';

import { Row, Col, Divider, Input, Button, message } from 'antd';
const { TextArea } = Input;

class NoticeUpload extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: ''
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onContentChange(e) {
    this.setState({ content: e.target.value });
  }

  handlePost() {
    console.log(this.props.selectedClass);
    let classid = this.props.selectedClass.classID;
    let title = this.state.title;
    let content = this.state.content;

    if (!classid) message.error('수업 정보를 확인하십시오.');
    else {
      if (title == '' || content == '') message.error('제목과 내용을 입력하십시오.');
      else
        this.props.postNoticeRequest(classid, title, content)
          .then(() => {
            if (this.props.status === 'SUCCESS') {
              message.success('등록되었습니다.');
              this.props.history.push(`/classroom/${ classid }/notice`);
            } else {
              message.error('등록 실패');
            }
          });
    }
  }

  render() {

    return (
      <div style={ { maxWidth: 1024, margin: "auto" } }>
        <Divider style={ { margin: "12px 0" } } />
        <Row>
          <Col span={ 24 }>
            <Input
              className="noticeInput"
              placeholder="제목을 입력하세요"
              value={ this.state.title }
              onChange={ this.onTitleChange }
              size="large"
            />
          </Col>
        </Row>

        <Divider style={ { margin: "12px 0" } } />

        <div style={ { minHeight: 150 } }>
          <TextArea
            className="noticeInput"
            placeholder="내용을 입력하세요"
            autosize={ { minRows: 5, maxRows: 10 } }
            value={ this.state.content }
            onChange={ this.onContentChange }
          />
        </div>
        <Divider style={ { margin: "12px 0" } } />
        <Button style={ { margin: "0 0 10px" } } onClick={ this.handlePost }>Upload</Button>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    status: state.notice.post.status,
    selectedClass: state.classroom.selectedClass.classInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postNoticeRequest: (classid, title, content) => {
      return dispatch(postNoticeRequest(classid, title, content));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoticeUpload));
import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Divider, Input, Button } from 'antd';
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
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onContentChange(e) {
    this.setState({ content: e.target.value });
  }

  render() {

    return (
      <div style={ { height: '100%', padding: 24, background: '#fff' } }>
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
          autosize={{ minRows: 5, maxRows: 10 }}
          value={ this.state.content }
          onChange={ this.onContentChange }
          />
          </div>
          <Divider style={ { margin: "12px 0" } } />
          <Button style={ { margin: "0 0 10px" } }>Upload</Button>
        </div>
      </div>
    );
  }

}

export default NoticeUpload;
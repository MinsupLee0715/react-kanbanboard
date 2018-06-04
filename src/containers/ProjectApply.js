import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getClassStudentRequest } from '../actions/classroom';
import { postProjectRequest } from '../actions/project';

import { Form, Input, Button, Select, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class ProjectApply extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      children: [],
      selected: [],
      title: ''
    };

    this.handleProjectApply = this.handleProjectApply.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
  }

  componentDidMount() {
    this.props.getClassStudentRequest(this.props.selectedClass.classID)
      .then(() => {
        if (this.props.classStudent.status === "SUCCESS") {
          let student = this.props.classStudent.student;
          let children = [];
          student.forEach(e => {
            if (e.projectID == null)
              children.push(
                <Option key={ e.studentID }>
                  { e.name }/{ e.studentID }
                </Option>
              );
          });
          this.setState({ children: children });
        }
      });
  }

  handleProjectApply() {
    this.props.postProjectRequest(this.props.selectedClass.classID, this.state.title, this.state.selected)
      .then(() => {
        if (this.props.post.status === "SUCCESS") {
          message.success('프로젝트 신청 완료');
          this.props.history.push(`/classroom/${ this.props.selectedClass.classID }`);
        }
      });
  }

  handleChange(value) {
    this.setState({ selected: value })
  }

  titleChange(e) {
    let nextState = {};
    nextState[e.target.id] = e.target.value;
    this.setState(nextState);
  }


  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };


    return (
      <div>
        <h3>{ this.props.selectedClass.title }&#40;{ this.props.selectedClass.divide }&#41; / 프로젝트 신청</h3>

        <div style={ { height: '100%', padding: 24, margin: 24, border: "1px solid #ddd" } }>

          <Form>

            <FormItem label="Title" { ...formItemLayout }>
              <Input
                id='title'
                placeholder="프로젝트 명"
                onChange={ this.titleChange }
                value={ this.state.title } />
            </FormItem>

            <FormItem label="Members" { ...formItemLayout }>
              <Select
                mode="multiple"
                placeholder="팀원 선택"
                style={ { width: '100%' } }
                onChange={ this.handleChange }
              >
                { this.state.children }
              </Select>
            </FormItem>

            <FormItem { ...tailFormItemLayout }>
              <Button type="primary" onClick={ this.handleProjectApply }>신청하기</Button>
            </FormItem>

          </Form>

        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo,
    classStudent: state.classroom.classStudent,
    post: state.project.post
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    getClassStudentRequest: (classID) => {
      return dispatch(getClassStudentRequest(classID));
    },
    postProjectRequest: (classID, title, student) => {
      return dispatch(postProjectRequest(classID, title, student));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchProps)(ProjectApply));
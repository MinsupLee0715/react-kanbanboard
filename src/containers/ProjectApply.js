import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class ProjectApply extends React.Component {

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

    const children = [];
    for (let i in this.props.selectedClass.students) {
      children.push(
        <Option key={ this.props.selectedClass.students[i].name + this.props.selectedClass.students[i].userid }>
          { this.props.selectedClass.students[i].name }/{ this.props.selectedClass.students[i].userid }
        </Option>);
    }

    return (
      <div>
        <h1>{ this.props.selectedClass.title }&#40;{ this.props.selectedClass.divide }&#41; / 프로젝트 신청</h1>

        <div style={ { height: '100%', padding: 24, margin: 24, border: "1px solid #ddd" } }>

          <Form>

            <FormItem label="Title" { ...formItemLayout }>
              <Input placeholder="프로젝트 명" />
            </FormItem>

            <FormItem label="Members" { ...formItemLayout }>
              <Select
                mode="multiple"
                placeholder="팀원 선택"
                style={ { width: '100%' } }
              >
                { children }
              </Select>
            </FormItem>

            <FormItem { ...tailFormItemLayout }>
              <Button type="primary" htmlType="submit">신청하기</Button>
            </FormItem>

          </Form>

        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo
  };
};

export default withRouter(connect(mapStateToProps)(ProjectApply));
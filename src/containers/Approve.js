import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectClassRequest } from '../actions/classroom';
import { putProjectRequest, getProjectRequest } from '../actions/project';

import { Table, Divider, Col, message } from 'antd';
const { Column, ColumnGroup } = Table;

class Approve extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      approveList: [],
      title: '',
      divide: '',
      classID: ''
    };

    this.handleApprove = this.handleApprove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getProjectList = this.getProjectList.bind(this);
    this.handleApproveDataBuild = this.handleApproveDataBuild.bind(this);
  }

  componentDidMount() {
    const pathname = this.props.history.location.pathname;
    const pathSplit = pathname.split('/');
    this.setState({ classID: pathSplit[2] }, () => {

      if (!this.props.selectedClass.classID) {
        console.log('selectedClass 없음');
        for (let i in this.props.getClasses) {
          if (this.props.getClasses[i].classID == this.state.classID) {
            this.props.selectClassRequest(this.props.getClasses[i]);
            break;
          }
        }
        this.getProjectList();
      }
    });
  }


  getProjectList() {
    this.props.getProjectRequest(this.state.classID)
      .then(() => {
        if (this.props.getProject.status === "SUCCESS") {
          this.handleApproveDataBuild();
        }
      });
  }

  handleApprove(key) {
    this.props.putProjectRequest(this.state.classID, key, 'start')
      .then(() => {
        if (this.props.putProject.status === "SUCCESS") {
          message.success('승인 완료');
        }
        this.getProjectList();
      });
  }

  handleDelete(key) {
    this.props.putProjectRequest(this.state.classID, key, 'reject')
      .then(() => {
        if (this.props.putProject.status === "SUCCESS") {
          message.success('삭제 완료');
        }
        this.getProjectList();
      });
  }

  handleApproveDataBuild() {
    let list = [];
    let getProject = this.props.getProject.project;
    let projectList = [];

    for (let i in getProject) {
      if (getProject[i].status == 'standby') {
        let index = projectList.map(x => x.projectID).indexOf(getProject[i].projectID);

        if (index < 0) {
          projectList.push({
            projectID: getProject[i].projectID,
            title: getProject[i].title,
            student: [`${ getProject[i].name }(${ getProject[i].studentID })`]
          });
        } else {
          projectList[index].student.push(`${ getProject[i].name }(${ getProject[i].studentID })`);
        }
      }
    }

    for (let i in projectList) {
      list.push({
        key: projectList[i].projectID,
        number: parseInt(i) + parseInt(1),
        title: projectList[i].title,
        members: projectList[i].student
      });
    }

    this.setState({ approveList: list });
  }

  render() {

    const columns = [{
      title: 'No.',
      dataIndex: 'number'
    }, {
      title: 'Title',
      dataIndex: 'title'
    }, {
      title: 'Members',
      dataIndex: 'members'
    }];

    return (
      <div>
        <h3>{ this.props.selectedClass.title }&#40;{ this.props.selectedClass.divide }&#41; / { "프로젝트 승인" }</h3>

        <div style={ { height: '100%', padding: 24, margin: 24, border: "1px solid #ddd" } }>

          <Table
            dataSource={ this.state.approveList }
            size="middle"
            pagination={ { position: 'none' } }
          >
            <Column
              title='No.'
              dataIndex='number'
              key="number"
            />
            <Column
              title='Title'
              dataIndex='title'
              key="title"
            />
            <Column
              title='Members'
              key="members"
              render={ (text, record, index) => {
                let memberList = [];
                for (let i in record.members) {
                  memberList.push(record.members[i]);
                  if (i != record.members.length - 1) {
                    memberList.push(<Divider type="vertical" />);
                  }
                }
                return memberList;
              } }
            />
            <Column
              title="Action"
              key="action"
              render={ (text, record, index) => (
                <span>
                  <a onClick={ () => this.handleApprove(record.key) }>승인</a>
                  <Divider type="vertical" />
                  <a onClick={ () => this.handleDelete(record.key) }>삭제</a>
                </span>
              ) }
            />
          </Table>

        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo,
    getProject: state.project.get,
    putProject: state.project.put,
    getClasses: state.classroom.getClasses.classroom
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    putProjectRequest: (classID, projectID, status) => {
      return dispatch(putProjectRequest(classID, projectID, status));
    },
    getProjectRequest: (classID) => {
      return dispatch(getProjectRequest(classID));
    },
    selectClassRequest: (classInfo) => {
      return dispatch(selectClassRequest(classInfo));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchProps)(Approve));
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProjectRequest, setProjectRequest } from '../actions/project';

import NotFound from './NotFound';
import ProjectApply from './ProjectApply';
import KanbanBoard from './KanbanBoard';

import { Spin } from 'antd';

class Project extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      component: null,
      classID: ''
    }

    this.handleGetProject = this.handleGetProject.bind(this);
  }

  componentDidMount() {
    const pathname = this.props.history.location.pathname;
    const pathSplit = pathname.split('/');
    this.setState({ classID: pathSplit[2] }, () => {
      this.handleGetProject();
    });
  }

  handleGetProject() {
    // 프로젝트 목록 불러오기
    this.props.getProjectRequest(this.state.classID)
      .then(() => {
        this.setState({ loading: false });

        if (this.props.getProject.status === "SUCCESS") {
          if (this.props.currentUser.type == 'student') { // 학생일 시
            if (this.props.getProject.project.length == 0)
              this.setState({ component: <ProjectApply /> });
            else if (this.props.getProject.project[0].status == 'standby')
              this.setState({
                component:
                  <div style={ { textAlign: 'center' } }>
                    <h3>승인 대기 중</h3>
                  </div>
              });
            else
              this.setState({ component: <KanbanBoard /> });

          } else if (this.props.currentUser.type == 'professor') { // 교수일 시
            this.setState({ component: <KanbanBoard /> });
          } else // 너는 누구냐
            this.setState({ component: <NotFound /> });
        }
      });
  }

  render() {
    return (
      <Spin spinning={ this.state.loading }>
        { this.state.component }
      </Spin>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.status.currentUser,
    selectedClass: state.classroom.selectedClass.classInfo,
    getProject: state.project.get
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectRequest: (classID) => {
      return dispatch(getProjectRequest(classID));
    },
    setProjectRequest: (project) => {
      return dispatch(setProjectRequest(project));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project));
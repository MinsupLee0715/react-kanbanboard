import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from './NotFound';
import ProjectApply from './ProjectApply';
import KanbanBoard from './KanbanBoard';

class Project extends React.Component {

  constructor(props) {
    super(props);
    
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh() {
    window.location.reload();
  }

  render() {

    const hasProject = () => {
      if (this.props.currentUser.type == 'student') {
        if (this.props.getProject.status === "SUCCESS") {
          if (this.props.getProject.project.length == 0)
            return <ProjectApply />
          else if (this.props.getProject.project[0].status == 'standby')
            return (
              <div style={ { textAlign: 'center' } }>
                <h1>승인 대기 중</h1>

              </div>
            )
          else
            return <KanbanBoard />
        }
      } else {
        return <KanbanBoard />
      }
    };

    return (
      <div>
        { hasProject() }
      </div>
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

export default withRouter(connect(mapStateToProps)(Project));
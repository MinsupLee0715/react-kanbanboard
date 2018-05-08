import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from './NotFound';
import ProjectApply from './ProjectApply';

class Project extends React.Component {

  render() {

    const hasProject = () => {
      if (this.props.currentUser.type == "student") {
        return (<ProjectApply />);
      } else {
        return (<NotFound />);
      }
    };

    return (
      <React.Fragment>
        { hasProject() }
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.status.currentUser,
    selectedClass: state.classroom.selectedClass.classInfo
  };
}

export default withRouter(connect(mapStateToProps)(Project));
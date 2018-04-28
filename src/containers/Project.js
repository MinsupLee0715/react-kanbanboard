import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Project extends React.Component {

  render() {

    const hasProject = () => {

      return (
        <p>{ this.props.currentUser.userid }</p>
      );
    };

    return (
      <p>{ this.props.currentUser.userid }</p>
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
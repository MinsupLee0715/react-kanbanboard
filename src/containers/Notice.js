import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProjectRequest } from '../actions/project';

import NoticeList from '../components/NoticeList';
import Notices from '../components/Notices';
import NoticeUpload from '../components/NoticeUpload';

class Notice extends React.Component {

  componentDidMount() {
    this.props.getProjectRequest(this.props.selectedClass.classID)
      .then(() => {
        if (this.props.getProject.status === "SUCCESS") {
          console.log('프로젝트를 불러왔습니다.');
        }
      });
  }

  render() {

    return (
      <div>
        <h1>{ this.props.selectedClass.title }&#40;{ this.props.selectedClass.divide }&#41; / 공지사항</h1>

        <div style={ { height: '100%', padding: 16, border: "1px solid #ddd" } }>
          <Switch>
            <Route exact path="/classroom/:id" component={ NoticeList } />
            <Route exact path="/classroom/:id/notice" component={ NoticeList } />
            <Route path="/classroom/:id/notice/upload" component={ NoticeUpload } />
            <Route path="/classroom/:id/notice/:number" component={ Notices } />
          </Switch>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo,
    getProject: state.project.get
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectRequest: (classID) => {
      return dispatch(getProjectRequest(classID));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notice));
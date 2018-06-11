import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getClassInfoRequest } from '../actions/classroom';
import { getProjectRequest } from '../actions/project';

import NoticeList from '../components/NoticeList';
import Notices from '../components/Notices';
import NoticeUpload from '../components/NoticeUpload';

class Notice extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      divide: '',
    }
  }


  componentDidMount() {
    const pathname = this.props.history.location.pathname;
    const pathSplit = pathname.split('/');

    this.props.getClassInfoRequest(pathSplit[2])
      .then(() => {
        if (this.props.getClassInfo.status === "SUCCESS") {
          console.log('수업 정보 불러옴');
          this.setState({
            title: this.props.getClassInfo.info.title,
            divide: this.props.getClassInfo.info.divide
          });
        }
      });
  }

  render() {

    return (
      <div>
        <h3>{ this.state.title }&#40;{ this.state.divide }&#41; / 공지사항</h3>

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
    getClassInfo: state.classroom.getClassInfo,
    getProject: state.project.get
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClassInfoRequest: (classID) => {
      return dispatch(getClassInfoRequest(classID));
    },
    getProjectRequest: (classID) => {
      return dispatch(getProjectRequest(classID));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notice));
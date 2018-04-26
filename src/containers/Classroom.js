import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* import { getClassroomRequest } from '../actions/classroom'; */

import Notice from '../containers/Notice';
import ProjectList from '../containers/ProjectList';
import Approve from '../containers/Approve';
import Status from '../containers/Status';
import KanbanBoard from '../containers/KanbanBoard';
import NotFound from '../containers/NotFound';

import { selectClassRequest } from '../actions/classroom';

import Searchbar from './../components/Searchbar';
import Sidebar from '../components/Sidebar';

import { Layout, message } from 'antd';
const { Content, Sider } = Layout;

class Classroom extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props.match.params[0]);
    let classData = {};
    for (let i in this.props.getClasses) {
      if (this.props.getClasses[i]._id == this.props.match.params[0]) {
        classData = this.props.getClasses[i];
        break;
      }
    }
    console.log(classData);
    this.props.selectClassRequest(classData, () => {
      console.log("selectClassRequst 가 실행됨");
    });
  }


  render() {
    return (
      <Layout>
        {/* Left Sidebar - Width: 256 */ }
        <Sidebar data={ this.props.selectedClass } />

        {/* Right Side Content Body */ }
        <Layout style={ { padding: '0 0 16px', marginLeft: 256 } }>

          <Searchbar />

          <Content style={ { minHeight: 768, margin: '12px 16px 0', overflow: 'initial' } }>
            <Switch>
              <Route exact path="/classroom/:id" component={ Notice } />
              <Route path="/classroom/:id/notice" component={ Notice } />
              <Route path="/classroom/:id/projectList" component={ ProjectList } />
              <Route path="/classroom/:id/approve" component={ Approve } />
              <Route path="/classroom/:id/status" component={ Status } />
              <Route path="/classroom/:id/kanbanboard/:project" component={ KanbanBoard } />
              <Route path="*" component={ NotFound } />
            </Switch>
          </Content>

        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo,
    getClasses: state.classroom.getClasses.classroom
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectClassRequest: (selected) => {
      return dispatch(selectClassRequest(selected));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Classroom));
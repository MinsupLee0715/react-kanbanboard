import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Notice from '../containers/Notice';
import ProjectList from '../containers/ProjectList';
import Approve from '../containers/Approve';
import Status from '../containers/Status';
import KanbanBoard from '../containers/KanbanBoard';
import NotFound from '../containers/NotFound';

import Nav from './../components/Nav';
import Sidebar from '../components/Sidebar';

import { Layout } from 'antd';
const { Content, Sider } = Layout;

class Classroom extends React.Component {

  render() {
    return (
      <Layout>
        {/* Left Sidebar - Width: 256 */ }
        <Sidebar data={ { type: 'professor' } } />

        {/* Right Side Content Body */ }
        <Layout style={ { padding: '32px 0 16px', marginLeft: 256 } }>

          {/* <Nav /> 이거 쓸꺼면 위에 패딩 64px */ }

          <Content style={ { minHeight: 768, margin: '12px 16px 0', overflow: 'initial' } }>
            <Switch>
              <Route exact path="/classroom/:id" component={ ProjectList } />
              <Route path="/classroom/:id/notice" component={ Notice } />
              <Route path="/classroom/:id/projectList" component={ ProjectList } />
              <Route path="/classroom/:id/approve" component={ Approve } />
              <Route path="/classroom/:id/status" component={ Status } />
              <Route path="/classroom/:id/kanbanboard" component={ KanbanBoard } />
              <Route path="*" component={ NotFound } />
            </Switch>
          </Content>

        </Layout>
      </Layout>
    );
  }
}

export default Classroom;
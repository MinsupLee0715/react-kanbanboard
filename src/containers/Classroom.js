import React from 'react';
import { Switch, Route } from 'react-router-dom';

/* Container */
import Notice from './Notice';
import ProjectList from './ProjectList';
import Approve from './Approve';
import Status from './Status';
import Project from './Project';
import NotFound from './NotFound';

/* Component */
import Searchbar from '../components/Searchbar';
import Sidebar from '../components/Sidebar';

import { Layout } from 'antd';
const { Content } = Layout;

class Classroom extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }


  render() {
    return (
      <Layout>
        {/* Left Sidebar - Width: 256 */ }
        <Sidebar />

        {/* Right Side Content Body */ }
        <Layout className='layout-body' style={ { padding: '0 0 16px' } }>

          <Searchbar />

          <Content style={ { minHeight: 768, margin: '12px 16px 0', overflow: 'initial' } }>
            <Switch>
              <Route exact path="/classroom/:id" component={ Notice } />
              <Route path="/classroom/:id/notice" component={ Notice } />
              <Route path="/classroom/:id/projectList" component={ ProjectList } />
              <Route path="/classroom/:id/approve" component={ Approve } />
              {/* <Route path="/classroom/:id/status" component={ Status } /> */ }
              <Route path="/classroom/:id/kanbanboard" component={ Project } />
              <Route path="*" component={ NotFound } />
            </Switch>
          </Content>

        </Layout>
      </Layout>
    );
  }
}

export default Classroom;
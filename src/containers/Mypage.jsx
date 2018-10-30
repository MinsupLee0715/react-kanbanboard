import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MyClassroom from './MyClassroom';
import Search from './Search';
import NotFound from './NotFound';

import Searchbar from '../components/Searchbar';
import Sidebar from '../components/Sidebar';


import { Layout } from 'antd';
const { Content } = Layout;

class Mypage extends React.Component {

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
              <Route exact path="/" component={ MyClassroom } />
              <Route exact path="/mypage" component={ MyClassroom } />
              <Route path="/mypage/search" component={ Search } />
              <Route path="*" component={ NotFound } />
            </Switch>
          </Content>

        </Layout>
      </Layout >
    );
  }
}


export default Mypage;
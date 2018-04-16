import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Main from '../containers/Main';
import Login from '../containers/Login';
import Mypage from '../containers/Mypage';
import Classroom from '../containers/Classroom';
import NotFound from '../containers/NotFound';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

import { Layout } from 'antd';
const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout style={ { height: '100%' } }>
        {/* Top Navbar */ }

        <Content>
          <Switch>
            <Route exact path="/" component={ Main } />
            <Route path="/login" component={ Login } />
            <Route exact path="/mypage" component={ Mypage } />
            <Route path="/classroom/*" component={ Classroom } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </Content>

        <Footer />

      </Layout>
    );
  }
}

export default App;
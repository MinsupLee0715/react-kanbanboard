import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import StdSidebar from './StdSidebar';
import ProfSidebar from './ProfSidebar';
import Profile from './Profile';

import { Layout } from 'antd';
const { Sider } = Layout;

class Sidebar extends React.Component {

  render() {

    const sidebar = () => {
      let pathname = this.props.history.location.pathname;
      let pathSplit = pathname.split('/');

      if (pathSplit[1] == 'classroom') {
        if (this.props.currentUser.type == 'student') {
          return <StdSidebar data={ this.props.currentUser } />;
        } else if (this.props.currentUser.type == 'professor') {
          return <ProfSidebar data={ this.props.currentUser } />;
        }
      }
    };

    return (
      <Sider
        width={ 256 }
        style={ { background: "linear-gradient(to bottom, rgb(40,40,40), #859398)", overflow: 'hidden', height: '100%', position: 'fixed', left: 0 } }>
        <Link to="/mypage"><div className="logo" /></Link>
        <Profile />
        { sidebar() }
      </Sider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.status.currentUser
  };
}


export default withRouter(connect(mapStateToProps)(Sidebar));
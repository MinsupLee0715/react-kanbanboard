import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import StdSidebar from './StdSidebar';
import ProfSidebar from './ProfSidebar';
import Profile from './Profile';

import { Layout } from 'antd';
const { Sider } = Layout;

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.selectSidebar = this.selectSidebar.bind(this);
  }

  selectSidebar() {
    let pathname = this.props.history.location.pathname;
    let pathSplit = pathname.split('/');

    if (pathSplit.length > 2) {
      if (pathSplit[1] == 'classroom') {
        if (this.props.currentUser.type == 'student') {
          return <StdSidebar data={ pathSplit[2] } />;
        } else if (this.props.currentUser.type == 'professor') {
          return <ProfSidebar data={ pathSplit[2] } />;
        }
      }
    }
  }


  render() {

    /* const sidebar = () => {
      let pathname = this.props.history.location.pathname;
      let pathSplit = pathname.split('/');
      console.log(pathSplit[1] + "1111111111111111111");

      if (pathSplit[1] == 'classroom') {
        if (this.props.currentUser.type == 'student') {
          return <StdSidebar />;
        } else if (this.props.currentUser.type == 'professor') {
          return <ProfSidebar />;
        }
      }
    }; */

    return (
      <Sider
        breakpoint="sm"
        collapsedWidth={ 70 }
        onCollapse={ (collapsed, type) => { console.log(collapsed, type); } }
        width={ 256 }
        style={ { overflow: 'hidden', height: '100%', position: 'fixed', left: 0 } }>
        <Link to="/mypage"><div className="logo" /></Link>
        <Profile />
        { this.selectSidebar() }
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
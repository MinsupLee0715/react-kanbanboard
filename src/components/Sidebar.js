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

    this.state = {
      classID: ''
    };

    this.selectSidebar = this.selectSidebar.bind(this);
  }

  selectSidebar() {
    let pathname = this.props.history.location.pathname;
    let pathSplit = pathname.split('/');

    if (pathSplit.length > 2) {
      if (pathSplit[1] == 'classroom') {
        if (this.props.currentUser.type == 'student') {
          return <StdSidebar />;
        } else if (this.props.currentUser.type == 'professor') {
          return <ProfSidebar />;
        }

        return <StdSidebar />; // 이 줄 삭제 필요
      }
    }
  }


  render() {
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
    currentUser: state.auth.status.currentUser,
    getClassInfo: state.classroom.getClassInfo.info
  };
}


export default withRouter(connect(mapStateToProps)(Sidebar));
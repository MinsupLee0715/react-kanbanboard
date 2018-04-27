import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Profile from './Profile';

import { Menu, Icon } from 'antd';
const { Item } = Menu;

class ProfSidebar extends React.Component {

  render() {

    return (
      <Menu
        className="sideMenu"
        mode="inline"
        defaultSelectedKeys={ ['4'] }
        style={ { borderRight: 0, background: "none" } }
      >

        <Menu.Item key="1">
          <Link to="/mypage">
            <Icon type="home" />
            <span>내 강의실</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={ `/classroom/${ this.props.selectedClass._id }/projectList` }>
            <Icon type="bars" />
            <span>프로젝트 목록</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={ `/classroom/${ this.props.selectedClass._id }/approve` }>
            <Icon type="usergroup-add" />
            <span>프로젝트 승인</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to={ `/classroom/${ this.props.selectedClass._id }/notice` }>
            <Icon type="notification" />
            <span>공지사항</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to={ `/classroom/${ this.props.selectedClass._id }/status` }>
            <Icon type="bar-chart" />
            <span>프로젝트 통계</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo
  };
}

export default withRouter(connect(mapStateToProps)(ProfSidebar));
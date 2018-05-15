import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Profile from './Profile';

import { Menu, Icon } from 'antd';
const { Item } = Menu;

class StdSidebar extends React.Component {

  render() {
    return (
      <Menu
        className="sideMenu"
        mode="inline"
        defaultSelectedKeys={ ['3'] }
        style={ { borderRight: 0, background: "none" } }
      >

        <Menu.Item key="1">
          <Link to="/mypage">
            <Icon type="home" />
            <strong>내 강의실</strong>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={ `/classroom/${ this.props.selectedClass }/kanbanboard` }>
            <Icon type="layout" />
            <strong>칸반보드</strong>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={ `/classroom/${ this.props.selectedClass }/notice` }>
            <Icon type="notification" />
            <strong>공지사항</strong>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to={ `/classroom/${ this.props.selectedClass }/status` }>
            <Icon type="bar-chart" />
            <strong>프로젝트 통계</strong>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo.classID
  };
}

export default withRouter(connect(mapStateToProps)(StdSidebar));
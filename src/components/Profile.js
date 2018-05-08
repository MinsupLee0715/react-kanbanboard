import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutRequest } from '../actions/auth';

import { Menu, Dropdown, Button, Tag, Badge, Icon, message } from 'antd';

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutRequest()
      .then(() => {
        let loginData = {
          isLogin: false,
          userid: ""
        }
        document.cookie = "key=" + btoa(JSON.stringify(loginData));
        message.success('로그아웃 되었습니다.');
        this.props.history.push('/login');
      });
  }

  render() {

    const menu = (
      <Menu style={ { overflow: 'auto', width: 300, maxHeight: 500 } }>
        <Menu.Item className="new">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="new">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="new">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="new">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
      </Menu>
    );

    return (
      <div className="profile"
        style={ { padding: "0 0 25px", textAlign: "center" } }>
        <h3>
          <Tag>{ this.props.currentUser.type }</Tag>
          <strong style={ { color: "#072561" } }>{ this.props.currentUser.name } 님  </strong>
          <Dropdown overlay={ menu } trigger={ ['click'] }>
            <Badge count={ 3 } dot>
              <a style={ { color: "#072561" } }><Icon type="mail" /></a>
            </Badge>
          </Dropdown>
        </h3>
        <br />
        <Button
          icon="logout"
          style={ { width: 130 } }
          onClick={ this.handleLogout }>Logout</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.status.currentUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => {
      return dispatch(logoutRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
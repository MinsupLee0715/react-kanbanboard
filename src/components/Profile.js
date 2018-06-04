import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutRequest } from '../actions/auth';
import { getMessageRequest } from '../actions/message';

import { Menu, Dropdown, Button, Tag, Badge, Icon, message } from 'antd';

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: []
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.getMessageFunc = this.getMessageFunc.bind(this);
  }

  componentDidMount() {
    this.getMessageFunc();
  }

  getMessageFunc() {
    this.props.getMessageRequest()
      .then(() => {
        if (this.props.getMessage.status === 'SUCCESS') {
          let message = [];
          let getMessage = this.props.getMessage.message;

          for (let i in getMessage) {
            if (!getMessage[i].isCheck) {
              let data = {
                classTitle: getMessage[i].classTitle,
                projectTitle: getMessage[i].projectTitle,
                type: getMessage[i].type == "PA" ? '프로젝트 신청 알림' : '피드백 알림',
                receive_date: getMessage[i].receive_date.slice(0, 10)
              }
              message.push(
                <Menu.Item className="new">
                  <h6>{ data.classTitle } / { data.projectTitle }</h6>
                  <h6>{ data.type }</h6>
                  <h6>{ data.receive_date }</h6>
                </Menu.Item>
              );
              message.push(<Menu.Divider />);
            }
          }
          for (let i in getMessage) {
            if (getMessage[i].isCheck) {
              let data = {
                classTitle: getMessage[i].classTitle,
                projectTitle: getMessage[i].projectTitle,
                type: getMessage[i].type == "PA" ? '프로젝트 신청 알림' : '피드백 알림',
                receive_date: getMessage[i].receive_date.slice(0, 10)
              }
              message.push(
                <Menu.Item className="old">
                  <h6>{ data.classTitle } / { data.projectTitle }</h6>
                  <h6>{ data.type }</h6>
                  <h6>{ data.receive_date }</h6>
                </Menu.Item>
              );
              message.push(<Menu.Divider />);
            }
          }
          this.setState({ message });
        }
      });
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
        { this.state.message }
      </Menu>
    );

    return (
      <div className="profile"
        style={ { padding: "0 0 25px", textAlign: "center" } }>
        <h6>
          <Tag>{ this.props.currentUser.type }</Tag>
          <strong style={ { color: "#072561" } }>{ this.props.currentUser.name } 님  </strong>
          <Dropdown overlay={ menu } trigger={ ['click'] }>
            <Badge count={ this.state.message.length } dot>
              <a style={ { color: "#072561" } }><Icon type="mail" /></a>
            </Badge>
          </Dropdown>
        </h6>
        <br />
        <Button
          className="logout-btn"
          icon="logout"
          onClick={ this.handleLogout }>Logout</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.status.currentUser,
    logout: state.auth.status.isLogin,
    getMessage: state.message.get
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
    getMessageRequest: () => {
      return dispatch(getMessageRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
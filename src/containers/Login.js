import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginRequest } from '../actions/auth';
import { getClassListRequest } from '../actions/classroom';

import { Layout, Form, Input, Icon, Button, message } from 'antd';
const { Content, Header } = Layout;
const FormItem = Form.Item;

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userid: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStdLogin = this.handleStdLogin.bind(this);
    this.handleProfLogin = this.handleProfLogin.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.id] = e.target.value;
    this.setState(nextState);
  }

  handleStdLogin() {
    let id = this.state.userid;
    let pw = this.state.password;
    let type = "student";

    this.props.loginRequest(id, pw, type)
      .then(() => {
        if (this.props.status === "SUCCESS") {
          this.props.getClassListRequest()
            .then(() => {
              if (this.props.getClasses.status === "SUCCESS") {
                let loginData = {
                  isLogin: true,
                  userid: id,
                  type: type
                };
                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                message.success('로그인 되었습니다.');
                this.props.history.push('/mypage');
              } else {
                message.error('Failed Data Load');
              }
            });

        } else {
          message.error('id 또는 pw 를 확인하세요.');
        }
      });
  }

  handleProfLogin() {
    let id = this.state.userid;
    let pw = this.state.password;
    let type = "professor";

    this.props.loginRequest(id, pw, type)
      .then(() => {
        if (this.props.status === "SUCCESS") {
          this.props.getClassListRequest()
            .then(() => {
              if (this.props.getClasses.status === "SUCCESS") {
                let loginData = {
                  isLogin: true,
                  userid: id,
                  type: type
                };
                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                message.success('로그인 되었습니다.');
                this.props.history.push('/mypage');
              } else {
                message.error('Failed Data Load');
              }
            });

        } else {
          message.error('id 또는 pw 를 확인하세요.');
        }
      });
  }


  render() {
    return (
      <Layout className='main-layout'>

        <Layout>
          <Content style={ { margin: '200px 16px 0', overflow: 'initial' } }>

            <div class="row">
              <div class="col-sm">
                <div style={ { 
                  color: "white",
                  textAlign: "right", 
                  fontSize: 33, 
                  float: "right", 
                  fontWeight: "bold", 
                  paddingTop: 40, 
                  paddingRight: 100 , 
                  fontFamily: "Montserrat, sans-serif"
                } }>
                  <span>KANBAN BOARD SYSTEM</span><br />
                  <span>for Project Management</span><br />
                  <span>and Team Collaboration</span><br />
                  <span>with React JS</span><br /><br />
                  <span>웹기반 칸반보드 시스템</span>
                </div>
              </div>

              <div class="col-sm">

                <div className="login-form"
                  style={ { height: "100%", width: '100%',/*  margin: 'auto' */ } }>
                  <div className="login-logo" style={ { height: 90, width: '100%', textAlign: 'center' } }>
                    <p style={ { fontSize: 33, padding: "30px 0", color: 'white' } }>MEMBER LOGIN</p>
                  </div>

                  <div className="login-body" style={ { height: 300, width: '100%', padding: 24, margin: 'auto' } }>

                    <Form className="login-form" style={ { margin: 'auto' } }>

                      <FormItem style={ { marginBottom: 24 } }>
                        <Input
                          className="loginInput"
                          id="userid"
                          size="large"
                          prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                          placeholder="User ID"
                          onChange={ this.handleChange }
                          value={ this.state.userid }
                          autoFocus />
                      </FormItem>

                      <FormItem style={ { marginBottom: 24 } } >
                        <Input
                          className="loginInput"
                          id="password"
                          size="large"
                          prefix={ <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                          type="Password"
                          placeholder="Password"
                          onChange={ this.handleChange }
                          value={ this.state.password } />
                      </FormItem>

                      <Button type="primary"
                        className="login-form-button student-btn"
                        size="large"
                        style={ { marginBottom: 24 } }
                        onClick={ this.handleStdLogin }
                      >
                        학생 로그인 <Icon type="right" />
                      </Button>

                      <Button type="primary"
                        className="login-form-button professor-btn"
                        size="large"
                        onClick={ this.handleProfLogin }
                      >
                        교수 로그인 <Icon type="right" />
                      </Button>

                    </Form>

                  </div>

                </div>
              </div>
            </div>

          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.auth.login.status,
    currentUser: state.auth.status.currentUser,
    getClasses: state.classroom.getClasses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw, type) => {
      return dispatch(loginRequest(id, pw, type));
    },
    getClassListRequest: () => {
      return dispatch(getClassListRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
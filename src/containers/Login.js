import React from 'react';
import Nav from './../components/Nav';

import { Layout, Form, Input, Icon, Button } from 'antd';
const { Content } = Layout;
const FormItem = Form.Item;

class Login extends React.Component {

  render() {
    return (
      <Layout>

        <Nav />

        <Layout style={ { padding: '0 0 16px' } }>
          <Content style={ { margin: '200px 16px 0', overflow: 'initial' } }>

            <div className="login-form" 
            style={ { height: "100%", width: '100%', margin: 'auto', background: "rgb(60,60,60)", color: "#fff" } }>
              <div className="login-logo" style={ { height: 90, width: '100%', textAlign: 'center' } }>
                <p style={ { fontSize: 30, padding: "30px 0" } }>MEMBER LOGIN</p>
              </div>

              <div className="login-body" style={ { height: 256, width: '100%', padding: 24, margin: 'auto' } }>
                <Form className="login-form" style={ { margin: 'auto' } }>
                  <FormItem style={ { marginBottom: 12 } }>
                    <Input
                      size="large"
                      prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                      placeholder="User ID" />
                  </FormItem>
                  <FormItem style={ { marginBottom: 12 } } >
                    <Input
                      size="large"
                      prefix={ <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                      type="Password"
                      placeholder="Password" />
                  </FormItem>
                  <Button type="primary"
                    className="login-form-button student-btn"
                    size="large"
                    style={ { marginBottom: 15 } }>
                    학생 로그인 <Icon type="right" />
                  </Button>
                  <Button type="primary"
                    className="login-form-button professor-btn"
                    size="large">
                    교수 로그인 <Icon type="right" />
                  </Button>
                </Form>
              </div>

            </div>

          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Login;
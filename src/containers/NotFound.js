import React from 'react';

import { Layout } from 'antd';
const { Content } = Layout;

class NotFound extends React.Component {

  render() {
    return (
      <Layout>
        <Layout style={ { padding: '64px 0 16px' } }>
          <Content style={ { minHeight: 576, margin: '24px 16px 0', overflow: 'initial' } }>
            <div style={ { height: '100%', padding: 24, background: '#fff', textAlign: 'center' } }>
              <h1>Error 404 - Page NotFound!!</h1>
              <p>페이지 주소를 다시 확인하세요.</p>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default NotFound;
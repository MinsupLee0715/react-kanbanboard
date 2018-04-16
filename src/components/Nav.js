import React from 'react';
import { Menu, Layout } from 'antd';
const { Header } = Layout;

class Nav extends React.Component {

  render() {
    return (
      <Header
        className="header"
        style={ { position: 'fixed', width: '100%', top: 0, background: 'rgb(54,54,54)' } }>
      </Header>
    );
  }
}

export default Nav;
import React from 'react';
import StdSidebar from './StdSidebar';
import ProfSidebar from './ProfSidebar';
import Profile from './Profile';

import { Layout } from 'antd';
const { Sider } = Layout;

class Sidebar extends React.Component {

  render() {

    const sidebar = () => {
      if (this.props.data.type == 'student') {
        return <StdSidebar />;
      } else if (this.props.data.type == 'professor') {
        return <ProfSidebar />;
      }
    };

    return (
      <Sider
        width={ 256 }
        style={ { background: "linear-gradient(to bottom, rgb(40,40,40), #859398)", overflow: 'hidden', height: '100%', position: 'fixed', left: 0 } }>
        <div className="logo" />
        <Profile />
        { sidebar() }
      </Sider>
    );
  }
}

export default Sidebar;
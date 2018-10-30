import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

class Footers extends React.Component {
  render() {
    return (
      <Footer style={ { textAlign: 'right', padding: 18 } }>
        Dongseo Univ. Kanban System ©2018 Created by Peace Jung
      </Footer>
    );
  }
}

export default Footers;
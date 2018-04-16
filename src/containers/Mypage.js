import React from 'react';
import { Link } from 'react-router-dom';

import Nav from './../components/Nav';
import Sidebar from '../components/Sidebar';

import { Layout, Menu, Dropdown, Button, Icon, Table } from 'antd';
const { Content } = Layout;

class Mypage extends React.Component {

  render() {

    const menuData = ["2018년도 1학기", "2017년도 2학기", "2017년도 1학기"];

    const columns = [{
      title: '수업명',
      dataIndex: 'classname'
    }, {
      title: '프로젝트',
      dataIndex: 'project'
    }, {
      title: '피드백',
      dataIndex: 'feedback'
    }];

    const data = [{
      key: '1',
      classname: '데이터베이스 설계',
      project: 8,
      feedback: 3
    }, {
      key: '2',
      classname: '운영체제',
      project: 18,
      feedback: 7
    }, {
      key: '3',
      classname: '캡스톤 디자인1',
      project: 14,
      feedback: 4
    }];

    const menu = (
      <Menu>
        { menuData.map((data, i) => {
          return <Menu.Item key={ i }>{ data }</Menu.Item>
        }) }
      </Menu>
    );

    const rowClick = (record) => {
      return {
        onClick: () => {
          console.log(record);
          this.props.history.push(`/classroom/${record.key}`);
        }
      };
    };

    return (
      <Layout>
        {/* Left Sidebar - Width: 256 */ }
        <Sidebar data={ { user: 'student' } } />

        {/* Right Side Content Body */ }
        <Layout style={ { padding: '32px 0 16px', marginLeft: 256 } }>

          {/* <Nav /> 이거 쓸꺼면 위에 패딩 64px */ }

          <Content style={ { minHeight: 768, margin: '12px 16px 0', overflow: 'initial' } }>
            <h1>내 강의실</h1>

            <div style={ { height: '100%', padding: 24, background: '#fff' } }>

              <Dropdown overlay={ menu } trigger={ ['click'] }>
                <Button style={ { marginLeft: 8, marginBottom: 10 } }>
                  { "2018년도 1학기" }
                  <Icon type="down" />
                </Button>
              </Dropdown>

              <Table
                columns={ columns }
                dataSource={ data }
                size="middle"
                pagination={ { position: 'none' } }
                onRow={ rowClick }
              />

            </div>
          </Content>

        </Layout>
      </Layout>
    );
  }
}

export default Mypage;
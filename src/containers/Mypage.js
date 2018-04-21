import React from 'react';
import { Link } from 'react-router-dom';

import Searchbar from './../components/Searchbar';
import Sidebar from '../components/Sidebar';

import { Layout, Menu, Dropdown, Button, Icon, Table, Card } from 'antd';
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
          this.props.history.push(`/classroom/${ record.key }`);
        }
      };
    };

    return (
      <Layout>
        {/* Left Sidebar - Width: 256 */ }
        <Sidebar />

        {/* Right Side Content Body */ }
        <Layout style={ { padding: '0 0 16px', marginLeft: 256 } }>

          <Searchbar />

          <Content style={ { minHeight: 768, margin: '12px 16px 0', overflow: 'initial' } }>
            <h1>내 강의실</h1>

            <Card>
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
            </Card>

          </Content>

        </Layout>
      </Layout>
    );
  }
}

export default Mypage;
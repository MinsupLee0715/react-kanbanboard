import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Searchbar from './../components/Searchbar';
import Sidebar from '../components/Sidebar';

import { getClassroomRequest } from '../actions/classroom';

import { Layout, Select, Button, Icon, Table, Card } from 'antd';
const { Content } = Layout;
const Option = Select.Option;

class Mypage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      period: "학기 선택"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  menuData = [];
  classes = this.props.getClasses;

  componentDidMount() {
    this.props.getClassroomRequest()
      .then(() => {
        for (let i in this.classes) {
          if (this.menuData.indexOf(this.classes[i].period) == -1)
            this.menuData.push(this.classes[i].period);
        };
        this.menuData.sort((a, b) => {
          return b - a;
        });
        this.setState = {
          period: this.menuData[0]
        };
      });
  }

  handleChange = (value) => {
    this.setState = {
      period: value
    };
    console.log(this.state.period);
  }

  render() {

    const columns = [{
      title: '수업명',
      dataIndex: 'classname'
    }, {
      title: '분반',
      dataIndex: 'divide'
    }, {
      title: '프로젝트',
      dataIndex: 'project'
    }];

    let classList = [];
    for (let i in this.classes) {
      if (this.classes[i].period == this.state.period)
        classList.push(classes[i]);
    }

    let classData = [];
    classList.map((data, i) => {
      classData.push({
        key: i,
        classname: data.title,
        divide: data.divide,
        project: data.student.length
      })
    });
    console.log(classData);

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

              <Select
                defaultValue={ this.state.period }
                style={ { width: 120, marginBottom: 10 } }
                onChange={ this.handleChange }>
                { this.menuData.map((data, i) => {
                  return <Option value={ data }>{ data }</Option>
                }) }
              </Select>

              <Table
                columns={ columns }
                dataSource={ this.classData }
                size="middle"
                pagination={ { position: 'none' } }
                onRow={ rowClick }
              />

            </Card>

          </Content>

        </Layout>
      </Layout >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getClasses: state.classroom.getClasses.classroom
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassroomRequest: () => {
      return dispatch(getClassroomRequest());
    }
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Mypage));
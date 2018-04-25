import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Searchbar from './../components/Searchbar';
import Sidebar from '../components/Sidebar';

import { getClassroomRequest } from '../actions/classroom';

import { Layout, Select, Button, Icon, Table, Card } from 'antd';
const { Content } = Layout;
const Option = Select.Option;

/* About Select */
let menuData = [];
let menuChlidren = [];
/* About Class List */
let classList = [];


class Mypage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      period: "학기 선택",
      classData: []
    };

    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    this.props.getClassroomRequest()
      .then(() => {
        /* Select Child Setting */
        menuData = [];
        menuChlidren = [];
        for (let i in this.props.getClasses) {
          if (menuData.indexOf(this.props.getClasses[i].period) == -1) {
            menuData.push(this.props.getClasses[i].period);
          }
        };
        menuData.sort();
        menuData.reverse();

        for (let i in menuData) {
          menuChlidren.push(<Option value={ menuData[i] }>{ menuData[i] }</Option>);
        }

        this.setState({ period: menuData[0] }, () => {
          this.handleChange(this.state.period);
        });
      });
  }

  handleChange(value) {
    this.setState({ period: value }, () => {
      console.log(this.state.period);
      classList = [];
      for (let i in this.props.getClasses) {
        if (this.props.getClasses[i].period == this.state.period)
          classList.push({
            key: this.props.getClasses[i]._id,
            classname: this.props.getClasses[i].title,
            divide: this.props.getClasses[i].divide,
            project: "number"
          });
      }
      this.setState({ classData: classList });
    });
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
                onChange={ this.handleChange }
              >
                { menuChlidren }
              </Select>

              <Table
                columns={ columns }
                dataSource={ this.state.classData }
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
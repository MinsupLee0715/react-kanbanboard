import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Searchbar from './../components/Searchbar';
import Sidebar from '../components/Sidebar';

import { getClassroomRequest } from '../actions/classroom';
import { selectClassRequest } from '../actions/classroom';

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
    console.log("/mypage");
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
            key: this.props.getClasses[i].classID,
            number: classList.length + 1,
            title: this.props.getClasses[i].title,
            divide: this.props.getClasses[i].divide,
            professor: this.props.getClasses[i].name
          });
      }
      this.setState({ classData: classList });
    });
  }


  render() {

    const columns = this.props.currentUser.type == 'professor' ?
      [{
        title: 'No.',
        dataIndex: 'number'
      }, {
        title: '수업명',
        dataIndex: 'title'
      }, {
        title: '분반',
        dataIndex: 'divide'
      }] :
      [{
        title: 'No.',
        dataIndex: 'number'
      }, {
        title: '수업명',
        dataIndex: 'title'
      }, {
        title: '분반',
        dataIndex: 'divide'
      }, {
        title: '지도교수',
        dataIndex: 'professor'
      }];

    const rowClick = (record) => {
      return {
        onClick: () => {
          for (let i in this.props.getClasses) {
            if (this.props.getClasses[i].classID == record.key) {
              this.props.selectClassRequest(this.props.getClasses[i]);
              this.props.history.push(`/classroom/${ record.key }`);
              break;
            }
          }
        }
      };
    };

    return (
      <Layout>
        {/* Left Sidebar - Width: 256 */ }
        <Sidebar />

        {/* Right Side Content Body */ }
        <Layout className='layout-body' style={ { padding: '0 0 16px' } }>

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
    currentUser: state.auth.status.currentUser,
    getClasses: state.classroom.getClasses.classroom
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassroomRequest: () => {
      return dispatch(getClassroomRequest());
    },
    selectClassRequest: (classInfo) => {
      return dispatch(selectClassRequest(classInfo));
    }
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Mypage));
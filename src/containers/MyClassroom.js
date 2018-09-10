import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import Searchbar from '../components/Searchbar';
import Sidebar from '../components/Sidebar';

import {
  getClassListRequest,
  getClassInfoRequest
} from '../actions/classroom';

import { Layout, Select, Button, Icon, Table, Card } from 'antd';
const { Content } = Layout;
const Option = Select.Option;

/* About Select */
let menuData = [];
let menuChlidren = [];

/* About Class List */
let classList = [
  {
    key: "1",
    number: "1",
    title: "TEST CLASS 1",
    divide: "101",
    professor: "David"
  },
  {
    key: "2",
    number: "2",
    title: "TEST CLASS 2",
    divide: "102",
    professor: "Choi"
  },
  {
    key: "3",
    number: "3",
    title: "TEST CLASS 3",
    divide: "103",
    professor: "Kim"
  }
];


class MyClassroom extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      period: "학기 선택",
      classData: classList,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    this.setState({ loading: true });

    this.props.getClassListRequest()
      .then(() => {
        this.setState({ loading: false });

        if (this.props.getStatus === "SUCCESS") {
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
        }
      });
  }

  handleChange(value) {
    this.setState({ loading: true });
    this.setState({ period: value }, () => {
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
      this.setState({ classData: classList, loading: false });
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
          // this.props.getClassInfoRequest(record.key)
          //   .then(() => {
          //     if (this.props.getClassInfo.status === "SUCCESS") {
          //       this.props.history.push(`/classroom/${ record.key }`);
          //     }
          //   });
          this.props.history.push(`/classroom/${ record.key }`); // 이 줄 삭제 필요
          }
      };
    };


    return (
      <React.Fragment>
      <br />
        <h3>내 강의실</h3>

        <div style={ { padding: 16, border: 'none' } }>
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
            loading={ this.state.loading }
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.status.currentUser,
    getClasses: state.classroom.getClasses.classroom,
    getStatus: state.classroom.getClasses.status,
    getClassInfo: state.classroom.getClassInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassListRequest: () => {
      return dispatch(getClassListRequest());
    },
    getClassInfoRequest: (classID) => {
      return dispatch(getClassInfoRequest(classID));
    }
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyClassroom));
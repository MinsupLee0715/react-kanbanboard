import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getClassInfoRequest } from '../actions/classroom';
import { getNoticeRequest } from '../actions/notice';

import { Table, Button } from 'antd';

class NoticeList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noticeList: [],
      loading: false,
      classID: ''
    };

    this.getClassInfo = this.getClassInfo.bind(this);
    this.getNoticeList = this.getNoticeList.bind(this);
  }

  componentDidMount() {
    const pathname = this.props.history.location.pathname;
    const pathSplit = pathname.split('/');

    this.setState({ loading: true, classID: pathSplit[2] }, () => {
      this.getClassInfo();
      this.getNoticeList();
    });
  }

  componentDidUpdate(prevProps) {
    const pathname = this.props.history.location.pathname;
    const pathSplit = pathname.split('/');

    if (this.state.classID != '' && pathSplit[2] !== this.state.classID) {
      console.log('변함');
      this.setState({ classID: pathSplit[2] }, () => {
        this.getClassInfo();
        this.getNoticeList();
      });
    }
  }

  getClassInfo() {
    this.props.getClassInfoRequest(this.state.classID)
      .then(() => {
        if (this.props.getClassInfo.status === "SUCCESS") {
          this.setState({
            title: this.props.getClassInfo.info.title,
            divide: this.props.getClassInfo.info.divide
          });
        }
      });
  }

  getNoticeList() {
    this.props.getNoticeRequest(this.state.classID)
      .then(() => {
        this.setState({ loading: false });

        if (this.props.getNotice.status === "SUCCESS") {
          let list = [];
          let noticeList = this.props.notices;

          if (typeof noticeList !== "undefined") {
            for (let i in noticeList) {
              list.push({
                key: noticeList[i].date,
                number: parseInt(i) + parseInt(1),
                title: noticeList[i].title,
                date: noticeList[i].date
              });
            }
          }

          this.setState({ noticeList: list.reverse() });
        }
      });
  }


  render() {

    const columns = [{
      title: 'No.',
      dataIndex: 'number'
    }, {
      title: 'Title',
      dataIndex: 'title'
    }, {
      title: 'Date',
      dataIndex: 'date'
    }];

    const rowClick = (record) => {
      return {
        onClick: () => {
          this.props.history.push(`/classroom/${ this.state.classID }/notice/${ record.key }`);
        }
      };
    };


    return (
      <div style={ { margin: "auto" } }>
        {
          this.props.currentUser.type == 'professor' ?
            <Link to={ `/classroom/${ this.state.classID }/notice/upload` }>
              <Button style={ { margin: "0 0 10px" } }>Upload</Button>
            </Link>
            : false
        }

        <Table
          columns={ columns }
          dataSource={ this.state.noticeList }
          size="middle"
          pagination={ { position: 'none' } }
          onRow={ rowClick }
          loading={ this.state.loading }
        />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    getClassInfo: state.classroom.getClassInfo,
    currentUser: state.auth.status.currentUser,
    getNotice: state.notice.get,
    notices: state.notice.notice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassInfoRequest: (classID) => {
      return dispatch(getClassInfoRequest(classID));
    },
    getNoticeRequest: (classID) => {
      return dispatch(getNoticeRequest(classID));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoticeList));
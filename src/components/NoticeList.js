import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getNoticeRequest } from '../actions/notice';

import { Table, Button } from 'antd';

class NoticeList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noticeList: []
    };
  }

  componentDidMount() {
    this.props.getNoticeRequest(this.props.match.params.id)
      .then(() => {
        if (this.props.getNotice.status === "SUCCESS") {
          let list = [];
          let noticeList = this.props.notices;

          if (typeof noticeList !== "undefined") {
            for (let i in noticeList) {
              list.push({
                key: noticeList[i].date,
                number: parseInt(i) + parseInt(1),
                title: noticeList[i].title,
                date: noticeList[i].date.slice(0, 10)
              });
            }
          }

          this.setState({ noticeList: list });
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
          this.props.history.push(`/classroom/${ this.props.classInfo.classID }/notice/${ record.key }`);
        }
      };
    };


    return (
      <div style={ { margin: "auto" } }>
        {
          this.props.currentUser.type == 'professor' ?
            <Link to={ `/classroom/${ this.props.classInfo.classID }/notice/upload` }>
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
        />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    classInfo: state.classroom.selectedClass.classInfo,
    currentUser: state.auth.status.currentUser,
    getNotice: state.notice.get,
    notices: state.notice.notice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNoticeRequest: (classid) => {
      return dispatch(getNoticeRequest(classid));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoticeList));
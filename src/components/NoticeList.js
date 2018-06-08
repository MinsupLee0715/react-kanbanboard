import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getNoticeRequest } from '../actions/notice';

import { Table, Button } from 'antd';

class NoticeList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noticeList: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.getNoticeRequest(this.props.match.params.id)
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
          loading={ this.state.loading }
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
    getNoticeRequest: (classID) => {
      return dispatch(getNoticeRequest(classID));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoticeList));
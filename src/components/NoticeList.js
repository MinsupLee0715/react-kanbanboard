import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Table, Button } from 'antd';

class NoticeList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noticeList: []
    };
  }

  componentDidMount() {
    console.log("////");
    console.log(this.props.selectedClass);
    console.log("////");
    let list = [];
    let noticeList = this.props.selectedClass.notice;
    for (let i in noticeList) {
      list.push({
        key: noticeList[i]._id,
        number: parseInt(i) + parseInt(1),
        title: noticeList[i].title,
        date: noticeList[i].date
      });
    }
    this.setState({ noticeList: list });
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
          this.props.history.push(`/classroom/${ this.props.selectedClass._id }/notice/${ record.key }`);
        }
      };
    };


    return (
      <div style={ { margin: "auto" } }>
        {
          this.props.currentUser.type == 'professor' ?
            <Link to={ `/classroom/${ this.props.selectedClass._id }/notice/upload` }>
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
    selectedClass: state.classroom.selectedClass.classInfo,
    currentUser: state.auth.status.currentUser
  };
};

export default withRouter(connect(mapStateToProps)(NoticeList));
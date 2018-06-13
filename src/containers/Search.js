import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Table } from 'antd';

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      project: []
    };

    this.getNoticeList = this.getNoticeList.bind(this);
  }

  componentDidMount() {
    this.getNoticeList();
  }


  componentDidUpdate(prevProps) {
    //console.log(prevProps.project, this.props.project);
    if (prevProps.project !== this.props.project) {
      this.getNoticeList();
    }
  }

  getNoticeList() {
    let list = [];
    let project = this.props.project;

    for (let i in project) {
      list.push({
        key: project[i].projectID,
        number: parseInt(i) + parseInt(1),
        classID: project[i].classID,
        classTitle: project[i].classTitle + " (" + project[i].divide + ")",
        projectTitle: project[i].projectTitle,
        leader: project[i].leader
      });
    }

    this.setState({ project: list });
  }


  render() {

    const columns = [{
      title: 'No.',
      dataIndex: 'number'
    }, {
      title: '수업명',
      dataIndex: 'classTitle'
    }, {
      title: '프로젝트 명',
      dataIndex: 'projectTitle'
    }, {
      title: '팀장',
      dataIndex: 'leader'
    }];

    const rowClick = (record) => {
      return {
        onClick: () => {
          this.props.history.push(`/classroom/${ record.classID }/notice`);
        }
      };
    };


    return (
      <div style={ { maxWidth: 1024, margin: "auto" } }>
        <h3>프로젝트 검색</h3>
        <br />
        <Table
          columns={ columns }
          dataSource={ this.state.project }
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
    project: state.search.project
  };
};

export default withRouter(connect(mapStateToProps)(Search));
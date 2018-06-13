import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Table, Divider } from 'antd';

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      project: []
    };

    this.getProjectList = this.getProjectList.bind(this);
  }

  componentDidMount() {
    this.getProjectList();
  }


  componentDidUpdate(prevProps) {
    //console.log(prevProps.project, this.props.project);
    if (prevProps.project !== this.props.project) {
      this.getProjectList();
    }
  }

  getProjectList() {
    let list = [];
    let project = this.props.project;
    let count = 1;

    /* 프로젝트 리스트 생성 */
    for (let i in project) {
      let index = list.map(x => x.key).indexOf(project[i].projectID);

      if (index < 0) {
        list.push({
          key: project[i].projectID,
          number: count++,
          classID: project[i].classID,
          classTitle: project[i].classTitle + " (" + project[i].divide + ")",
          projectTitle: project[i].projectTitle,
          leader: project[i].name,
          member: [project[i].name],
          period: project[i].period,
          status: project[i].status
        });
      } else {
        list[index].member.push(<Divider type="vertical" />);
        list[index].member.push(`${ project[i].name }`);
      }
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
    }, {
      title: '팀원',
      dataIndex: 'member'
    }, {
      title: '학기',
      dataIndex: 'period'
    }, {
      title: '상태',
      dataIndex: 'status'
    }];

    const rowClick = (record) => {
      return {
        onClick: () => {
          this.props.history.push(`/classroom/${ record.classID }/notice`);
        }
      };
    };


    return (
      <div style={ { margin: "auto" } }>
        <br />
        <h3>프로젝트 검색</h3>
        <br />
        <div>
          <Table
            columns={ columns }
            dataSource={ this.state.project }
            size="middle"
            pagination={ { position: 'none' } }
            onRow={ rowClick }
          />
        </div>
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
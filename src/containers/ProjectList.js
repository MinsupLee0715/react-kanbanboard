import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Row, Col, Card, Divider } from 'antd';

class ProjectList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      project: []
    };

    this.handleKanbanBoardLoad = this.handleKanbanBoardLoad.bind(this);
  }

  handleKanbanBoardLoad(projectID) {
    console.log('Loading... ' + projectID);
    ///classroom/${ this.props.selectedClass.classID }/kanbanboard/${ projectList[i].projectID }
  }

  componentDidMount() {
    /* 수업 내 프로젝트 리스트 */
    let projectAllList = this.props.projectList;
    let projectList = [];
    let list = [];
    for (let i in projectAllList) {
      if (projectAllList[i].status == 'start') {
        let index = projectList.map(x => x.projectID).indexOf(projectAllList[i].projectID);

        if (index < 0) {
          projectList.push({
            projectID: projectAllList[i].projectID,
            title: projectAllList[i].title,
            student: [`${ projectAllList[i].name }`]
          });
        } else {
          projectList[index].student.push(`${ projectAllList[i].name }`);
        }
      }
    }

    for (let i in projectList) { // 받아온 리스트를 반복문으로 돌림
      /* 참여자 리스트에 Divider(| 세로줄) 추가 */
      let memberList = [];
      for (let j in projectList[i].student) {
        memberList.push(projectList[i].student[j]);
        if (j != projectList[i].student.length - 1) {
          memberList.push(<Divider type="vertical" />);
        }
      }

      list.push(
        <Col md={ 12 } lg={ 6 } className="project-card" >
          <a onClick={ () => this.handleKanbanBoardLoad(projectList[i].projectID) }>
            <Card
              hoverable
              title={ projectList[i].title }
            >
              <p>{ memberList }</p>
              <br/>
              <span>할일 { 3 }</span>
              <Divider type="vertical" />
              <span>진행중 { 3 }</span>
              <br />
              <span>피드백 { 3 }</span>
              <Divider type="vertical" />
              <span>완료 { 3 }</span>
            </Card>
          </a>
        </Col>
      );
    }

    this.setState({ project: list });
  }


  render() {
    return (
      <div>
        <h3>{ this.props.selectedClass.title }&#40;{ this.props.selectedClass.divide }&#41; / { "프로젝트 목록" }</h3>

        <div style={ { height: '100%', padding: 24, textAlign: 'center' } }>

          <Row gutter={ 16 }>
            { this.state.project }
          </Row>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo,
    projectList: state.project.get.project
  };
};

/* const mapDispatchToProps = (dispatch) => {
  return {
    getClassroomRequest: () => {
      return dispatch(getClassroomRequest());
    }
  };
}; */


export default withRouter(connect(mapStateToProps)(ProjectList));
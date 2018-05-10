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
  }

  componentDidMount() {
    /* 서버에서 수업 내 프로젝트 리스트를 가져온다 */

    let projectList = [];
    const sampleList = [{
      _id: '1',
      title: '프로젝트1',
      members: ['사람1', '사람2']
    }, {
      _id: '2',
      title: '프로젝트2',
      members: ['사람3', '사람4']
    }, {
      _id: '3',
      title: '프로젝트3',
      members: ['사람5', '사람6', '사람7']
    }, {
      _id: '4',
      title: '프로젝트3',
      members: ['사람5', '사람6', '사람7']
    }, {
      _id: '5',
      title: '프로젝트3',
      members: ['사람5', '사람6', '사람7']
    }];

    for (let i in sampleList) { // 받아온 리스트를 반복문으로 돌림
      /* 참여자 리스트에 Divider(| 세로줄) 추가 */
      let memberList = [];
      for (let j in sampleList[i].members) {
        memberList.push(sampleList[i].members[j]);
        if (j != sampleList[i].members.length - 1) {
          memberList.push(<Divider type="vertical" />);
        }
      }

      projectList.push(
        <Col md={ 12 } lg={ 6 } className="project-card" >
          <Link to={ `/classroom/${ this.props.selectedClass._id }/kanbanboard/${ sampleList[i]._id }` }>
            <Card
              hoverable
              title={ sampleList[i].title }
            >
              <p>{ memberList }</p>
              <p>{ "3일 전에 업데이트 함" }</p>
              <span>할일 { 3 }</span>
              <Divider type="vertical" />
              <span>진행중 { 3 }</span>
              <br />
              <span>피드백 { 3 }</span>
              <Divider type="vertical" />
              <span>완료 { 3 }</span>
            </Card>
          </Link>
        </Col>
      );
    }

    this.setState({ project: projectList });
  }


  render() {
    return (
      <div>
        <h1>{ this.props.selectedClass.title }&#40;{ this.props.selectedClass.divide }&#41; / { "프로젝트 목록" }</h1>

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
    selectedClass: state.classroom.selectedClass.classInfo
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
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';

class KanbanBoard extends React.Component {

  constructor(props) {
    super(props);
    
    /*
    서버에서 칸반정보 받아오자
    교수일 때는 주소 :project 값으로 가져오고
    학생이면 수업id로 DB 조회하면됨
    */
  }
  

  render() {
    return (
      <div>
        <h1>{ this.props.selectedClass.title }&#40;{ this.props.selectedClass.divide }&#41; / { this.props.data }</h1>

        <div style={ { padding: "0 24px", textAlign: 'center' } }>

          <Row gutter={ 16 }>
            <Col className="gutter-row" span={ 6 }>
              <div className="swimlane"><h3>To Do</h3></div>
            </Col>

            <Col className="gutter-row" span={ 6 }>
              <div className="swimlane"><h3>Doing</h3></div>
            </Col>

            <Col className="gutter-row" span={ 6 }>
              <div className="swimlane"><h3>Feedback</h3></div>
            </Col>

            <Col className="gutter-row" span={ 6 }>
              <div className="swimlane"><h3>Finished</h3></div>
            </Col>
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

export default withRouter(connect(mapStateToProps)(KanbanBoard));
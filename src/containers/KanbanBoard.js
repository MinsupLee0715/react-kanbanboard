import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col } from 'antd';

class KanbanBoard extends React.Component {

  /* componentDidMount() {
    console.log("잘못된 접근");
    this.props.history.push('/mypage');
  } */

  render() {
    return (
      <div>
        <h1>{ "과목 명" } / { "프로젝트 명" }</h1>

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

export default KanbanBoard;
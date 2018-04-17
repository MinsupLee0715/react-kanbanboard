import React from 'react';
import { Link } from 'react-router-dom';

import Project from '../components/Project';

import { Row, Col } from 'antd';

class ProjectList extends React.Component {

  render() {
    return (
      <div>
        <h1>{ "과목 명" } / { "프로젝트 목록" }</h1>

        <div style={ { height: '100%', padding: 24, textAlign: 'center' } }>

          <Row gutter={ 16 }>
            <Col md={ 12 } lg={ 6 } className="project-card" >
              <Project />
            </Col>
            <Col md={ 12 } lg={ 6 } className="project-card" >
              <Project />
            </Col>
            <Col md={ 12 } lg={ 6 } className="project-card" >
              <Project />
            </Col>
            <Col md={ 12 } lg={ 6 } className="project-card" >
              <Project />
            </Col>
            <Col md={ 12 } lg={ 6 } className="project-card" >
              <Project />
            </Col>
            <Col md={ 12 } lg={ 6 } className="project-card" >
              <Project />
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default ProjectList;
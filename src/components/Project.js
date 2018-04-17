import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'antd';

class Project extends React.Component {

  render() {
    return (
      <Card
        title={ "프로젝트 명" }
        extra={ <a href="#">More</a> }
        style={ { border: "none", borderRadius: 5 } }
      >
        <p>{ "정화평, 서현규" }</p>
        <p>{ "3일 전에 업데이트 함" }</p>
        <p>할일 { 3 } / 진행중 { 3 } / 피드백 { 3 } / 완료 { 3 }</p>
      </Card>
    );
  }

}

export default Project;
import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Divider } from 'antd';

class Project extends React.Component {

  render() {
    return (
      <Link to={ `/classroom/:id/kanbanboard/${ ":project" }` }>
        <Card
          hoverable
          title={ "프로젝트 명" }
        >
          <p>{ "정화평, 서현규" }</p>
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
    );
  }

}

export default Project;
import React from 'react';
import { Link } from 'react-router-dom';

class ProjectList extends React.Component {

  render() {
    return (
      <div>
        <h1>{ "과목 명" } / { "프로젝트 목록" }</h1>

        <div style={ { height: '100%', padding: 24, background: '#fff', textAlign: 'center' } }>
          ProjectList

          <p><Link to="/mypage">mypage</Link></p>
          <p><Link to="/classroom/student">mypage/std</Link></p>
          <p><Link to="/classroom/professor">mypage/prof</Link></p>
        </div>
      </div>
    );
  }

}

export default ProjectList;
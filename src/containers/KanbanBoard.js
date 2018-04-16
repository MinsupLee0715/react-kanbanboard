import React from 'react';
import { Link } from 'react-router-dom';

class KanbanBoard extends React.Component {

  componentDidMount() {
    console.log("잘못된 접근");
    this.props.history.push('/mypage');
  }

  render() {
    return (
      <div>
        <h1>{ "과목 명" } / { "프로젝트 승인" }</h1>

        <div style={ { height: '100%', padding: 24, background: '#fff', textAlign: 'center' } }>
          KanbanBoard

          <p><Link to="/mypage">mypage</Link></p>
          <p><Link to="/classroom/student">mypage/std</Link></p>
          <p><Link to="/classroom/professor">mypage/prof</Link></p>
        </div>
      </div>
    );
  }

}

export default KanbanBoard;
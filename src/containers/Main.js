import React from 'react';
import Login from '../containers/Login';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.handleGOGO = this.handleGOGO.bind(this);
  }

  handleGOGO() {
    this.props.history.push('/mypage');
  }

  render() {
    return (
      <div>
        { this.props.isLoggedIn ? this.handleGOGO() : <Login /> }
      </div>
    );
  }
}

Main.defaultProps = {
  isLoggedIn: true
};

export default Main;
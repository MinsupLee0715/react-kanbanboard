import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getStatusRequest } from '../actions/auth';
import Login from '../containers/Login';

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getStatusRequest()
      .then(() => {
        if (this.props.status === "SUCCESS") {
          this.props.history.push('/mypage');
        }
        else {
          console.log("you need to login");
        }
      });
  }

  render() {
    return (
      <Login />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.auth.login.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
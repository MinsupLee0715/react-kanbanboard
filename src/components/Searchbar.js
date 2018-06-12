import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSearchProjectRequest } from '../actions/search';

import { Menu, Layout, Input, Icon } from 'antd';
const { Header } = Layout;

class Searchbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inputdata: '',
    };

    this.emitEmpty = this.emitEmpty.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
    this.getProject = this.getProject.bind(this);
  }

  emitEmpty() {
    this.setState({ inputdata: '' });
  }

  onChange(e) {
    let nextState = {};
    nextState[e.target.id] = e.target.value;
    this.setState(nextState);
  }

  onPressEnter() {
    if (this.state.inputdata !== '')
      this.getProject();
  }

  getProject() {
    this.props.getSearchProjectRequest(this.state.inputdata)
      .then(() => {
        if (this.props.status === "SUCCESS") {
          console.log(this.props.project);
        } else
          console.log('err');
      });
  }


  render() {

    const { inputdata } = this.state;
    const suffix = inputdata ? <Icon type="close-circle" onClick={ this.emitEmpty } /> : null;

    return (

      <Header
        className="header"
        style={ { width: '100%', padding: "0 20px", background: 'rgb(255,255,255)', borderBottom: '1px solid #ddd' } }>
        <Input
          id="inputdata"
          className="searchInput"
          placeholder="수업명/프로젝트명/참여학생으로 검색..."
          prefix={ <Icon type="search" style={ { color: 'rgba(0,0,0,.25)' } } /> }
          suffix={ suffix }
          value={ inputdata }
          onChange={ this.onChange }
          onPressEnter={ this.onPressEnter }
          size="large"
        />
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.search.status,
    project: state.search.project
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchProjectRequest: (searchData) => {
      return dispatch(getSearchProjectRequest(searchData));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Searchbar));
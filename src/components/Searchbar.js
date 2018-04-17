import React from 'react';
import { Menu, Layout, Input, Icon } from 'antd';
const { Header } = Layout;

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputdata: '',
    };
  }
  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ inputdata: '' });
  }
  onChange = (e) => {
    this.setState({ inputdata: e.target.value });
  }

  render() {

    const { inputdata } = this.state;
    const suffix = inputdata ? <Icon type="close-circle" onClick={ this.emitEmpty } /> : null;

    return (

      <Header
        className="header"
        style={ { position: 'fixed', width: '100%', padding: "0 20px", top: 0, background: 'rgb(255,255,255)' } }>
        <Input
          className="searchInput"
          placeholder="Search..."
          prefix={ <Icon type="search" style={ { color: 'rgba(0,0,0,.25)' } } /> }
          suffix={ suffix }
          value={ inputdata }
          onChange={ this.onChange }
          size="large"
        />
      </Header>
    );
  }
}

Nav.defaultProps = {
  isLoggedIn: true
};

export default Nav;
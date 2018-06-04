import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Row, Col, Divider } from 'antd';

class Notices extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      date: ""
    };
  }

  componentDidMount() {
    let notices = this.props.notices;
    for (let i in notices) {
      if (notices[i].date == this.props.match.params.number) {
        this.setState({
          title: notices[i].title,
          content: notices[i].content,
          date: notices[i].date.slice(0, 10)
        });
        break;
      }
    }
  }

  render() {

    return (
      <div style={ { maxWidth: 1024, margin: "auto" } }>
        <Divider style={ { margin: "12px 0" } } />
        <Row>
          <Col span={ 18 }>
            <h4>{ this.state.title }</h4>
          </Col>
          <Col span={ 6 } style={ { textAlign: "right" } }>
            <span>{ this.state.date }</span>
          </Col>
        </Row>

        <Divider style={ { margin: "12px 0" } } />

        <div style={ { minHeight: 150 } }>
          <pre>{ this.state.content }</pre>
        </div>
        <Divider style={ { margin: "12px 0" } } />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    notices: state.notice.notice
  };
};

export default withRouter(connect(mapStateToProps)(Notices));
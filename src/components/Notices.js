import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Divider } from 'antd';

class Notices extends React.Component {

  render() {

    return (
      <div style={ { maxWidth: 1024, margin: "auto" } }>
        <Divider style={ { margin: "12px 0" } } />
        <Row>
          <Col span={ 18 }>
            <h2>공지사항 확인해라</h2>
          </Col>
          <Col span={ 6 } style={ { textAlign: "right" } }>
            <span>2018-05-05</span>
          </Col>
        </Row>

        <Divider style={ { margin: "12px 0" } } />

        <div style={ { minHeight: 150 } }>
          <pre>{ "난난나나다다나다다나다" }</pre>
        </div>
        <Divider style={ { margin: "12px 0" } } />
      </div>
    );
  }

}

export default Notices;
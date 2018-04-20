import React from 'react';
import { Link } from 'react-router-dom';

import { Table, Button } from 'antd';

class NoticeList extends React.Component {

  render() {

    const columns = [{
      title: 'No.',
      dataIndex: 'number'
    }, {
      title: 'Title',
      dataIndex: 'title'
    }, {
      title: 'Date',
      dataIndex: 'date'
    }];

    const data = [{
      key: '1',
      number: 1,
      title: '데이터베이스 설계',
      date: '2018-04-05'
    }, {
      key: '2',
      number: 2,
      title: '운영체제',
      date: '2018-04-05'
    }, {
      key: '3',
      number: 3,
      title: '캡스톤 디자인1',
      date: '2018-04-05'
    }];

    const rowClick = (record) => {
      return {
        onClick: () => {
          this.props.history.push(`/classroom/${ this.props.match.params.id }/notice/${ record.key }`);
        }
      };
    };


    return (
      <div style={ { margin: "auto" } }>
        <Link to={ `/classroom/${ this.props.match.params.id }/notice/upload` }>
          <Button style={ { margin: "0 0 10px" } }>Upload</Button>
        </Link>
        <Table
          columns={ columns }
          dataSource={ data }
          size="middle"
          pagination={ { position: 'none' } }
          onRow={ rowClick }
        />
      </div>
    );
  }

}

export default NoticeList;
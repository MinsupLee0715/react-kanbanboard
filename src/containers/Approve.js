import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Table, Divider, Col } from 'antd';
const { Column, ColumnGroup } = Table;

const sampleList = [{
  _id: '1',
  title: '프로젝트1',
  members: ['사람1', '사람2']
}, {
  _id: '2',
  title: '프로젝트2',
  members: ['사람3', '사람4']
}, {
  _id: '3',
  title: '프로젝트3',
  members: ['사람5', '사람6', '사람7']
}];

class Approve extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      approveList: []
    };
  }

  componentDidMount() {
    let list = [];
    //let approveList = this.props.approveList;

    //for (let i in approveList) {}
    for (let i in sampleList) {
      list.push({
        key: sampleList[i]._id,
        number: parseInt(i) + parseInt(1),
        title: sampleList[i].title,
        members: sampleList[i].members
      });
    }

    this.setState({ approveList: list });
  }


  render() {

    const columns = [{
      title: 'No.',
      dataIndex: 'number'
    }, {
      title: 'Title',
      dataIndex: 'title'
    }, {
      title: 'Members',
      dataIndex: 'members'
    }];

    return (
      <div>
        <h1>{ this.props.selectedClass.title }&#40;{ this.props.selectedClass.divide }&#41; / { "프로젝트 승인" }</h1>

        <div style={ { height: '100%', padding: 24, margin: 24, border: "1px solid #ddd" } }>

          <Table
            dataSource={ this.state.approveList }
            size="middle"
            pagination={ { position: 'none' } }
          >
            <Column
              title='No.'
              dataIndex='number'
              key="number"
            />
            <Column
              title='Title'
              dataIndex='title'
              key="title"
            />
            <Column
              title='Members'
              key="members"
              render={ (text, record, index) => {
                const memberList = [];
                for (let i in record.members) {
                  memberList.push(record.members[i]);
                  if (i != record.members.length - 1) {
                    memberList.push(<Divider type="vertical" />);
                  }
                }
                return memberList;
              } }
            />
            <Column
              title="Action"
              key="action"
              render={ (text, record) => (
                <span>
                  <a href="javascript:;">승인</a>
                  <Divider type="vertical" />
                  <a href="javascript:;">삭제</a>
                </span>
              ) }
            />
          </Table>

        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    selectedClass: state.classroom.selectedClass.classInfo
  };
};

export default withRouter(connect(mapStateToProps)(Approve));
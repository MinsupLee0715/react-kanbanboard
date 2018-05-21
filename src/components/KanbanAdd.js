import React from 'react';
import { Modal, Button, message } from 'antd';

class KanbanAdd extends React.Component {

  constructor(props) {
    super(props);
  }

  handleAdd() {
    message.success('good');
  }

  render() {
    return (
      <Modal
        visible={ this.props.data.status }
        title='칸반 등록'
        width="700px"
        onCancel={ this.props.handleCancel }
        footer={ [
          <Button key="add" onClick={ this.handleAdd }>Submit</Button>,
          <Button key="back" onClick={ this.props.handleCancel }>Close</Button>
        ] }
      >
        <p>item</p>
        <p>item</p>
      </Modal>
    );
  }
}

export default KanbanAdd;
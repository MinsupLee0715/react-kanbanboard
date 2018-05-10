import React from 'react';
import { Modal, Button } from 'antd';

class KanbanInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        visible={ this.props.data.status }
        title={ this.props.data.title }
        width="700px"
        onCancel={ this.props.handleCancel }
        footer={ [
          <Button key="back" onClick={ this.props.handleCancel }>Close</Button>
        ] }
      >
        <p>item.id : {this.props.data.id}</p>
        <p>{ this.props.data.content }</p>
      </Modal>
    );
  }
}

export default KanbanInfo;
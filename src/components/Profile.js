import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, Dropdown, Button, Tag, Badge, Icon } from 'antd';

class Profile extends React.Component {

  render() {

    const menu = (
      <Menu style={ { overflow: 'auto', width: 300, maxHeight: 500 } }>
        <Menu.Item className="new">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="new">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="new">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="new">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="old">
          <h5>{ "과목명" } / { "프로젝트명" }</h5>
          <h5>{ "피드백 요청이 있습니다." }</h5>
          <h5>{ "2018-04-08" } / { "이름" }</h5>
        </Menu.Item>
        <Menu.Divider />
      </Menu>
    );

    return (
      <div className="profile"
        style={ { padding: "0 0 25px", textAlign: "center" } }>
        <h3>
          <Tag>교수</Tag>
          <span style={ { color: "#ccc" } }>{ "조대수" } 님  </span>
          <Dropdown overlay={ menu } trigger={ ['click'] }>
            <Badge count={ 3 } dot>
              <a style={ { color: "#ccc" } }><Icon type="mail" /></a>
            </Badge>
          </Dropdown>
        </h3>
        <br />
        <Button icon="logout" style={ { width: 130 } }>Logout</Button>
      </div>
    );
  }
}

export default Profile;
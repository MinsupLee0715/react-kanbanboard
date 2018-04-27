import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NoticeList from '../components/NoticeList';
import Notices from '../components/Notices';
import NoticeUpload from '../components/NoticeUpload';

class Notice extends React.Component {

  render() {

    return (
      <div>
        <h1>{ "과목 명" } / { "공지사항" }</h1>

        <div style={ { height: '100%', padding: 24, margin: 24, border: "1px solid #ddd" } }>
          <Switch>
            <Route exact path="/classroom/:id" component={ NoticeList } />
            <Route exact path="/classroom/:id/notice" component={ NoticeList } />
            <Route path="/classroom/:id/notice/upload" component={ NoticeUpload } />
            <Route path="/classroom/:id/notice/:number" component={ Notices } />
          </Switch>
        </div>
      </div>
    );
  }

}

export default Notice;
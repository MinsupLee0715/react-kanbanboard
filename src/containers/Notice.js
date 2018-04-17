import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import NoticeList from '../components/NoticeList';
import Notices from '../components/Notices';
import NoticeUpload from '../components/NoticeUpload';

class Notice extends React.Component {

  render() {
    console.log(this.props.match.params);
    return (
      <div>
        <h1>{ "과목 명" } / { "공지사항" }</h1>

        <Switch>
          <Route exact path={ `/classroom/${ this.props.match.params.id }/notice` } component={ NoticeList } />
          <Route path={ `/classroom/${ this.props.match.params.id }/notice/upload` } component={ NoticeUpload } />
          <Route path={ `/classroom/${ this.props.match.params.id }/notice/:number` } component={ Notices } />
        </Switch>
      </div>
    );
  }

}

export default Notice;
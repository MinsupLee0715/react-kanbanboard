let notice = new Array();

// classID, date, title, content
notice = [
  ["c1811db", "2018-10-20T05:57:11.358Z", "공지입니다.", "공지입니다."],
  ["c1811db", "2018-10-21T05:57:11.358Z", "잘좀하세요.", "공지입니다."],
  ["c1811db", "2018-10-22T05:57:11.358Z", "열심히합시다.", "공지입니다."],
  ["c1811os", "2018-10-20T05:57:11.358Z", "공지입니다.", "공지입니다."],
  ["c1811os", "2018-10-21T05:57:11.358Z", "잘좀하세요.", "공지입니다."],
  ["c1811os", "2018-10-22T05:57:11.358Z", "열심히합시다.", "공지입니다."],
  ["c1811cd", "2018-10-20T05:57:11.358Z", "공지입니다.", "공지입니다."],
  ["c1811cd", "2018-10-20T05:57:11.358Z", "공지입니다.", "공지입니다."],
  ["c1811cd", "2018-10-21T05:57:11.358Z", "잘좀하세요.", "공지입니다."],
  ["c1812db", "2018-10-21T05:57:11.358Z", "잘좀하세요.", "공지입니다."],
  ["c1812db", "2018-10-22T05:57:11.358Z", "열심히합시다.", "공지입니다."],
  ["c1812db", "2018-10-22T05:57:11.358Z", "열심히합시다.", "공지입니다."],
];

const generateNotice = (data) => {
  return {
    classID: data[0],
    date: data[1],
    title: data[2],
    content: data[3],
  }
}

const get = (id) => {
  let store = [];
  for (let i in notice) {
    if (notice[i][0] === id) {
      store.push(generateNotice(notice[i]));
    }
  }

  return store;
};

const post = (classid, title, content) => {
  notice.push([classid, new Date().toLocaleString(), title, content]);
  return get(classid);
};

const destroy = (classid) => {
  for (let i in notice) {
    if (notice[i][1] === classid) {
      notice.splice(i, 1);
    }
  }
  return get(classid);
}

module.exports = {
  get,
  post,
  destroy,
}
import account from './account';
import classroom from './classroom';

let kanbanBoard = new Array();

kanbanBoard = [{
  projectID: "2018-10-30T02:13:50.824Z",
  kanban: [{
    created_date: "2018-10-31T02:13:50.824Z",
    updated_date: "2018-10-31T02:13:50.824Z",
    title: "프로젝트 계획서",
    content: "1차 제출본입니다.",
    importance: 4,
    end_date: "2018-11-10T02:13:50.824Z",
    status: "DOING", //['TODO', 'DOING', 'FEEDBACK', 'FINISH']
    feedback: [],
  }, {
    created_date: "2018-10-31T03:13:50.824Z",
    updated_date: "2018-10-31T03:13:50.824Z",
    title: "요구사항 기술서",
    content: "1차본입니다.",
    importance: 3,
    end_date: "2018-11-11T02:13:50.824Z",
    status: "TODO", //['TODO', 'DOING', 'FEEDBACK', 'FINISH']
    feedback: [],
  }]
}];

const get = (kanbanID) => {
  for (let i in kanbanBoard) {
    for (let j in kanbanBoard[i].kanban)
      if (kanbanBoard[i].kanban[j].created_date === kanbanID) {
        return [kanbanBoard[i].kanban[j]];
      }
  }
  return false;
};

const getFeedback = (kanbanID) => {
  for (let i in kanbanBoard) {
    for (let j in kanbanBoard[i].kanban)
      if (kanbanBoard[i].kanban[j].created_date === kanbanID) {
        return kanbanBoard[i].kanban[j].feedback;
      }
  }
  return false;
};

const getList = (projectID) => {
  for (let i in kanbanBoard) {
    if (kanbanBoard[i].projectID === projectID) {
      return kanbanBoard[i].kanban;
    }
  }
  return [];
};

const post = (projectID, title, content, importance, end_date) => {
  for (let i in kanbanBoard) {
    if (kanbanBoard[i].projectID === projectID) {
      kanbanBoard[i].kanban.push({
        title: title,
        content: content,
        importance: parseInt(importance),
        end_date: end_date,
        status: "TODO",
        created_date: new Date().toLocaleString(),
        updated_date: new Date().toLocaleString(),
      });
    }
    console.log(kanbanBoard);
    return true;
  }

  return false;
};

// 수정
const update = (kanbanID, title, content, updated_date) => {
  for (let i in kanbanBoard) {
    for (let j in kanbanBoard[i].kanban)
      if (kanbanBoard[i].kanban[j].created_date === kanbanID) {
        kanbanBoard[i].kanban[j].title = title;
        kanbanBoard[i].kanban[j].content = content;
        kanbanBoard[i].kanban[j].updated_date = updated_date;
        return true;
      }
  }

  return false;
}

// 상태 수정
const updateStatus = (kanbanID, status) => {
  for (let i in kanbanBoard) {
    for (let j in kanbanBoard[i].kanban)
      if (kanbanBoard[i].kanban[j].created_date === kanbanID) {
        kanbanBoard[i].kanban[j].status = status;
        kanbanBoard[i].kanban[j].updated_date = new Date().toLocaleString();
        return true;
      }
  }

  return false;
}

//삭제
const destroy = (kanbanID) => {
  for (let i in kanbanBoard) {
    for (let j in kanbanBoard[i].kanban)
      if (kanbanBoard[i].kanban[j].created_date === kanbanID) {
        kanbanBoard[i].kanban.splice(j, 1);
        return true;
      }
  }
  return false;
};

module.exports = {
  get,
  getFeedback,
  getList,
  post,
  update,
  updateStatus,
  destroy,
}
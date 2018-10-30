import account from './account';
import classroom from './classroom';

let project = new Array();

// classID, date, title, content
project = [];


const get = (classID, userID) => {
  if (!userID) {
    return project.map((index) => {
      if (index.classID === classID) {
        return index;
      }
    });
  } else {
    for (let i in project) {
      if (project[i].classID === classID) {
        for (let j in project[i].studentID) {
          if (project[i].studentID[j] === userID)
            return [project[i]];
        }
      }
    }

    return [];
  }
};

const post = (classID, title, studentID, projectID, leader) => {
  let names = studentID.map(i => {
    return account.get(i);
  });

  let proj = {
    classID: classID,
    projectID: projectID,
    title: title,
    status: "standby",
    updated_date: projectID,
    studentID: studentID,
    name: names,
    leader: leader,
  };

  project.push(proj);

  // class_student 테이블 수정
  for (let i in studentID) {
    classroom.updateClassStudent(proj.classID, studentID[i], proj.projectID);
  }

  return project;
};

// 승인
const insert = (projectID) => {
  for (let i in project) {
    if (project[i].projectID === projectID) {
      project[i].status = "start";
      return true;
    }
  }

  return false;
};

//삭제
const destroy = (projectID) => {
  for (let i in project) {
    if (project[i].projectID === projectID) {
      // class_student 테이블 수정
      for (let j in project[i].studentID) {
        classroom.updateClassStudent(
          project[i].classID,
          project[i].studentID[j],
          project[i].projectID
        );
      }
      // 프로젝트 삭제
      project.splice(i, 1);
      return true;
    }
  }

  return false;
};

module.exports = {
  get,
  post,
  insert,
  destroy,
}
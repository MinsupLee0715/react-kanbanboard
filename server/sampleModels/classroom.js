import account from './account';

let classroom = new Array();
let class_student = new Array();

// classid, title, divide, period, professorID
classroom = [
  ["c1811db", "Database Design", "101", "2018-1", "1111"],
  ["c1811os", "Opration System", "101", "2018-1", "2222"],
  ["c1814cd", "Castone Design", "104", "2018-1", "3333"],
  ["c1812db", "Daabase Intensive Course", "101", "2018-1", "1111"],
  ["c1813db", "C rogramming", "101", "2018-1", "1111"],
  ["c1814db", "C+ Programming", "101", "2018-1", "1111"],
  ["c1723db", "Database Design", "103", "2017-2", "1111"],
  ["c1721db", "Jaa Programming", "101", "2017-2", "1111"],
  ["c1711db", "pyhon Programming", "101", "2017-1", "1111"],
  ["c1712db", "C rogramming", "101", "2017-1", "1111"],
];

// classid, studentID
class_student = [
  ["c1811db", "1", "2018-10-30T02:13:50.824Z"],
  ["c1811db", "2", "2018-10-30T02:13:50.824Z"],
  ["c1811db", "3", "2018-10-30T02:13:50.824Z"],
  ["c1811db", "4", null],
  ["c1811db", "5", null],
  ["c1811db", "6", null],
  ["c1811db", "7", null],
  ["c1811db", "8", null],
  ["c1811db", "9", null],
  ["c1811os", "1", null],
  ["c1811os", "2", null],
  ["c1811os", "3", null],
  ["c1811os", "4", null],
  ["c1811os", "5", null],
  ["c1811os", "6", null],
  ["c1811os", "7", null],
  ["c1811os", "8", null],
  ["c1811os", "9", null],
  ["c1814cd", "1", null],
  ["c1814cd", "2", null],
  ["c1814cd", "3", null],
  ["c1814cd", "4", null],
  ["c1814cd", "5", null],
  ["c1814cd", "6", null],
  ["c1814cd", "7", null],
  ["c1814cd", "8", null],
  ["c1814cd", "9", null],
  ["c1812db", "1", null],
  ["c1812db", "2", null],
  ["c1812db", "3", null],
  ["c1812db", "4", null],
  ["c1812db", "5", null],
  ["c1812db", "6", null],
  ["c1812db", "7", null],
  ["c1812db", "8", null],
  ["c1812db", "9", null],
  ["c1813db", "1", null],
  ["c1813db", "2", null],
  ["c1813db", "3", null],
  ["c1813db", "4", null],
  ["c1813db", "5", null],
  ["c1813db", "6", null],
  ["c1813db", "7", null],
  ["c1813db", "8", null],
  ["c1813db", "9", null],
  ["c1814db", "1", null],
  ["c1814db", "2", null],
  ["c1814db", "3", null],
  ["c1814db", "4", null],
  ["c1814db", "5", null],
  ["c1814db", "6", null],
  ["c1814db", "7", null],
  ["c1814db", "8", null],
  ["c1814db", "9", null],
  ["c1723db", "1", null],
  ["c1723db", "2", null],
  ["c1723db", "3", null],
  ["c1723db", "4", null],
  ["c1723db", "5", null],
  ["c1723db", "6", null],
  ["c1723db", "7", null],
  ["c1723db", "8", null],
  ["c1723db", "9", null],
  ["c1711db", "1", null],
  ["c1711db", "2", null],
  ["c1711db", "3", null],
  ["c1711db", "4", null],
  ["c1711db", "5", null],
  ["c1711db", "6", null],
  ["c1711db", "7", null],
  ["c1711db", "8", null],
  ["c1711db", "9", null],
  ["c1712db", "1", null],
  ["c1712db", "2", null],
  ["c1712db", "3", null],
  ["c1712db", "4", null],
  ["c1712db", "5", null],
  ["c1712db", "6", null],
  ["c1712db", "7", null],
  ["c1712db", "8", null],
  ["c1712db", "9", null],
  ["c1721db", "1", null],
  ["c1721db", "2", null],
  ["c1721db", "3", null],
  ["c1721db", "4", null],
  ["c1721db", "5", null],
  ["c1721db", "6", null],
  ["c1721db", "7", null],
  ["c1721db", "8", null],
  ["c1721db", "9", null],
];

const generateClass = (data) => {
  return {
    classID: data[0],
    title: data[1],
    divide: data[2],
    period: data[3],
    professorID: data[4],
    name: data[4] === "1111" ? "조대수" : data[4] === "2222" ? "문미경" : "김동현"
  }
};

const generateStudents = (data) => {
  return {
    classID: data[0],
    studentID: data[1],
    name: data[2],
    projectID: data[3],
  }
};

exports.getProfClass = (id) => {
  let classes = [];

  for (let i in classroom) {
    if (classroom[i][4] === id)
      classes.push(generateClass(classroom[i]));
  }

  return classes;
};

exports.getStudClass = (id) => {
  let classes = [];
  let store = [];

  for (let i in class_student) {
    if (class_student[i][1] === id)
      store.push(class_student[i][0]);
  }

  for (let j in classroom) {
    for (let i in store) {
      if (classroom[j][0] === store[i]) {
        classes.push(generateClass(classroom[j]));
        if (classes.length >= store.length) {
          return classes;
        }
        break;
      }
    }
  }

  return classes;
};

exports.getClassInfo = (classid) => {
  for (let i in classroom) {
    if (classroom[i][0] === classid)
      return generateClass(classroom[i]);
  }
};

exports.getClassStudent = (classID) => {
  let store = [];
  for (let i in class_student) {
    if (class_student[i][0] === classID)
      store.push(
        generateStudents([
          classID,
          class_student[i][1],
          account.get(class_student[i][1]),
          class_student[i][2],
        ])
      );
  }
  return store;
};

exports.updateClassStudent = (classID, userID, projectID) => {
  for (let i in class_student) {
    if (class_student[i][0] === classID && class_student[i][1] === userID) {
      class_student[i][2] = projectID;
      return;
    }
  }
}
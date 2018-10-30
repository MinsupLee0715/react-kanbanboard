let professor = new Array();
let student = new Array();

professor = [
  ["1111", "1234", "조대수"],
  ["2222", "1234", "문미경"],
  ["3333", "1234", "김동현"]
];

student = [
  ["1", "1234", "정화평"],
  ["2", "1234", "서현규"],
  ["3", "1234", "안병언"],
  ["4", "1234", "김윤지"],
  ["5", "1234", "이승수"],
  ["6", "1234", "최진혁"],
  ["7", "1234", "팀 킬"],
  ["8", "1234", "빌게이"],
  ["9", "1234", "마크 저커벌레"],
];

exports.login = (id, pw, type) => {
  if (type === "professor") {
    for (let i in professor) {
      // id 검증
      if (professor[i][0] === id) {
        // pw 검증
        if (professor[i][1] === pw) {
          return professor[i];
        }
      }
    }
    return undefined;
  } else {
    for (let i in student) {
      // id 검증
      if (student[i][0] === id) {
        // pw 검증
        if (student[i][1] === pw) {
          return student[i];
        }
      }
    }
    return undefined;
  }
};

exports.get = (id) => {
  for (let i in student) {
    if (student[i][0] === id)
      return student[i][2];
  }
}
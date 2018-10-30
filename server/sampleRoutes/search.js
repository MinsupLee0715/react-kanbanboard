import express from 'express';
// import db from '../models/mysqlDatabase';
const router = express.Router();

// /api/classroom/search/*

// get search project
// 수업명/프로젝트명/참여학생으로 검색
// 학생은 본인이 참여한 수업에서 검색
// 교수는 자신이 포함된 수업에서 검색
router.get('/:keyword', (req, res) => {
  let keyword = req.params.keyword;
  console.log('keyword : ' + keyword);

  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "User is undefined",
      code: 1
    });
  }

  if (!keyword || keyword == '') {
    return res.status(403).json({
      error: "Empty Keyword",
      code: 2
    });
  }

  if (keyword == '&ALL')
    keyword = '';

  let query = '';

  let keywordList = keyword;

  /* 자신이 속한 프로젝트에서 키워드 검색 */
  query = `
    SELECT DISTINCT
      Project.projectID
    FROM Project, (
      SELECT DISTINCT
        Classroom.classID,
        Classroom.title,
        Classroom.professorID,
        Class_Student.studentID,
        Class_Student.projectID,
        Class_Student.name
      FROM Classroom, (
        SELECT
          Class_Student.classID,
          Class_Student.studentID,
          Class_Student.projectID,
          Student.name
        FROM Class_Student, Student
        WHERE Class_Student.studentID = Student.studentID
      ) AS Class_Student
      WHERE Classroom.classID = Class_Student.classID
      ) AS Class_Info
    WHERE
      Project.projectID = Class_Info.projectID
      AND (
        Project.title LIKE '%${ keyword }%'
        OR Class_Info.studentID LIKE '%${ keyword }%'
        OR Class_Info.title LIKE '%${ keyword }%'
        OR Class_Info.name LIKE '%${ keyword }%' )
    `;

  if (req.session.loginInfo.type === 'professor')
    query += ` AND Class_Info.professorID = '${ req.session.loginInfo.userid }'`;
  else
    query += ` AND Class_Info.studentID = '${ req.session.loginInfo.userid }'`;


  db.query(query, (err, result) => {
    if (err) {
      console.log('111111111111111111111111111111');
      return res.status(403).json({
        error: "Check Query",
        code: 3
      });
    }

    /* 프로젝트 ID 만 배열로 추출 */
    let projectList = [];
    result.forEach(e => {
      projectList.push("'" + e.projectID + "'");
    });

    console.log('프로젝트 검색');
    console.log(projectList);

    if (projectList.length == 0)
      return res.json({ result: [] });

    query = `
      SELECT
        Class_Student_Classroom.classID,
        Class_Student_Classroom.studentID,
        Class_Student_Classroom.projectID,
        Class_Student_Classroom.name,
        Class_Student_Classroom.title AS classTitle,
        Class_Student_Classroom.divide,
        Class_Student_Classroom.period,
        Project.title AS projectTitle,
        Project.status,
        Project.leader,
        Project.updated_date
      FROM Project,
        (SELECT
          Class_Student.classID,
          Class_Student.studentID,
          Class_Student.projectID,
          Class_Student.name,
          Classroom.title,
          Classroom.divide,
          Classroom.period
        FROM
          (SELECT
            Class_Student.classID,
            Class_Student.studentID,
            Class_Student.projectID,
            Student.name
          FROM
            Class_Student, Student
          WHERE Class_Student.studentID = Student.studentID
          ) AS Class_Student, Classroom
          WHERE Class_Student.classID = Classroom.classID
        ) AS Class_Student_Classroom
      WHERE Project.projectID = Class_Student_Classroom.projectID
        AND Project.projectID IN (${ projectList })
    `;

    db.query(query, (err, result) => {
      if (err) {
        console.log(query);
        console.log('22222222222222222222222222222222222');
        return res.status(403).json({
          error: "Check Query",
          code: 3
        });
      }
      return res.json({ result: result });
    }); // Select Project
  }); // Select Keyword
}); // route /search/:keyword


export default router;
import express from 'express';
import db from '../models/mysqlDatabase';
const router = express.Router();

// /api/classroom/search/*

// get search project
// 수업명/프로젝트명/참여학생으로 검색
// 학생은 본인이 참여한 수업에서 검색
// 교수는 자신이 포함된 수업에서 검색
router.get('/:keyword', (req, res) => {
  const keyword = req.params.keyword;
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

  let query = '';

  query = `
      SELECT DISTINCT
        Project.projectID,
        Project.title AS projectTitle,
        Project.leader,
        Class_Info.classID,
        Class_Info.title AS classTitle,
        Class_Info.divide,
        Class_Info.period,
        Class_Info.studentID,
        Class_Info.professorID
      FROM Project, (
        SELECT DISTINCT
          Classroom.classID,
          Classroom.title,
          Classroom.divide,
          Classroom.period,
          Classroom.professorID,
          Class_Student.studentID,
          Class_Student.projectID
        FROM Classroom, Class_Student
        WHERE Classroom.classID = Class_Student.classID
      ) AS Class_Info
      WHERE
        Project.projectID = Class_Info.projectID
        AND (
          Project.title LIKE '%${ keyword }%'
          OR Class_Info.studentID LIKE '%${ keyword }%'
          OR Class_Info.title LIKE '%${ keyword }%'
        )
    `;

  if (req.session.loginInfo.type === 'professor')
    query += `AND Class_Info.professorID = '${ req.session.loginInfo.userid }'`;
  else
    query += `AND Class_Info.studentID = '${ req.session.loginInfo.userid }'`;
    // 쿼리 수정해야됨
    // select 구문 안에 class_student 에서 loginuser 검색해서 in 해서 알아서 해라

  db.query(query, (err, result) => {
    if (err)
      return res.status(403).json({
        error: "Check Query",
        code: 3
      });

    return res.json({ result: result });
  });
});


export default router;
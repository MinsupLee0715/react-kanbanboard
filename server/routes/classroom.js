import express from 'express';
import db from '../models/mysqlDatabase';
import notice from './notice';
import project from './project';
import kanban from './kanban';
const router = express.Router();

// /api/classroom/*

/* router */
router.use('/notice', notice);
router.use('/project', project);
router.use('/kanban', kanban);


/* 내 강의실 */
router.post('/myclassrooms', (req, res) => {
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "User is undefined",
      code: 1
    });
  }

  let loginInfo = req.session.loginInfo;
  let query = '';

  // 교수일 경우
  if (loginInfo.type == 'professor') {
    query = "SELECT * FROM classroom WHERE professorID=?";
    db.query(query, loginInfo.userid, (err, result) => {
      if (err) throw err;
      console.log("수업 목록: " + result.length);
      return res.json({ result: result });
    });

  } else { // 학생일 경우
    query = `SELECT professor.name,
    class.classID,
    class.title,
    class.divide,
    class.period
    FROM professor JOIN (
      SELECT
        classroom.classID,
        classroom.professorID,
        classroom.title,
        classroom.divide,
        classroom.period,
        class_student.studentID,
        class_student.projectID
      FROM classroom JOIN (
        SELECT * FROM class_student WHERE studentID=?
      ) AS class_student ON class_student.classID = classroom.classID
    ) AS class ON class.professorID = professor.professorID`;
    
    db.query(query, loginInfo.userid, (err, result) => {
      if (err) throw err;
      console.log("수업 목록: " + result.length);
      return res.json({ result: result });
    });
  }
});

/* 수업 내 학생 조회 */
router.get('/getClassStudent', (req, res) => {
  let classID = req.query.classID;
  console.log(classID);
  let query = `SELECT * FROM (
    (SELECT
      class_student.classID,
      class_student.studentID,
      class_student.projectID,
      student.name FROM class_student
      JOIN student
      ON  class_student.studentID = student.studentID)
      AS class_student
    ) WHERE class_student.classID = ?`;

  db.query(query, classID, (err, result) => {
    if (err) throw err;
    console.log(classID + " 수강 학생 조회 완료");
    res.json({ result: result });
  });
});

export default router;
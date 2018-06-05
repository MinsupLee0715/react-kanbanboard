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


/* 수업 정보 가져오기 */
//router.get('/getClassInfo/')

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
    query = "SELECT * FROM Classroom WHERE professorID=?";
    db.query(query, loginInfo.userid, (err, result) => {
      if (err) throw err;
      console.log("수업 목록: " + result.length);
      return res.json({ result: result });
    });

  } else { // 학생일 경우
    query = `SELECT Professor.name,
    Class.classID,
    Class.title,
    Class.divide,
    Class.period
    FROM Professor JOIN (
      SELECT
        Classroom.classID,
        Classroom.professorID,
        Classroom.title,
        Classroom.divide,
        Classroom.period,
        Class_Student.studentID,
        Class_Student.projectID
      FROM Classroom JOIN (
        SELECT * FROM Class_Student WHERE studentID=?
      ) AS Class_Student ON Class_Student.classID = Classroom.classID
    ) AS Class ON Class.professorID = Professor.professorID`;
    
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
      Class_Student.classID,
      Class_Student.studentID,
      Class_Student.projectID,
      Student.name FROM Class_Student
      JOIN Student
      ON  Class_Student.studentID = Student.studentID)
      AS Class_Student
    ) WHERE Class_Student.classID = ?`;

  db.query(query, classID, (err, result) => {
    if (err) throw err;
    console.log(classID + " 수강 학생 조회 완료");
    res.json({ result: result });
  });
});

export default router;
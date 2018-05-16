import express from 'express';
import db from '../models/mysqlDatabase';
import notice from './notice';
import project from './project';
const router = express.Router();

// /api/classroom/*

/* router */
router.use('/notice', notice);
router.use('/project', project);


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
    query = "SELECT * FROM classroom JOIN (SELECT * FROM class_student WHERE studentID=?) AS class_student ON class_student.classID = classroom.classID";
    db.query(query, loginInfo.userid, (err, result) => {
      if (err) throw err;
      console.log("수업 목록: " + result.length);
      return res.json({ result: result });
    });

  }
});

export default router;
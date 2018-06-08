import express from 'express';
import db from '../models/mysqlDatabase';
const router = express.Router();

// /api/classroom/notice/*

// get notice
router.get('/', (req, res) => {
  // 로그인 확인
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "User is undefined",
      code: 1
    });
  };

  let classID = req.query.classID;
  let query = '';

  query = 'SELECT * FROM Notice WHERE classID = ?';
  db.query(query, classID, (err, result) => {
    if (err) {
      return res.status(403).json({
        error: "Check Data",
        code: 3
      });
    } // if err
    console.log("공지사항: " + result.length);
    return res.json({ result: result });
  });
});


// add notice
router.post('/', (req, res) => {
  let loginInfo = req.session.loginInfo;

  // 교수가 아닐 시
  if (loginInfo.type != 'professor') {
    return res.status(403).json({
      error: "Forbidden",
      code: 1
    });
  }

  // 클라이언트로부터 받은 데이터
  let noticeData = {
    classID: req.body.classID,
    title: req.body.title,
    content: req.body.content,
    date: new Date().toLocaleString() // to Mysql Datetime
  };

  // 입력 데이터가 없을 시
  if (noticeData.classID === "" || noticeData.title === "" || noticeData.content === "") {
    return res.status(400).json({
      error: "Empty data",
      code: 2
    });
  }

  let query = 'INSERT INTO Notice SET ?';
  db.query(query, noticeData, (err) => {
    if (err) {
      return res.status(403).json({
        error: "Check Data",
        code: 3
      });
    } // if err
    console.log("공지사항 등록 완료");

    query = `SELECT Class_Student.studentID, Classroom.title
    FROM Class_Student, Classroom
    WHERE Class_Student.classID = Classroom.classID
    AND Class_Student.classID = ?`;
    db.query(query, noticeData.classID, (err, result) => {
      if (err) {
        return res.status(403).json({
          error: "Check Data",
          code: 3
        });
      } // if err

      /* 학생 ID 목록 */
      let studentList = [];
      result.forEach(e => {
        studentList.push(e.studentID);
      });

      /* 수업 내 학생에게 공지사항 등록 메시지 전송 */
      query = 'INSERT INTO Message (receive_date, userID, type, classID, isCheck, classTitle) VALUES ';
      for (let i in studentList) {
        if (i == 0) {
          query += `("${ new Date().toLocaleString() }", "${ studentList[i] }", "NTC", "${ noticeData.classID }", false, "${ result[0].title }")`;
        } else {
          query += `, ("${ new Date().toLocaleString() }", "${ studentList[i] }", "NTC", "${ noticeData.classID }", false, "${ result[0].title }")`;
        }
      }

      db.query(query, (err) => {
        if (err) {
          return res.status(403).json({
            error: "Check Data",
            code: 3
          });
        } // if err
        console.log('공지사항 메시지 전송 완료');
        return res.send({ result: true });
      });
    });
  });
});

router.delete('/:id', (req, res) => {
  let loginInfo = req.session.loginInfo;
  let noticeID = req.params.id;

  // 교수가 아닐 시
  if (loginInfo.type != 'professor') {
    return res.status(403).json({
      error: "Forbidden",
      code: 1
    });
  }

  // 삭제 쿼리
  let query = 'DELETE FROM Notice WHERE date = ?';
  db.query(query, noticeID, (err, result) => {
    if (err) {
      return res.status(403).json({
        error: "Check Data",
        code: 3
      });
    } // if err
    console.log("공지사항 삭제 완료");
    return res.send({ result: true });
  });
});

export default router;
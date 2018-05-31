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

  let classid = req.query.classid;
  let query = '';

  query = 'SELECT * FROM Notice WHERE classID=?';
  db.query(query, classid, (err, result) => {
    if (err) throw err;
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
    classid: req.body.classid,
    title: req.body.title,
    content: req.body.content,
    date: new Date().toISOString().slice(0, 19) // to Mysql Datetime
  };

  // 입력 데이터가 없을 시
  if (noticeData.classid === "" || noticeData.title === "" || noticeData.content === "") {
    return res.status(400).json({
      error: "Empty data",
      code: 2
    });
  }

  let query = 'INSERT INTO Notice SET ?';
  db.query(query, noticeData, (err, result) => {
    if (err) throw err;
    console.log("공지사항: " + result.length);
    return res.send({ result: true });
  });
});

export default router;
import express from 'express';
import mongoose from 'mongoose';
import Classroom from '../models/classroom';

const router = express.Router();

// /api/classroom/*


/* 내 강의실 */
router.post('/myclassrooms', (req, res) => {
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "User is undefined",
      code: 1
    });
  }

  let loginInfo = req.session.loginInfo;

  if (loginInfo.type == 'professor') {
    Classroom.find({ 'professor.userid': loginInfo.userid },
      (err, result) => {
        if (!result) {
          return res.status(401).json({
            error: "Class Not Found",
            code: 2
          });
        }

        return res.json({ result: result });
      })
  } else {
    Classroom.find({ 'students': { '$elemMatch': { 'userid': loginInfo.userid } } },
      (err, result) => {
        if (!result) {
          return res.status(401).json({
            error: "Class Not Found",
            code: 2
          });
        }

        return res.json({ result: result });
      })
  }
});

/* notice */
// add notice
router.post('/notice', (req, res) => {
  let loginInfo = req.session.loginInfo;

  // 교수가 아닐 시
  if (loginInfo.type != 'professor') {
    return res.status(403).json({
      error: "Forbidden",
      code: 1
    });
  }

  let noticeData = {
    title: req.body.title,
    content: req.body.content
  };

  // 입력 데이터가 없을 시
  if (noticeData.title === "" || noticeData.content === "") {
    return res.status(400).json({
      error: "Empty data",
      code: 2
    });
  }

  Classroom.update({
    _id: req.body._id
  }, {
      $push: {
        notice: noticeData
      }
    }, (err, result) => {
      if (err) throw err;
      res.send({ result: true });
    });
});

export default router;
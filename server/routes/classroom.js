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
          return res.statusCode(401).json({
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
          return res.statusCode(401).json({
            error: "Class Not Found",
            code: 2
          });
        }

        return res.json({ result: result });
      })
  }


});

export default router;
import express from 'express';
import mongoose from 'mongoose';
import mysql from 'mysql';
import db from '../models/mysqlDatabase';
import User from '../models/user';

const router = express.Router();

// /api/account/*


/* 로그인 */
router.post('/login', (req, res) => {
  let loginInfo = [req.body.userid, req.body.password];

  /* 로그인 시도 */
  let query = "";
  if (req.body.type == "student") {
    query = "select * from student where userid=? and password=?";
  } else {
    query = "select * from professor where userid=? and password=?";
  }
  db.query(query, loginInfo, (err, result, fields) => {
    if (err) throw err;

    if (result == '') {
      return res.status(401).json({
        error: "Login Failed",
        code: 1
      });
    }

    /* if (!result.validateHash(userInfo.password)) {
      return res.status(401).json({
        error: "Login Failed",
        code: 1
      });
    } */

    // 세션 등록
    let session = req.session.loginInfo = {
      userid: result[0].userid,
      name: result[0].name,
      type: "student"
    };
    console.log("user login: " + req.session.loginInfo.userid + "/" + req.session.loginInfo.name);

    return res.json({ result: session });
  });
});

/* 로그아웃 */
router.get('/logout', (req, res) => {
  console.log("user logout: " + req.session.loginInfo.userid + "/" + req.session.loginInfo.name);
  req.session.destroy();
  return res.json({ result: true });
});

/* 세션확인 */
router.get('/isLogin', (req, res) => {
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "User is undefined",
      code: 1
    });
  }

  return res.json({ result: req.session.loginInfo });
});

export default router;
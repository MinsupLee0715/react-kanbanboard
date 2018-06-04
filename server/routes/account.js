import express from 'express';
import db from '../models/mysqlDatabase';

import bcrypt from 'bcryptjs';

const router = express.Router();

const validateHash = function (inputPW, password) {
  return bcrypt.compareSync(inputPW, password);
};

// /api/account/*


/* 로그인 */
router.post('/login', (req, res) => {
  let loginInfo = [req.body.userid, req.body.password];

  /* 로그인 시도 */
  let query = "";
  if (req.body.type == "student") {
    query = "SELECT * FROM Student where studentID=?";
  } else {
    query = "SELECT * FROM Professor where professorID=?";
  }
  db.query(query, loginInfo, (err, result, fields) => {
    if (err) throw err;

    if (result == '') {
      return res.status(401).json({
        error: "Login Failed",
        code: 1
      });
    }

    if (!validateHash(loginInfo[1], result[0].password)) {
      return res.status(401).json({
        error: "Wrong Password",
        code: 2
      });
    }

    // 세션 등록
    let session = req.session.loginInfo = {
      userid: result[0].studentID || result[0].professorID,
      name: result[0].name,
      type: req.body.type
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

/* 메시지 확인 */
router.get('/message', (req, res) => {
  let loginInfo = req.session.loginInfo;

  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "User is undefined",
      code: 1
    });
  }

  console.log(loginInfo.userid + ' 메시지 조회');

  let query = '';
  query = 'SELECT * FROM Message WHERE userID = ?';
  db.query(query, loginInfo.userid, (err, result) => {
    if (err) throw err;

    return res.json({ result: result });
  });
});

export default router;
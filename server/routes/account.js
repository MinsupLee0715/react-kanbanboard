import express from 'express';
import mongoose from 'mongoose';
import User from '../medels/user';

const router = express.Router();

// /api/account/*


/* 로그인 */
router.post('/signin', (req, res) => {
  let userInfo = new User({
    userid: req.body.userid,
    password: req.body.password
  });

  // 로그인 시도
  User.findOne({ userid: userInfo.userid }, (err, result) => {
    if (err) throw err;

    if (!result) {
      return res.status(401).json({
        error: "Login Failed",
        code: 1
      });
    }

    if (!result.validateHash(userInfo.password)) {
      return res.status(401).json({
        error: "Login Failed",
        code: 1
      });
    }

    // 세션 등록
    let session = req.session.loginInfo = {
      _id: result._id,
      userid: result.userid,
      name: result.name,
      type: result.type
    };

    console.log("user login: ");
    console.log(session);

    return res.json({ result: true });
  });

});

/* 로그아웃 */
router.post('/signout', (req, res) => {
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
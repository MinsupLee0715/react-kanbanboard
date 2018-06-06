import express from 'express';
import db from '../models/mysqlDatabase';
const router = express.Router();

// /api/classroom/kanban/feedback/*

// get feedback
router.get('/:kanbanID', (req, res) => {
  let loginInfo = req.session.loginInfo;
  let kanbanID = req.params.kanbanID;

  // 로그인 확인
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "User is undefined",
      code: 1
    });
  };

  // kanbanID is null / undefined
  if (!kanbanID) {
    return res.status(401).json({
      error: "kanbanID is undefined",
      code: 2
    });
  };

  let query = '';

  query = 'SELECT * FROM Comment WHERE created_date = ?'
  db.query(query, kanbanID, (err, result) => {
    if (err) throw err;
    console.log(kanbanID + "의 Comment 조회");
    return res.json({ result: result });
  });
});


// post feedback
router.post('/', (req, res) => {
  let loginInfo = req.session.loginInfo;

  // 교수가 아닐 시
  if (loginInfo.type != 'professor') {
    return res.status(403).json({
      error: "Forbidden",
      code: 1
    });
  }

  let data = {
    created_date: req.body.kanbanID,
    date: new Date().toISOString().slice(0, 19),
    content: req.body.content
  };

  console.log(data);

  if (!data.created_date || !data.content) {
    return res.status(401).json({
      error: "Empty Data",
      code: 2
    });
  }

  let query = '';

  query = 'INSERT INTO Comment SET ?'
  db.query(query, data, (err) => {
    if (err) throw err;
    console.log('comment 등록 성공');
    return res.json({ result: "success" });
  });
});

export default router;
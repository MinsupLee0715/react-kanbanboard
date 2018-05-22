import express from 'express';
import db from '../models/mysqlDatabase';
import { SSL_OP_NO_QUERY_MTU } from 'constants';
const router = express.Router();

// /api/classroom/kanban/*

// 프로젝트에 대한 모든 칸반 정보 요청
router.get('/', (req, res) => { // ../kanban?projectID=''
  let loginInfo = req.session.loginInfo;
  let projectID = req.query.projectID;

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }

  let query = '';
});

// 특정 칸반에 대한 정보 요청
router.get('/:id', (req, res) => { // ../kanban/kanbanid
  let loginInfo = req.session.loginInfo;
  let kanbanID = req.params.id;

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }
});

// 칸반 등록
router.post('/', (req, res) => {
  let loginInfo = req.session.loginInfo;

  let projectID = req.body.projectID;
  let title = req.body.title;
  let content = req.body.content;

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }

  // 데이터가 없을 시
  if (title == '' || content == '') {
    return res.status(400).json({
      error: "Empty Data",
      code: 2
    });
  }

  let query = '';

  // 수업 내 학생 소속 여부 확인
  query = 'SELECT * FROM class_student WHERE studentID = ? AND projectID = ?';
  db.query(query, [loginInfo.userid, projectID], (err, result) => {
    if (err) throw err;
    if (result.length == 0) { // 검색결과가 없을 시
      return res.status(403).json({
        error: "Forbidden",
        code: 3
      });
    } else { // 검색결과가 있을 시

      query = 'INSERT INTO kanban SET ?';
      let data = { // 입력 데이터
        title: title,
        content: content,
        status: 'TODO',
        projectID: projectID
      };

      // 칸반 등록
      db.query(query, data, (err) => {
        if (err) throw err;
        console.log(projectID + '칸반 등록 성공');
        return res.json({ result: "success" });
      });
    }
  });
});

// 특정 칸반에 대한 정보 수정
router.put('/:id', (req, res) => {
  let loginInfo = req.session.loginInfo;
  let kanbanID = req.body.id;

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }

  let projectID = req.body.projectID;
  let title = req.body.title;
  let content = req.body.content;
  let contribute = req.body.contribute;

  // 데이터가 없을 시
  if (title == '' || content == '') {
    return res.status(400).json({
      error: "Empty Data",
      code: 2
    });
  }

  return res.json({result: 'not yet'});
});

// 특정 칸반에 대한 정보 삭제
router.delete('/:id', (req, res) => {
  let loginInfo = req.session.loginInfo;
  let kanbanID = req.body.id;

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }
});

export default router;
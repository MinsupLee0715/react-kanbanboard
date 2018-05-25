import express from 'express';
import db from '../models/mysqlDatabase';
const router = express.Router();


// /api/classroom/kanban/*

// 프로젝트에 대한 모든 칸반 정보 요청
router.get('/', (req, res) => { // ../kanban?projectID=''
  const loginInfo = req.session.loginInfo;
  let projectID = req.query.projectID;

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }

  // projectID가 없을 시
  if (typeof projectID === 'undefined') {
    return res.status(400).json({
      error: "Empty projectID",
      code: 2
    });
  }

  // query
  let query = `SELECT student.studentID, student.name,
  kanban.created_date, kanban.title, kanban.updated_date, kanban.status, kanban.projectID
  FROM class_student, kanban, student
  WHERE class_student.projectID = kanban.projectID
  AND class_student.studentID = student.studentID
  AND kanban.projectID = ?
  AND class_student.studentID = ?`;

  // db select
  db.query(query, [projectID, loginInfo.userid], (err, result) => {
    if (err) throw err;

    if (!result[0])
      return res.status(400).json({
        error: "Empty Data",
        code: 3
      });
    console.log(loginInfo.userid + ' - 칸반 조회 완료');
    return res.json({ result: result });
  });
});


// 특정 칸반에 대한 정보 요청
router.get('/:id', (req, res) => { // ../kanban/kanbanid
  const loginInfo = req.session.loginInfo;
  const kanbanID = req.params.id;

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }

  if (!kanbanID) {
    return res.status(400).json({
      error: "Undefined kanbanID",
      code: 2
    });
  }

  let query = '';
  // qeury
  query = `SELECT * FROM kanban where created_date = ?`;

  // db select
  db.query(query, kanbanID, (err, result) => {
    if (err) throw err;

    if (!result[0]) {
      return res.status(400).json({
        error: "Empty Data",
        code: 3
      });
    }

    console.log(loginInfo.userid + ' - 칸반 조회');
    return res.json({ result: result });
  });
});


// 칸반 등록
router.post('/', (req, res) => {
  const loginInfo = req.session.loginInfo;

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
  if (!projectID || !title || !content) {
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
router.put('/', (req, res) => {
  const loginInfo = req.session.loginInfo;

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }

  const kanbanID = req.body.id;
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

  return res.json({ result: 'not yet' });
});

// 칸반 상태 변경
router.put('/status', (req, res) => {
  const loginInfo = req.session.loginInfo;

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }

  const kanbanID = req.body.kanbanID;
  const status = req.body.status;

  // 데이터가 없을 시
  if (!kanbanID || !status) {
    return res.status(400).json({
      error: "Empty Data",
      code: 2
    });
  }

  // 상태 확인 (대소문자 구분 OK)
  const statusList = ['TODO', 'DOING', 'FEEDBACK', 'FINISH'];
  if (statusList.indexOf(status) < 0) {
    return res.status(400).json({
      error: "Wrong Status",
      code: 3
    });
  }

  // input data & query
  let data = [new Date().toISOString().slice(0, 19), status, kanbanID];
  console.log(data);
  let query = '';
  query = `UPDATE kanban SET updated_date = ?, status = ? 
    WHERE created_date = ?`;

  // db update
  db.query(query, data, (err, result) => {
    if (err) throw err;
    console.log('칸반 상태 변경 완료');
    console.log(result);
    return res.json({ result: 'success' });
  });
});


// 특정 칸반에 대한 정보 삭제
router.delete('/', (req, res) => {
  const loginInfo = req.session.loginInfo;
  const kanbanID = req.body.id;

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }
});

export default router;
import express from 'express';
import db from '../models/mysqlDatabase';

import multer from 'multer';
const router = express.Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // 파일 저장 위치
  },
  filename: (req, file, cb) => {
    // 저장될 파일 이름 + 확장자
    cb(null, file.originalname)
  }
});

let upload = multer({ storage: storage });


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
  let query = `SELECT Student.studentID, Student.name,
  Kanban.created_date, Kanban.title, Kanban.updated_date, Kanban.status, Kanban.projectID
  FROM Class_Student, Kanban, student
  WHERE Class_Student.projectID = Kanban.projectID
  AND Class_Student.studentID = Student.studentID
  AND Kanban.projectID = ?
  AND Class_Student.studentID = ?`;

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
router.get('/kanbanInfo/:id', (req, res) => { // ../kanban/kanbanid
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
  query = `SELECT * FROM Kanban where created_date = ?`;

  // db select
  db.query(query, kanbanID, (err, result) => {
    if (err) throw err;
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
  query = 'SELECT * FROM Class_Student WHERE studentID = ? AND projectID = ?';
  db.query(query, [loginInfo.userid, projectID], (err, result) => {
    if (err) throw err;
    if (result.length == 0) { // 검색결과가 없을 시
      return res.status(403).json({
        error: "Forbidden",
        code: 3
      });
    } else { // 검색결과가 있을 시

      query = 'INSERT INTO Kanban SET ?';
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

  const kanbanID = req.body.kanbanID.slice(0, 19);
  const title = req.body.title;
  const content = req.body.content;
  const contribute = req.body.contribute;
  const updated_date = new Date().toISOString().slice(0, 19);

  // 데이터가 없을 시
  if (kanbanID == '' || title == '' || content == '') {
    return res.status(400).json({
      error: "Empty Data",
      code: 2
    });
  }

  let query = '';
  query = 'UPDATE Kanban SET title = ?, content = ?, updated_date = ? WHERE created_date = ?';
  let data = [title, content, updated_date, kanbanID];

  db.query(query, data, (err) => {
    if (err) throw err;
    console.log("칸반 수정 완료")
    return res.json({ result: "success" });
  });
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
  query = `UPDATE Kanban SET updated_date = ?, status = ? 
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
router.delete('/:id', (req, res) => {
  const loginInfo = req.session.loginInfo;
  const kanbanID = req.params.id.slice(0, 19);

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }
  // kanbanID 가 null 일 시
  if (!kanbanID) {
    return res.status(400).json({
      error: "NULL KanbanID",
      code: 2
    });
  }

  let query = '';
  query = `SELECT * FROM Class_Student, Project, Kanban
    WHERE Class_Student.projectID = Project.projectID
    AND Project.projectID = Kanban.projectID
    AND Kanban.created_date = ?
    AND Class_Student.studentID = ?`;

  // 해당 프로젝트에 학생이 참가 중인지 확인
  db.query(query, [kanbanID, loginInfo.userid], (err, result) => {
    if (err) throw err;

    if (result.length > 0) { // 참가중
      query = 'DELETE FROM Kanban WHERE created_date = ?';
      db.query(query, kanbanID, (err) => {
        if (err) throw err;
        console.log('칸반 삭제 완료');
        return res.json({ result: 'success' });
      });

    } else { // 비참가 학생
      console.log('삭제 권한 없음');
      return res.status(403).json({
        error: "Forbidden",
        code: 3
      });
    }
  });
});

// 칸반 내 파일 업로드
router.post('/upload', upload.single('filename'), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.json({ result: 'success' });
});

// 칸반 내 파일 다운로드
router.get('/download', (req, res) => {
  res.json({ result: true });
});

export default router;
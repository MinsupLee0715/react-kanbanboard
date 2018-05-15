import express from 'express';
import db from '../models/mysqlDatabase';
import mongoose from 'mongoose';
import Classroom from '../models/classroom';
import Project from '../models/project';

const Schema = mongoose.Schema;
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
  let query = '';

  // 교수일 경우
  if (loginInfo.type == 'professor') {
    query = "SELECT * FROM classroom WHERE professorID=?";
    db.query(query, loginInfo.userid, (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.json({ result: result });
    });

  } else { // 학생일 경우
    query = "SELECT * FROM classroom JOIN (SELECT * FROM class_student WHERE studentID=?) AS class_student ON class_student.classID = classroom.classID";
    db.query(query, loginInfo.userid, (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.json({ result: result });
    });

  }
});


/* notice */
// get notice
router.get('/notice', (req, res) => {
  // 로그인 확인
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "User is undefined",
      code: 1
    });
  };

  let classid = req.query.classid;
  console.log(classid);
  let query = '';

  query = 'SELECT * FROM notice WHERE classID=?';
  db.query(query, classid, (err, result) => {
    if (err) throw err;
    console.log(result);
    return res.json({ result: result });
  });
});


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

  // 클라이언트로부터 받은 데이터
  let noticeData = {
    classid: req.body.classid,
    title: req.body.title,
    content: req.body.content
  };
  console.log(noticeData);

  // 입력 데이터가 없을 시
  if (noticeData.classid === "" || noticeData.title === "" || noticeData.content === "") {
    return res.status(400).json({
      error: "Empty data",
      code: 2
    });
  }

  let query = 'INSERT INTO notice SET ?';
  db.query(query, noticeData, (err, result) => {
    if (err) throw err;
    return res.send({ result: true });
  });
});



/* 프로젝트 확인 */
router.get('/project/:id', (req, res) => {
  let loginInfo = req.session.loginInfo;
  let projectid = req.params.id;

  /* 프로젝트 검색 */
  Project.find({ _id: mongoose.Types.ObjectId(projectid) },
    (err, result) => {
      if (err) throw err;
      if (!result[0]) {
        return res.status(400).json({
          error: "Empty data",
          code: 1
        });
      }

      /* 로그인 유저가 속한 프로젝트인지 확인 */
      for (let i in result[0].students) {
        if (result[0].students[i].userid == loginInfo.userid) {
          return res.send({ result: result });
        }
      }
      return res.status(400).json({
        error: "Empty data",
        code: 1
      });
    })
});

/* 프로젝트 신청 */
router.post('/project', (req, res) => {
  let loginInfo = req.session.loginInfo;

  let projectInfo = new Project({
    _id: new mongoose.Types.ObjectId(),
    _classid: mongoose.Types.ObjectId(`${ req.body._classid }`),
    title: req.body.title,
    students: req.body.students,
    status: 'standby'
  });

  // 데이터 누락
  if (projectInfo._classid == '' || projectInfo.title == '' || projectInfo.students.length == 0) {
    return res.status(400).json({
      error: "Empty data",
      code: 1
    });
  }

  // 학생이 아닐 시
  if (loginInfo.type != 'student') {
    return res.status(403).json({
      error: "Forbidden",
      code: 2
    });
  }

  // 해당 수업 학생이 아닐 시
  Classroom.find({ '_id': projectInfo._classid }, (err, result) => {
    let k = 0;
    for (let i = 0; i < result[0].students.length; i++) {
      for (let j = 0; j < projectInfo.students.length; j++) {
        if (result[0].students[i].userid == projectInfo.students[j].userid) {
          k++;
        }
      }
    }
    if (k != projectInfo.students.length) {
      return res.status(403).json({
        error: "Forbidden",
        code: 2
      });
    }

    // 이미 프로젝트에 속한 학생일 시
    Project.find({ _classid: projectInfo._classid },
      (err, params) => {
        let l = 0;
        for (let x = 0; x < params.length; x++) { // 프로젝트 단위
          for (let y = 0; y < params[x].students.length; y++) { // 프로젝트.학생 단위
            for (let z = 0; z < projectInfo.students.length; z++) { // 넣은 데이터 단위
              if (params[x].students[y].userid == projectInfo.students[z].userid) {
                l++;
              }
            }
          }
        }

        if (l > 0) {
          return res.status(409).json({
            error: "Already User in Project",
            code: 3
          });
        }

        // 데이터 저장
        projectInfo.save((err) => {
          if (err) throw err;
          console.log('Success Add Project');
          return res.send({ result: true });
        });
      });
  });

});

/* 프로젝트 승인 */
router.put('/project', (req, res) => {
  let loginInfo = req.session.loginInfo;
  let projectid = req.body.projectid;
  let status = req.body.status;

  // 교수가 아닐 시
  if (loginInfo.type != 'professor') {
    return res.status(403).json({
      error: "Forbidden",
      code: 1
    });
  }

  if (status == "start") {
    Project.update({
      _id: mongoose.Types.ObjectId(projectid)
    }, { status: 'start' },
      (err) => {
        if (err) throw err;
        res.send({ result: true });
      });
  } else {
    Project.remove({
      _id: mongoose.Types.ObjectId(projectid)
    }, (err) => {
      if (err) throw err;
      res.send({ result: true });
    });
  }

});

export default router;
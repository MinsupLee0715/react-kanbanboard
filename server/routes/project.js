import express from 'express';
import db from '../models/mysqlDatabase';
const router = express.Router();

// /api/classroom/project/*

/* 프로젝트 가져오기 */
router.get('/', (req, res) => {
  let loginInfo = req.session.loginInfo;
  let classID = req.query.classID;
  //let projectID = req.query.projectID;

  if (typeof classID === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }

  let query = '';

  if (loginInfo.type == 'professor') {
    // 교수일 시
    //if (typeof projectID === 'undefined') {

    // 수업 내 전체 프로젝트 조회
    let params = [loginInfo.userid, classID];
    query = `SELECT * FROM project_professor WHERE professorID = ? AND classID = ?`;
    db.query(query, params, (err, result) => {
      if (err) throw err;
      console.log(loginInfo.name + ' 교수 ' + classID + ' 프로젝트 조회');
      return res.json({ result: result });
    });

  } else if (loginInfo.type == 'student') {
    // 학생일 시
    // 수업 내 프로젝트 조회
    let params = [classID, loginInfo.userid];
    query = `SELECT * FROM project WHERE projectID = (
      SELECT projectID FROM class_student WHERE classID = ? AND studentID = ?);`;
    db.query(query, params, (err, result) => {
      if (err) throw err;
      console.log(loginInfo.name + ' 학생 프로젝트 조회: ');
      console.log(result[0]);
      return res.json({ result: result });
    });

  } else {
    // 로그인을 안했을 시
    return res.status(401).json({
      error: "User is undefined",
      code: 2
    });
  }
});

/* 프로젝트 신청 */
router.post('/', (req, res) => {
  let loginInfo = req.session.loginInfo;

  let classID = req.body.classID;
  let title = req.body.title;
  let student = req.body.student;
  let projectID = new Date().toISOString().slice(0, 19) // to Mysql Datetime
  let status = 'standby';

  // 데이터 누락 시
  if (classID == '' || title == '' || student.length == 0) {
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

  let query = '';

  // 수업 내 학생 검색
  query = 'SELECT * FROM class_student WHERE classID = ? AND studentID IN (?)';
  db.query(query, [classID, student], (err, result) => {
    if (err) throw err;

    // 수업 외 학생이 포함되었을 시
    if (result.length != student.length) {
      return res.status(403).json({
        error: "Forbidden Student",
        code: 2
      });
    }

    // 이미 프로젝트에 참여중인 학생이 있을 시
    for (let i in result) {
      console.log(result[i].projectID != null);
      if (result[i].projectID != null) {
        return res.status(409).json({
          error: "Project Exists",
          code: 3
        });
      }
    }


    // 트랜젝션 처리
    db.beginTransaction((err) => {

      // 프로젝트 추가: standy 상태
      query = 'INSERT INTO project (projectID, title, status) VALUES (?, ?, "standby")';
      db.query(query, [projectID, title], (err, result) => {
        if (err) {
          db.rollback(() => {
            console.log('err1');
            return;
          });
        } // if err

        // class_student 관계 추가
        query = 'UPDATE class_student SET projectID = ? WHERE classID = ? AND studentID IN (?)';
        db.query(query, [projectID, classID, student], (err, result) => {
          if (err) {
            db.rollback(() => {
              console.log('err2');
              return;
            });
          } // if err

          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                console.log('err3');
                return;
              });
            } // if err
            console.log('프로젝트 신청 완료')
            return res.json({ result: 'success' });
          }); // commit
        }); // update class_student
      }); // insert into project

    }); // transaction

  }); // select student in class

});

/* 프로젝트 승인 */
router.put('/', (req, res) => {
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

  let query = '';
  if (status === "start") { // 프로젝트 승인
    query = 'UPDATE project SET status="start" WHERE projectID = ?';
    db.query(query, projectid, (err, result) => {
      if (err) throw err;
      console.log('프로젝트 승인 완료');
      return res.send({ result: true });
    });

  } else { // 프로젝트 거절(삭제)
    query = 'DELETE FROM project WHERE projectID = ?'
    db.query(query, projectid, (err, result) => {
      if (err) throw err;
      console.log('프로젝트 삭제 완료: ' + projectid);
      return res.send({ result: true });
    });
  }
});

/* 승인 대기 목록 확인 - 교수용 */
router.get('/getStandbyProject', (req, res) => {
  let loginInfo = req.session.loginInfo;
  let classID = req.query.classID;

  // 교수가 아닐 시
  if (loginInfo.type != 'professor') {
    return res.status(403).json({
      error: "Forbidden",
      code: 1
    });
  }

  // classID 의 값이 없을 시
  if (classID == null) {
    return res.status(400).json({
      error: "Empty classID",
      code: 2
    });
  }

  // standby project 검색
  let query = `SELECT * FROM class_student JOIN (
    SELECT * FROM project WHERE status = 'standby') AS project 
    ON project.projectID = class_student.projectID
    WHERE classID = ?`;
  db.query(query, classID, (err, result) => {
    if (err) throw err;

    console.log('승인 대기 목록 조회 완료');
    return res.json({ result: result });
  });

});

export default router;
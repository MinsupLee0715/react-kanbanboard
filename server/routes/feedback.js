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
    if (err) {
      return res.status(403).json({
        error: "Check Data",
        code: 3
      });
    } // if err
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
    date: new Date().toLocaleString(),
    content: req.body.content
  };
  let status = req.body.status;

  if (!data.created_date || !data.content) {
    return res.status(401).json({
      error: "Empty Data",
      code: 2
    });
  }

  let query = '';

  /* Comment(Feedback) 등록 */
  query = 'INSERT INTO Comment SET ?'
  db.query(query, data, (err) => {
    if (err) {
      return res.status(403).json({
        error: "Check Data",
        code: 3
      });
    } // if err
    console.log('comment 등록 성공');
    let date = new Date().toLocaleString();

    /* 칸반 상태 변경 */
    query = "UPDATE Kanban SET status = ?, updated_date = ?, score = ? WHERE created_date = ?";
    db.query(query, [status, date, req.body.point, req.body.kanbanID], (err) => {
      if (err) {
        return res.status(403).json({
          error: "Check Data",
          code: 3
        });
      } // if err
      console.log("칸반 상태 수정 완료");

      /* 메시지 읽음 표시 */
      query = 'UPDATE Message SET isCheck = true WHERE kanbanID = ?';
      db.query(query, req.body.kanbanID, (err) => {
        if (err) {
          return res.status(403).json({
            error: "Check Data",
            code: 3
          });
        } // if err
        console.log("메시지 읽음 표시 OK");

        /* 칸반-프로젝트-수업-학생 조회 */
        query = `SELECT Classroom.title AS classTitle,
        Class_Student.classID,
        Class_Student.studentID,
        Class_Student.projectID,
        Class_Student.title AS projectTitle
        FROM Classroom,
        (SELECT Class_Student.classID,
        Class_Student.studentID,
        Project.projectID,
        Project.title
        FROM Class_Student, 
        (SELECT Project.projectID,
        Project.title
        FROM Project, 
        (SELECT projectID FROM Kanban WHERE created_date = '${req.body.kanbanID }') AS Kanban
        WHERE Project.ProjectID = Kanban.ProjectID) AS Project
        WHERE Class_Student.projectID = Project.projectID) AS Class_Student
        WHERE Classroom.classID = Class_Student.classID`

        db.query(query, (err, result) => {
          if (err) {
            return res.status(403).json({
              error: "Check Data",
              code: 3
            });
          } // if err

          /* 학생에게 메시지 전송 */
          query = 'INSERT INTO Message (receive_date, userID, type, classID, projectID, kanbanID, isCheck, classTitle, projectTitle) VALUES ';
          for (let i in result) {
            if (i == 0) {
              query += `("${ date }", "${ result[i].studentID }", "${ status }", "${ result[i].classID }","${ result[i].projectID }", "${ req.body.kanbanID }", false, "${ result[i].classTitle }", "${ result[i].projectTitle }")`;
            } else {
              query += `, ("${ date }", "${ result[i].studentID }", "${ status }", "${ result[i].classID }","${ result[i].projectID }", "${ req.body.kanbanID }", false, "${ result[i].classTitle }", "${ result[i].projectTitle }")`;
            }
          }
          db.query(query, (err) => {
            if (err) {
              return res.status(403).json({
                error: "Check Data",
                code: 3
              });
            } // if err
            console.log("학생 메시지 전송 OK");
            return res.json({ result: "success" });
          });
        });
      });
    });
  });
});

export default router;
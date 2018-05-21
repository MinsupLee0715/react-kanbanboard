import express from 'express';
import db from '../models/mysqlDatabase';
const router = express.Router();

// /api/classroom/kanban/*

// 프로젝트에 대한 모든 칸반 정보 요청
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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

  // 비로그인 일 시
  if (typeof loginInfo.userid === 'undefined') {
    return res.status(400).json({
      error: "Undefined classID",
      code: 1
    });
  }
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
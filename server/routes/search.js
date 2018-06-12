import express from 'express';
import db from '../models/mysqlDatabase';
const router = express.Router();

// /api/classroom/search/*

// get search project
router.get('/:select', (req, res) => {
  const select = req.params.select;

  return res.json({ result: select });
});


export default router;
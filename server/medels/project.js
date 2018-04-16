import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Project = new Schema({
  title: String, // 프로젝트 명
  students: [{ userid: String, name: String }], // 팀원 정보
  status: String,
  kanban: [ // 칸반 리스트
    {
      title: String, // 칸반 명
      content: String, // 칸반 내용
      date: { type: Date, default: Date.now }, // 등록 날짜
      filename: String, // 첨부파일 이름,
      priority: String, //우선순위
      comment: [{ // 댓글 리스트
        userid: String,
        name: String,
        content: String,
        date: { type: Date, default: Date.now }
      }]
    }
  ]
});

export default mongoose.model('project', Project);
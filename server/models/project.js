import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Project = new Schema({
  _id: Schema.Types.ObjectId, // 프로젝트 ObjectId
  _classid: Schema.Types.ObjectId, // 수업 ObjectId
  title: String, // 프로젝트 명
  students: [{ userid: String, name: String }], // 팀원 정보
  status: String, // 승인 여부

  kanban: [{ // 칸반 리스트
    _id: Schema.Types.ObjectId, // 칸반 ObjectId
    title: String, // 칸반 명
    content: String, // 칸반 내용
    date: { type: Date, default: Date.now }, // 등록 날짜
    filename: String, // 첨부파일 제목
    contribution: [{ // 팀원 기여도
      userid: String, // 학번
      name: String, // 이름
      rate: { type: Number, min: 0, max: 10 } // 기여도 0~10
    }],
    status: String, // 칸반 상태
    score: Number, // 부여 점수
    comment: [{ // 댓글 리스트
      _id: Schema.Types.ObjectId, // 댓글 ObjectId
      content: String,
      date: { type: Date, default: Date.now }
    }]
  }]
});

export default mongoose.model('project', Project);
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Classroom = new Schema({
  _id: Schema.Types.ObjectId, // 수업 ObjectId
  title: String, // 수업명
  divide: Number, // 분반
  period: String, // 기간, 학기
  professor: { userid: String, name: String }, // 교수
  students: [{ // 학생리스트
    userid: String,
    name: String,
    _teamid: { type: Schema.Types.ObjectId, default: undefined }
  }],

  notice: [{ // 공지사항
    _id: Schema.Types.ObjectId, // 공지사항 ObjectId
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('classroom', Classroom);
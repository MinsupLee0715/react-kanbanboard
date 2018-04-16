import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Class = new Schema({
  title: String, // 수업명
  period: String, // 기간, 학기
  professor: { userid: String, name: String }, // 교수
  students: [{ userid: String, name: String }], // 학생리스트

  notice: [ // 공지사항
    {
      title: String,
      content: String,
      date: { type: Date, default: Date.now }
    }
  ],

  projects: [{ // 프로젝트 리스트
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
  }]
});

export default mongoose.model('class', Class);
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const User = new Schema({
  _id: Schema.Types.ObjectId, // User ObjectId
  type: String, // student OR professor
  userid: String, // id
  password: String, // password
  name: String, // user name

  message: [{ // 알림 메시지
    type: String, // 프로젝트 승인 OR 피드백 알림
    _classid: Schema.Types.ObjectId,
    class_name: String,
    class_divide: Number,
    project_title: String,
    _kanbanid: Schema.Types.ObjectId,
    send_user: String,
    isCheck: Boolean, // 승인처리 여부, 피드백 처리 여부
    date: { type: Date, default: Date.now } // 알림 날짜
  }]
});

// password Hash화
User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, 8);
};

// password 비교용
User.methods.validateHash = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', User);
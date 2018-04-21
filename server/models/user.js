import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const User = new Schema({
  type: String,
  userid: String,
  password: String,
  name: String
});

// password Hash화
User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, 8);
};

// password 비교용
User.methods.validateHash = function (password) {
  return bcrypt.compareSync(password, this.password);
};

/* 
  db.users.save([
    {
      type: "professor",
      userid: "1111",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "조대수"
    },
    {
      type: "professor",
      userid: "2222",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "문미경"
    },
    {
      type: "professor",
      userid: "3333",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "김동현"
    },
    
    {
      type: "student",
      userid: "20120584",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "서현규"
    },
    {
      type: "student",
      userid: "20152530",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "김가영"
    },
    {
      type: "student",
      userid: "20152574",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "김하빈"
    },
    {
      type: "student",
      userid: "20152591",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "박수빈"
    },
    {
      type: "student",
      userid: "20152595",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "박주미"
    },
    {
      type: "student",
      userid: "20152596",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "박주현"
    },
    {
      type: "student",
      userid: "20152645",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "이수빈"
    },
    {
      type: "student",
      userid: "20152708",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "허유경"
    },
    {
      type: "student",
      userid: "20121813",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "안병언"
    },
    {
      type: "student",
      userid: "20121843",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "이상원"
    },
    {
      type: "student",
      userid: "20131810",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "정화평"
    },
    {
      type: "student",
      userid: "20131828",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "최진혁"
    },
    {
      type: "student",
      userid: "20141753",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "윤소혜"
    },
    {
      type: "student",
      userid: "20121725",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "김다운"
    },
    {
      type: "student",
      userid: "20121746",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "김윤지"
    },
    {
      type: "student",
      userid: "20131661",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "김도현"
    },
    {
      type: "student",
      userid: "20131670",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "김상기"
    },
    {
      type: "student",
      userid: "20131739",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "서재식"
    },
    {
      type: "student",
      userid: "20131741",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "성봉규"
    },
    {
      type: "student",
      userid: "20131751",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "신민호"
    },
    {
      type: "student",
      userid: "20131756",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "안동식"
    },
    {
      type: "student",
      userid: "20131766",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "위승현"
    },
    {
      type: "student",
      userid: "20131788",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "이태준"
    },
    {
      type: "student",
      userid: "20141664",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "김수연"
    },
    {
      type: "student",
      userid: "20141715",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "박한빈"
    },
    {
      type: "student",
      userid: "20141724",
      password: "$2a$08$tBNqtI6NZoSXeQIPyyylU.jSeFhN0.JfkZRgIz7UZtbqSo3qy8.0W",
      name: "서형선"
    }
  ])
*/

export default mongoose.model('user', User);
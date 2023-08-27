const Sequelize = require('sequelize')
const Member = require('./member')
const Room = require('./room')
const Chat = require('./chat')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env] //개발용 db사용

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {} // 앱에 붙여서 사용(model, sequelize에 대한 정보를 가지고 있음)

db.sequelize = sequelize

db.Member = Member
db.Room = Room
db.Chat = Chat

// 테이블이 먼저 생성된 다음에 관계설정이 일어나야 함
Member.init(sequelize) //테이블 생성
Room.init(sequelize)
Chat.init(sequelize)

Member.associate(db) //테이블 관계 설정
Room.associate(db)
Chat.associate(db)


module.exports = db

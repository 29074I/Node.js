const Sequelize = require('sequelize')

module.exports = class Chat extends Sequelize.Model {
    // init : 테이블에 대한 정의(컬럼, 자료형, 테이블 설정)
    // associate : 테이블 관계 설정

    static init(sequelize){
        return super.init({
             //컬럼 정보(id,pw,nick)
             chatid : {
                 type : Sequelize.INTEGER, //저료형과 크기 지정
                 allowNull : false, //null값을 허용할 건지
                 primaryKey : true, //기본키 지정
                 unique : true, //unique 설정(겹치지 않아야 함)
                 autoIncrement : true
             },
             roomid : {
                 type : Sequelize.STRING(50),
                 allowNull : false
             },
             chat :{
                type : Sequelize.STRING(1000),
                allowNull : false
             },
             chatdt : {
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue : Sequelize.NOW
             }
                
             
         },{ //테이블에 대한 설정 지정
             sequelize, 
             timestamps : false ,//true로 하면 createAt, updateAt이 자동 생성
             modelName : 'Chat', //프로젝트에서 사용하는 모델 이름
             tableName : 'chat', //실제 db테이블 이름
             charset : 'utf8', //인코딩 방식 지정
             collate : 'utf8_general_ci' //인코딩 방식 지정
         })
     }
     static associate(db){ //다른 테이블에 대한 설정을 넣어줘 테이블 사이의 연관이 가능하게 해줌
        // member(id) --- chat(user)의 관계 설정
        //     1       :      N
        // 반대편의 가르키고 있는 곳이 1이면 belongsTo
        db.Chat.belongsTo(db.Member, {foreignKey : 'userid', targetKey : 'id'}) //1:N관계
         
     }
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // id는 기본적으로 생성될 때마다 주어짐
    email: {
      type: DataTypes.STRING(30), // 데이터 타입
      allowNull: false,           // false 필수사항 true 선택사항
      unique: true                // 고유 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 좋아요 관계
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  };
  return User;
}
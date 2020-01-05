'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Students', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    mobile: DataTypes.INTEGER
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};
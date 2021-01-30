const mysql = require('mysql');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('test','root','123',{
    dialect:'mysql'
});

class User extends Model {}
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
    await sequelize.sync();
    // const jane = await User.create({
    //     username: 'janedoe',
    //     birthday: new Date(1980, 6, 20)
    // });
    // const mike = await User.create({
    //     username: 'mike',
    //     birthday: new Date(1981, 6, 20)
    // });
    // console.log(jane.toJSON());
    const list = await User.findAll()
    console.log(list)
})();

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123',
//     database: 'test'
// });
//
// connection.connect();
//
// connection.query(
//     `
//     create table  if not exists user (
//     name text,
//     age int
//     )`, function (error, results, fields) {
//         if (error) throw error;
//         console.log('create result: ', results);
//     })
// connection.query('describe user', function (error, results, fields) {
//     if (error) throw error;
//     console.log('des: ', results);
// });
//
// connection.end()
const Sequelize = require("sequelize");
const sequelize = new Sequelize("bwt2069-st", "root", "root", {
   host: "localhost",
   dialect: "mysql"
});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.predmet = sequelize.import(__dirname+'/predmet.js');
db.grupa = sequelize.import(__dirname+'/grupa.js');
db.aktivnost = sequelize.import(__dirname+'/aktivnost.js');
db.dan = sequelize.import(__dirname+'/dan.js');
db.tip = sequelize.import(__dirname+'/tip.js');
db.student = sequelize.import(__dirname+'/student.js');

db.predmet.hasMany(db.grupa,{as:'grupaId',foreignKey: { allowNull: false }});
db.predmet.hasMany(db.aktivnost,{as:'predmetId',foreignKey: { allowNull: false }});
db.grupa.hasMany(db.aktivnost,{as:'grupaId'});
db.dan.hasMany(db.aktivnost,{as:'danId',foreignKey: { allowNull: false }});
db.tip.hasMany(db.aktivnost,{as:'tipId',foreignKey: { allowNull: false }});

db.studentGrupa=db.student.belongsToMany(db.grupa,{as:'grupe',through:'studneti_grupe',foreignKey:'studentId'});
db.grupa.belongsToMany(db.student,{as:'student',through:'studneti_grupe',foreignKey:'grupaId'});
module.exports = db;
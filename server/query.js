const sql = 'SELECT * FROM STUDENT_ENROLEMENT ;';
const sid = '1007';
const mid = '117';
const newvalue = '120';
let update = `UPDATE STUDENT_ENROLEMENT SET MID = ${newvalue} WHERE SID = ${sid} AND MID = ${mid};`;

module.exports = {
    sql,
    update,
};

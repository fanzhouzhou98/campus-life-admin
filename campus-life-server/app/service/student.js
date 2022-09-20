const Service = require('egg').Service;
const { Op } = require("sequelize");
class StudentService extends Service {
    async addStudent(name, studentNo, classNo, grade, gender) {
        let { app } = this
        let data = await app.model.Student.create({ name, studentNo, classNo, grade, gender })
        return {
            status: 'ok',
            data
        }
    }
    async getStudentByPage(name, studentNo, classNo, grade, gender) {
        let { app } = this
        let data = []
        if (name || studentNo || classNo || grade || gender) {
            data = await app.model.Student.findAndCountAll({
                where: {
                    [Op.and]: [
                        name && { name: name ? name : '' },
                        studentNo && { studentNo: studentNo ? studentNo : '' },
                        classNo && { classNo: classNo ? classNo : '' },
                        grade && { grade: grade ? grade : '' },
                        gender && { gender: gender ? gender : '' },
                    ]
                }
            });

        } else {
            data = await app.model.Student.findAndCountAll();
        }
        return {
            status: 'ok',
            data
        }
    }
    async updateStudentById(name, studentNo, classNo, grade, gender, id) {
        let { app } = this
        let data = await app.model.Student.update({
            name: name ? name : '',
            studentNo: studentNo ? studentNo : '',
            classNo: classNo ? classNo : '',
            grade: grade ? grade : '',
            gender: gender ? gender : '',
        }, {
            where: {
                id
            }
        });
        return {
            status: 'ok',
            data
        }
    }
    async deleteStudentById(id) {
        let { app } = this
        let data = await app.model.Student.destroy({
            where: {
                id
            }
        });
        return {
            status: 'ok',
            data
        }
    }
}
module.exports = StudentService
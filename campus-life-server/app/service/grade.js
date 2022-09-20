const await = require('await-stream-ready/lib/await');

const Service = require('egg').Service;
const { Op } = require("sequelize");
class GradeService extends Service {
    async addClass(grade,
        major,
        classNo,
        classfalName,
        count,
        teacher) {
        let { app } = this
        let data = await app.model.Grade.create({
            grade,
            major,
            classNo,
            classfalName,
            count,
            teacher
        })
        return {
            status: 'ok',
            data
        }
    }
    async getClassByPage( grade,
        major,
        classNo,
        classfalName,
        count,
        teacher) {
        let { app } = this
        let data = []
        if (major ||  classfalName || classNo || count || teacher||grade) {
            data = await app.model.Grade.findAndCountAll({
                where: {
                    [Op.and]: [
                        major && { major: major ? major : '' },
                        classfalName && { classfalName: classfalName ? classfalName : '' },
                        classNo && { classNo: classNo ? classNo : '' },
                        grade && { grade: grade ? grade : '' },
                        teacher && { teacher: teacher ? teacher : '' },
                        count && { count: count ? count : '' },
                    ]
                }
            });

        } else {
            data = await app.model.Grade.findAndCountAll();
        }
        return {
            status: 'ok',
            data
        }
    }
    async updateClassById(grade,
        major,
        classNo,
        classfalName,
        count,
        teacher, id) {
        let { app } = this
        let data = await app.model.Grade.update({
            classfalName:classfalName ?classfalName : '',
            count: count ? count : '',
            grade: grade ? grade : '',
            teacher: teacher ? teacher : '',
            major: major ? major : '',
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
    async deleteClassById(id) {
        let { app } = this
        let data = await app.model.Grade.destroy({
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
module.exports = GradeService
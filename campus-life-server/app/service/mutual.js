const await = require('await-stream-ready/lib/await');

const Service = require('egg').Service;
const { Op } = require("sequelize");
class MutualService extends Service {
    async addMutual(name, info, studentNo, phone, createdTime, userID) {
        let { app } = this
        let data = await app.model.Mutual.create({
            name, info, studentNo, phone, createdTime, userID
        })
        return {
            status: 'ok',
            data
        }
    }
    async getMutualByPage(name, info, studentNo, phone, createdTime,) {
        let { app } = this
        let data = []
        if (name || info || studentNo || phone || createdTime) {
            data = await app.model.Mutual.findAndCountAll({
                where: {
                    [Op.and]: [
                        name && { name: name ? name : '' },
                        info && { info: info ? info : '' },
                        studentNo && { studentNo: studentNo ? studentNo : '' },
                        phone && { phone: phone ? phone : '' },
                        createdTime && { createdTime: createdTime ? createdTime : '' },
                    ]
                }
            });

        } else {
            data = await app.model.Mutual.findAndCountAll();
        }
        return {
            status: 'ok',
            data
        }
    }
    async updateMutualById(name, info, studentNo, phone, createdTime, id) {
        let { app } = this
        let data = await app.model.Mutual.update({
            name: name ? name : '',
            info: info ? info : '',
            studentNo: studentNo ? studentNo : '',
            phone: phone ? phone : '',
            createdTime: createdTime ? createdTime : '',
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
    async deleteMutualById(id) {
        let { app } = this
        let data = await app.model.Mutual.destroy({
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
module.exports = MutualService
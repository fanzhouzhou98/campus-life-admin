const await = require('await-stream-ready/lib/await');

const Service = require('egg').Service;
const { Op } = require("sequelize");
class DormitoryService extends Service {
    async addDormitory(campus,towerNo,dormitory,count,dormitorAdimner,) {
        let { app } = this
        let data = await app.model.Dormitory.create({ campus,towerNo,dormitory,count,dormitorAdimner, })
        return {
            status: 'ok',
            data
        }
    }
    async getDormitoryByPage(campus,towerNo,dormitory,count,dormitorAdimner,) {
        let { app } = this

        let data = await app.model.Dormitory.findAndCountAll({
            where: {
                    [Op.and]: [
                        campus && { campus: campus ? campus : '' },
                        towerNo && { towerNo: towerNo ? towerNo : '' },
                        dormitory && { dormitory: dormitory ? dormitory : '' },
                        dormitorAdimner && { dormitorAdimner: dormitorAdimner ? dormitorAdimner : '' },
                        count && { count: count ? count : '' },
                    ]
            }
        });
        console.log(data)
        return {
            status: 'ok',
            data
        }
    }
    async updateDormitoryById(campus,towerNo,dormitory,count,dormitorAdimner,id) {
        let { app } = this
        let data = await app.model.Dormitory.update({
            campus: campus ? campus : '',
            dormitory: dormitory ? dormitory : '',
            count: count ? count : '',
            dormitorAdimner: dormitorAdimner ? dormitorAdimner : '',
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
    async deleteDormitoryById(id) {
        let { app } = this
        let data = await app.model.Dormitory.destroy({
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
module.exports = DormitoryService
const await = require('await-stream-ready/lib/await');

const Service = require('egg').Service;
const { Op } = require("sequelize");
class MaintainService extends Service {
    async addMaintain(reason, pusher, phone, createdTime, userID) {
        let { app } = this
        let data = await app.model.Maintain.create({
            reason,
            pusher,
            repairer: '即将分配',
            phone,
            status: '0',
            createdTime,
            userID
        })
        return {
            status: 'ok',
            data
        }
    }
    async getMaintainByPage(reason,
        pusher,
        repairer,
        phone,
        status,
        createdTime,
        userID) {
        let { app } = this
        let data = []
        if (reason || pusher || repairer || phone || createdTime || status || userID) {
            data = await app.model.Maintain.findAndCountAll({
                where: {
                    [Op.and]: [
                        reason && { major: major ? major : '' },
                        pusher && { pusher: pusher ? pusher : '' },
                        phone && { phone: phone ? phone : '' },
                        repairer && { repairer: repairer ? repairer : '' },
                        status && { status: status ? status : '' },
                        createdTime && { createdTime: createdTime ? createdTime : '' },
                    ]
                }
            });

        } else {
            data = await app.model.Maintain.findAndCountAll();
        }
        return {
            status: 'ok',
            data
        }
    }
    async updateMaintainById(reason,
        pusher,
        phone, createdTime, id) {
        let { app } = this
        let data = await app.model.Maintain.update({
            reason: reason ? reason : '',
            pusher: pusher ? pusher : '',
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
    async updateMaintainStatusById(repairer, id) {
        let { app } = this
        console.log(id)
        let data = await app.model.Maintain.update({
            repairer: repairer ? repairer : '',
            status: 2
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
    async deleteMaintainById(id) {
        let { app } = this
        let data = await app.model.Maintain.destroy({
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
module.exports = MaintainService
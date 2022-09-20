const await = require('await-stream-ready/lib/await');

const Service = require('egg').Service;
const { Op } = require("sequelize");
class ActivityService extends Service {
    async addActivity(activityName, clubName, score, count, principal, principalName, createdTime, endTime) {
        let { app } = this
        let data = await app.model.Activity.create({
            activityName, clubName, score, count, principal, principalName, createdTime, endTime
        })
        return {
            status: 'ok',
            data
        }
    }
    async getActivityPage(activityName, clubName, score, count, principal, principalName, createdTime, endTime) {
        let { app } = this
        let data = []
        if (activityName || clubName || score || count || principal || principalName || createdTime || endTime) {
            data = await app.model.Activity.findAndCountAll({
                where: {
                    [Op.and]: [
                        activityName && { activityName: activityName ? activityName : '' },
                        clubName && { clubName: clubName ? clubName : '' },
                        score && { score: score ? score : '' },
                        principal && { principal: principal ? principal : '' },
                        principalName && { principalName: principalName ? principalName : '' },
                        createdTime && { createdTime: createdTime ? createdTime : '' },
                        endTime && { endTime: endTime ? endTime : '' },
                        count && { count: count ? count : '' },
                    ]
                }
            });

        } else {
            data = await app.model.Activity.findAndCountAll();
        }
        return {
            status: 'ok',
            data
        }
    }
    async getActivityById(id) {
        let { app } = this
        let data = await app.model.Activity.findOne({
            where: {
                id
            }
        });
        return {
            status: 'ok',
            data
        }
    }
    async updateActivityById(activityName, clubName, score, count, principal, principalName, createdTime, endTime, id) {
        let { app } = this
        let data = await app.model.Activity.update({
            activityName: activityName ? activityName : '',
            clubName: clubName ? clubName : '',
            score: score ? score : '',
            count: count ? count : '',
            principal: principal ? principal : '',
            principalName: principalName ? principalName : '',
            endTime: endTime ? endTime : '',
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
    async deleteActivityById(id) {
        let { app } = this
        let data = await app.model.Activity.destroy({
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
module.exports = ActivityService
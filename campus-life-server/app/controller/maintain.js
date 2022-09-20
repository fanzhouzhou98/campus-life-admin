const Controller = require('egg').Controller;
const moment = require('moment')
class MaintainController extends Controller {
    //添加收货地址
    async addMaintain() {
        const { ctx } = this
        let {
            reason,
            pusher,
            phone,
            userID
        } = ctx.request.body
        let createdTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let data = await ctx.service.maintain.addMaintain(
            reason,
            pusher,
            phone,
            createdTime,
            userID)
        ctx.body = {
            data
        }
    }
    async getMaintainByPage() {
        const { ctx } = this
        let {
            reason,
            pusher,
            repairer,
            phone,
            status,
            createdTime } = ctx.request.body
        let data = await ctx.service.maintain.getMaintainByPage(
            reason,
            pusher,
            repairer,
            phone,
            status,
            createdTime)
        ctx.body = {
            data
        }
    }
    async updateMaintainById() {
        const { ctx } = this
        let {
            reason,
            pusher,
            phone, id } = ctx.request.body
        let createdTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let data = await ctx.service.maintain.updateMaintainById(
            reason,
            pusher,
            phone, createdTime, id)
        ctx.body = {
            data
        }
    }
    async updateMaintainStatusById() {
        const { ctx } = this
        let { repairer, id } = ctx.request.body
        // let createdTime =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let data = await ctx.service.maintain.updateMaintainStatusById(repairer, id)
        ctx.body = {
            data
        }
    }
    async deleteMaintainById() {
        const { ctx } = this
        let { id } = ctx.request.body
        let data = await ctx.service.maintain.deleteMaintainById(id)
        ctx.body = {
            data
        }
    }
}
module.exports = MaintainController
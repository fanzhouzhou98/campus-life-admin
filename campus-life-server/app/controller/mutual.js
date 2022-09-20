const Controller = require('egg').Controller;
const moment = require('moment')
class MutualController extends Controller {
    async addMutual() {
        const { ctx } = this
        let {
            name, info, studentNo, phone, userID } = ctx.request.body
        let createdTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let data = await ctx.service.mutual.addMutual(
            name, info, studentNo, phone, createdTime, userID)
        ctx.body = {
            data
        }
    }
    async getMutualByPage() {
        const { ctx } = this
        let {
            name, info, studentNo, phone, createdTime } = ctx.request.body
        let data = await ctx.service.mutual.getMutualByPage(
            name, info, studentNo, phone, createdTime)
        ctx.body = {
            data
        }
    }
    async updateMutualById() {
        const { ctx } = this
        let {
            name, info, studentNo, phone,
            id } = ctx.request.body
        let createdTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let data = await ctx.service.mutual.updateMutualById(
            name, info, studentNo, phone, createdTime, id)
        ctx.body = {
            data
        }
    }
    async deleteMutualById() {
        const { ctx } = this
        let { id } = ctx.request.body
        let data = await ctx.service.mutual.deleteMutualById(id)
        ctx.body = {
            data
        }
    }
}
module.exports = MutualController
const Controller = require('egg').Controller;
class ActivityController extends Controller {
    async addActivity() {
        const { ctx } = this
        let {
            activityName, clubName, score, count, principal, principalName, createdTime, endTime } = ctx.request.body
        let data = await ctx.service.activity.addActivity(
            activityName, clubName, score, count, principal, principalName, createdTime, endTime)
        ctx.body = {
            data
        }
    }
    async getActivityByPage() {
        const { ctx } = this
        let {
            activityName, clubName, score, count, principal, principalName, createdTime, endTime } = ctx.request.body
        let data = await ctx.service.activity.getActivityPage(
            activityName, clubName, score, count, principal, principalName, createdTime, endTime)
        ctx.body = {
            data
        }
    }
    async getActivityById() {
        const { ctx } = this
        let {
            id } = ctx.request.body
        let data = await ctx.service.activity.getActivityById(id)
        ctx.body = {
            data
        }
    }
    async updateActivityById() {
        const { ctx } = this
        let {
            activityName, clubName, score, count, principal, principalName, createdTime, endTime,
            id } = ctx.request.body
        let data = await ctx.service.activity.updateActivityById(
            activityName, clubName, score, count, principal, principalName, createdTime, endTime, id)
        ctx.body = {
            data
        }
    }
    async deleteActivityById() {
        const { ctx } = this
        let { id } = ctx.request.body
        let data = await ctx.service.activity.deleteActivityById(id)
        ctx.body = {
            data
        }
    }
}
module.exports = ActivityController
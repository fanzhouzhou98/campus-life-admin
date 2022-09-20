const Controller = require('egg').Controller;
class GradeController extends Controller {
    async addClass() {
        const { ctx } = this
        let { 
            grade,
            major,
            classfalName,
            count,
            teacher } = ctx.request.body
        let classNo = ''
        for (var i = 0; i < 6; i++) {
            classNo += parseInt(Math.random() * 10)
        }
        let data = await ctx.service.grade.addClass(
            grade,
            major,
            classNo,
            classfalName,
            count,
            teacher)
        ctx.body = {
            data
        }
    }
    async getClassByPage() {
        const { ctx } = this
        let { 
            grade,
            major,
            classNo,
            classfalName,
            count,
            teacher } = ctx.request.body
        let data = await ctx.service.grade.getClassByPage(
            grade,
            major,
            classNo,
            classfalName,
            count,
            teacher)
        ctx.body = {
            data
        }
    }
    async updateClassById() {
        const { ctx } = this
        let { 
            grade,
            major,
            classNo,
            classfalName,
            count,
            teacher,
             id } = ctx.request.body
        let data = await ctx.service.grade.updateClassById(
            grade,
            major,
            classNo,
            classfalName,
            count,
            teacher, id)
        ctx.body = {
            data
        }
    }
    async deleteClassById() {
        const { ctx } = this
        let { id } = ctx.request.body
        let data = await ctx.service.grade.deleteClassById(id)
        ctx.body = {
            data
        }
    }
}
module.exports = GradeController
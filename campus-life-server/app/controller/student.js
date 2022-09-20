const Controller = require('egg').Controller;
class StudentController extends Controller {
    async addStudent() {
        const { ctx } = this
        let { name, studentNo, classNo, grade, gender } = ctx.request.body
        let data = await ctx.service.student.addStudent(name, studentNo, classNo, grade, gender)
        ctx.body = {
            data
        }
    }
    async getStudentByPage() {
        const { ctx } = this
        let { name, studentNo, classNo, grade, gender } = ctx.request.body
        let data = await ctx.service.student.getStudentByPage(name, studentNo, classNo, grade, gender)
        ctx.body = {
            data
        }
    }
    async updateStudentById() {
        const { ctx } = this
        let { name, studentNo, classNo, grade, gender, id } = ctx.request.body
        let data = await ctx.service.student.updateStudentById(name, studentNo, classNo, grade, gender, id)
        ctx.body = {
            data
        }
    }
    async deleteStudentById() {
        const { ctx } = this
        let { id } = ctx.request.body
        let data = await ctx.service.student.deleteStudentById(id)
        ctx.body = {
            data
        }
    }
}
module.exports = StudentController
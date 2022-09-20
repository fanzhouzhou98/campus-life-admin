const Controller = require('egg').Controller;
class DormitoryController extends Controller {
    async addDormitory() {
        const { ctx } = this
        let { campus,towerNo,dormitory,count,dormitorAdimner,} = ctx.request.body
        let data = await ctx.service.dormitory.addDormitory(campus,towerNo,dormitory,count,dormitorAdimner,)
        ctx.body = {
            data
        }
    }
    async getDormitoryByPage() {
        const { ctx } = this
        let { campus,towerNo,dormitory,count,dormitorAdimner,} = ctx.request.body
        let data = await ctx.service.dormitory.getDormitoryByPage(campus,towerNo,dormitory,count,dormitorAdimner,)
        ctx.body = {
            data
        }
    }
    async updateDormitoryById() {
        const { ctx } = this
        let { campus,towerNo,dormitory,count,dormitorAdimner,id} = ctx.request.body
        let data = await ctx.service.dormitory.updateDormitoryById(campus,towerNo,dormitory,count,dormitorAdimner,id)
        ctx.body = {
            data
        }
    }
    async deleteDormitoryById() {
        const { ctx } = this
        let {id} = ctx.request.body
        let data = await ctx.service.dormitory.deleteDormitoryById(id)
        ctx.body = {
            data
        }
    }
}
module.exports = DormitoryController
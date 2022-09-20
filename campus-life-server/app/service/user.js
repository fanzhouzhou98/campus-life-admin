const await = require('await-stream-ready/lib/await');

const Service = require('egg').Service;

// 继承Service
class User extends Service {
    USER_TABLE = 'user'
    FRIEND_TABLE = 'friendship'
    USER_DETAIL = 'user_detail'
    /**
     *
     * 通过userID[] 获取用户detail信息
     * @param {string[]} userIDList
     * @return {data:用户信息} 
     * @memberof Friends
     */
    async getDataByUserName(username) {
        const { app } = this;
        let data = await app.model.User.findOne({ where: { name: username }})
        return {
            data,
            status: true
        }
    }
    async changePassword(username,oldPassword,newPassword){
          const {app} = this
          let data = await app.model.User.findOne({ where: { name: username }})
          console.log(data.password,oldPassword)
          if(data.password===oldPassword){
            let isChange = await app.model.User.update({
                password:newPassword
            },{
             where:{
                 name:username
             }
            })
            if(isChange==1){
                return {
                    isChange,
                    status:true,
                    message:'修改成功'
                }
            }else{
              return {
                  isChange:0,
                  status:false,
                  message:'原密码错误'
              }
            }     
          }else{
              return {
                  isChange:0,
                  status:false,
                  message:'原密码错误'
              }
          }
    }
    /**
     *
     * 更新用户detail信息
     * @param {object{}} data
     * @return {result:用户信息} 
     * @memberof User
     */
    async updateUserInfo(nickName, avator, signature, gender, birthday, userID) {
        const { app } = this;
        const row = {
            nickName,
            avator,    // any other fields u want to update
            signature,
            gender,
            birthday,
            userID
        };

        const options = {
            where: {
                userID
            }
        };
        const result = await app.mysql.update(this.USER_DETAIL, row, options); // 更新 posts 表中的记录

        // 判断更新成功
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess) {
            return result
        }
    }

}
module.exports = User
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, } = app;
  router.get('/', controller.home.index);
  /**
   * 用户接口
   */
  router.post('/upload', app.jwt, controller.fileUpload.upload);
  router.post('/user/updateUserDetail', app.jwt, controller.user.updateUserInfo)
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.post('/user/changePassword', app.jwt, controller.user.changePassword);
  router.post('/user/getInfoByUserName', controller.user.getInfoByUserName);
  /**
   * 学生接口
   */
  router.post('/student/addStudent', app.jwt, controller.student.addStudent)
  router.post('/student/getStudentByPage', app.jwt, controller.student.getStudentByPage)
  router.post('/student/updateStudentById', app.jwt, controller.student.updateStudentById)
  router.post('/student/deleteStudentById', app.jwt, controller.student.deleteStudentById)
  /**
   * 班级接口
   */
  router.post('/grade/addClass', app.jwt, controller.grade.addClass)
  router.post('/grade/getClassByPage', app.jwt, controller.grade.getClassByPage)
  router.post('/grade/updateClassById', app.jwt, controller.grade.updateClassById)
  router.post('/grade/deleteClassById', app.jwt, controller.grade.deleteClassById)
  /**
   * 宿舍接口
   */
  router.post('/dormitory/addDormitory', app.jwt, controller.dormitory.addDormitory)
  router.post('/dormitory/getDormitoryByPage', app.jwt, controller.dormitory.getDormitoryByPage)
  router.post('/dormitory/updateDormitoryById', app.jwt, controller.dormitory.updateDormitoryById)
  router.post('/dormitory/deleteDormitoryById', app.jwt, controller.dormitory.deleteDormitoryById)
  /**
   * 维修接口
   */
  router.post('/maintain/addMaintain', app.jwt, controller.maintain.addMaintain)
  router.post('/maintain/getMaintainByPage', app.jwt, controller.maintain.getMaintainByPage)
  router.post('/maintain/updateMaintainById', app.jwt, controller.maintain.updateMaintainById)
  router.post('/maintain/deleteMaintainById', app.jwt, controller.maintain.deleteMaintainById)
  router.post('/maintain/updateMaintainStatusById', app.jwt, controller.maintain.updateMaintainStatusById)
  /**
   * 活动接口
   */
  router.post('/activity/addActivity', app.jwt, controller.activity.addActivity)
  router.post('/activity/getActivityByPage', app.jwt, controller.activity.getActivityByPage)
  router.post('/activity/updateActivityById', app.jwt, controller.activity.updateActivityById)
  router.post('/activity/deleteActivityById', app.jwt, controller.activity.deleteActivityById)
  router.post('/activity/getActivityById', app.jwt, controller.activity.getActivityById)
  /**
 * 互助信息接口
 */
  router.post('/mutual/addMutual', app.jwt, controller.mutual.addMutual)
  router.post('/mutual/getMutualByPage', app.jwt, controller.mutual.getMutualByPage)
  router.post('/mutual/updateMutualById', app.jwt, controller.mutual.updateMutualById)
  router.post('/mutual/deleteMutualById', app.jwt, controller.mutual.deleteMutualById)
};


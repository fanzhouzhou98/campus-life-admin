import instance from './index'
export function addStdent(params) {
    return instance.request({
        url: '/student/addStudent',
        method: 'post',
        data: params
    })
}
export function getStudentByPage(params) {
    return instance.request({
        url: '/student/getStudentByPage',
        method: 'post',
        data: params
    })
}
export function updateStudentById(params) {
    return instance.request({
        url: '/student/updateStudentById',
        method: 'post',
        data: params
    })
}
export function deleteStudentById(params) {
    return instance.request({
        url: '/student/deleteStudentById',
        method: 'post',
        data: params
    })
}
export function addClass(params) {
    return instance.request({
        url: '/grade/addClass',
        method: 'post',
        data: params
    })
}
export function getClassByPage(params) {
    return instance.request({
        url: '/grade/getClassByPage',
        method: 'post',
        data: params
    })
}
export function updateClassById(params) {
    return instance.request({
        url: '/grade/updateClassById',
        method: 'post',
        data: params
    })
}
export function deleteClassById(params) {
    return instance.request({
        url: '/grade/deleteClassById',
        method: 'post',
        data: params
    })
}
export function addDormitory(params) {
    return instance.request({
        url: '/dormitory/addDormitory',
        method: 'post',
        data: params
    })
}
export function getDormitoryByPage(params) {
    return instance.request({
        url: '/dormitory/getDormitoryByPage',
        method: 'post',
        data: params
    })
}
export function updateDormitoryById(params) {
    return instance.request({
        url: '/dormitory/updateDormitoryById',
        method: 'post',
        data: params
    })
}
export function deleteDormitoryById(params) {
    return instance.request({
        url: '/dormitory/deleteDormitoryById',
        method: 'post',
        data: params
    })
}
export function addMaintain(params) {
    return instance.request({
        url: '/maintain/addMaintain',
        method: 'post',
        data: params
    })
}
export function getMaintainByPage(params) {
    return instance.request({
        url: '/maintain/getMaintainByPage',
        method: 'post',
        data: params
    })
}
export function updateMaintainById(params) {
    return instance.request({
        url: '/maintain/updateMaintainById',
        method: 'post',
        data: params
    })
}
export function deleteMaintainById(params) {
    return instance.request({
        url: '/maintain/deleteMaintainById',
        method: 'post',
        data: params
    })
}
export function updateMaintainStatusById(params) {
    return instance.request({
        url: '/maintain/updateMaintainStatusById',
        method: 'post',
        data: params
    })
}
/**
 *
 * 活动接口
 */
export function addActivity(params) {
    return instance.request({
        url: '/activity/addActivity',
        method: 'post',
        data: params
    })
}
export function getActivityByPage(params) {
    return instance.request({
        url: '/activity/getActivityByPage',
        method: 'post',
        data: params
    })
}
export function updateActivityById(params) {
    return instance.request({
        url: '/activity/updateActivityById',
        method: 'post',
        data: params
    })
}
export function getActivityById(params) {
    return instance.request({
        url: '/activity/getActivityById',
        method: 'post',
        data: params
    })
}
export function deleteActivityById(params) {
    return instance.request({
        url: '/activity/deleteActivityById',
        method: 'post',
        data: params
    })
}
/**
 * 互助接口
 */
export function addMutual(params) {
    return instance.request({
        url: '/mutual/addMutual',
        method: 'post',
        data: params
    })
}
export function getMutualByPage(params) {
    return instance.request({
        url: '/mutual/getMutualByPage',
        method: 'post',
        data: params
    })
}
export function updateMutualById(params) {
    return instance.request({
        url: '/mutual/updateMutualById',
        method: 'post',
        data: params
    })
}
export function deleteMutualById(params) {
    return instance.request({
        url: '/mutual/deleteMutualById',
        method: 'post',
        data: params
    })
}
/**
 * user接口
 */
export function getInfoByUserName(params) {
    return instance.request({
        url: '/user/getInfoByUserName',
        method: 'post',
        data: params
    })
}
export function changePassword(params) {
    return instance.request({
        url: '/user/changePassword',
        method: 'post',
        data: params
    })
}

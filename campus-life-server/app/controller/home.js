/*
 * @Author: fanzhouzhou
 * @Descripttion: 
 * @Date: 2022-02-28 15:07:26
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "<h1>服务正运行7001端口...</h1>"
  }
}

module.exports = HomeController;

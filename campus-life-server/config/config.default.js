/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 去掉post的时候的安全策略中的csrf提示
  config.security = {
    xframe: {
      enable: false
    },
    // 去除csrf提示
    csrf: {
      enable: false
    },
    // 配置全局白名单
    domainWhiteList: ['*']
  }

  // 配置跨域
  config.cors = {
    origin: "*",
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  // 安装egg-cors来允许跨域 :npm install egg-cors /yarn add egg-cors 
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605081693784_8942';

  //配置jwt
  config.jwt = {
    secret: "ax666" // secret key 自定义配置的token加密字符串
  }
  //提高文件上传大小限制
  config.bodyParser = {
    jsonLimit: '100mb',
    formLimit: '100mb',
  }
  // add your middleware config here
  config.middleware = [];

  // mysql配置信息
  config.sequelize={
    dialect: 'mysql',
    host: '127.0.0.1',
    password: "123456",
    port: 3306,
    database: 'campus_cloud',
    define: {
      timestamps: false, // 不需要sequelize自动添加时间戳
      freezeTableName: true, // 使用原始的表名称，不需要sequelize对表名称做额外处理
    },
  }
  //配置文件上传配置
  config.multipart = {
    mode: 'stream',  // 对应文件类型 
    fileExtensions: [//解决txt文件上传失败问题
      '.txt',
    ],
    fileSize: '100mb',  // Max file size (in bytes), default is 10mb

  }
  config.security = {
    csrf: {
      enable: false,
    },
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',

  }

  return {
    ...config,
    ...userConfig,
  };
};
// config.static = {
//   // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
//   prefix: '/static', 
//   dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
//   dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
//   preload: false,
//   maxAge: 31536000, // in prod env, 0 in other envs
//   buffer: true, // in prod env, false in other envs
// };
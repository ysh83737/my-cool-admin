import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1686580378521_6516',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: 'my-cool-admin',
    expiresIn: '2d',
  },
  swagger: {
    title: 'MyCoolAdmin',
    description: '重写cool-admin的练习项目',
    version: '1.0.0',
    auth: {
      authType: 'cookie',
    },
  },
} as MidwayConfig;

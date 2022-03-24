## 前言

大学生消息通知与发布平台的前端部分，该系统最初设计是为了方便在校大学生有一个统一平台接收各类消息和浏览查看其他各类部门或社团的招新通知或活动通知。

系统主要有两个角色：

- 学生
  - 查看个人信息以及自己所在组织
  - 分类接收组织的通知，可以标记已办或未办的通知状态
  - 申请加入其他组织
- 组织管理员（一个组织只有一个管理员账号）
  - 查看账号信息
  - 发布通知给选定的组织内部成员
  - 发布招新海报(未完成)
  - 管理成员
  - 查看往期通知

### 技术栈

vue-cli + vue-router + axios + Elementui

## 项目目录

```
├─public
|   ├─favicon.ico
|   ├─index.html                        // 主页
|   └logo.png                           // 网站图标
├─src
|  ├─App.vue                            // 根组件
|  ├─main.js                            // 入口文件
|  ├─views                              // 页面级组件
|  |   ├─admin.vue                      // 组织管理员
|  |   ├─contact.vue                    // 联系我们
|  |   ├─index.vue                      // 首页
|  |   ├─login.vue                      // 登录
|  |   ├─register.vue                   // 注册
|  |   └user.vue                        // 学生，即组织成员
|  ├─utils                              // 自定义文件
|  |   ├─storage.js                     // localStorage设置与删除接口
|  |   └urlconfig.js                    // 导出接口地址前缀
|  ├─store
|  ├─router                             // 路由配置，全局守卫拦截
|  |   └index.js
|  ├─components                         
|  |     ├─user                         // 学生用户相关组件
|  |     |  ├─personal        
|  |     |  |    └personal.vue          // 个人信息
|  |     |  ├─notice
|  |     |  |   └notice.vue             // 具体某个组织的所有通知
|  |     |  ├─attend
|  |     |  |   └attend.vue             // 申请参加其他组织
|  |     |  ├─allmes
|  |     |  |   ├─allmes.vue            // 所有组织的所有通知
|  |     |  |   ├─message.vue           // 已办或未办的通知
|  |     |  |   └statistics.vue         // 接收的通知数统计
|  |     ├─common                       // 通用组件
|  |     |   └changepsw.vue             // 修改密码
|  |     ├─admin
|  |     |   ├─publish
|  |     |   |    └publish.vue          // 发布通知
|  |     |   ├─previous
|  |     |   |    └previous.vue         // 查看往期通知
|  |     |   ├─personal
|  |     |   |    └personal.vue         // 账号信息
|  |     |   ├─manage
|  |     |   |   └manage.vue            // 管理成员
|  |     |   ├─enroll
|  |     |   |   └enroll.vue            // 发布招新海报
|  ├─assets                             // 静态资源
├─.browserslistrc
├─.gitignore
├─babel.config.js
├─package-lock.json
├─package.json
├─README.md
├─vue.config.js
```

## 页面展示

### 普通学生

![image-20220324170528526](https://gitee.com/jolinfor/picture-bed/raw/master/img/image-20220324170528526.png)

![image-20220324170629080](https://gitee.com/jolinfor/picture-bed/raw/master/img/image-20220324170629080.png)

![image-20220324170647336](https://gitee.com/jolinfor/picture-bed/raw/master/img/image-20220324170647336.png)

![image-20220324170718492](https://gitee.com/jolinfor/picture-bed/raw/master/img/image-20220324170718492.png)

![image-20220324170733757](https://gitee.com/jolinfor/picture-bed/raw/master/img/image-20220324170733757.png)

### 组织管理员

![image-20220324170804622](https://gitee.com/jolinfor/picture-bed/raw/master/img/image-20220324170804622.png)

![image-20220324170829221](https://gitee.com/jolinfor/picture-bed/raw/master/img/image-20220324170829221.png)

![image-20220324170854317](https://gitee.com/jolinfor/picture-bed/raw/master/img/image-20220324170854317.png)

![image-20220324170916692](https://gitee.com/jolinfor/picture-bed/raw/master/img/image-20220324170916692.png)

![image-20220324170945479](https://gitee.com/jolinfor/picture-bed/raw/master/img/image-20220324170945479.png)


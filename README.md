# 项目结构介绍

<font style="color:red">智慧科技实习：唐英福</font>

[toc]

# 概述

​	本系统前端基于react+antd组件库实现；后台采用springMVC+mysql实现；

​	本系统是一个知识分享系统，可在本系统发布文章与别人分享自己的知识；可申请管理权限，可以获得发布广告、管理用户、管理评论等功能的操作权限。

​	目前系统处于初步开发阶段，系统bug还很多，且由于经验不足，代码结构不够简单直观，还具有很大的优化空间。

​	运行react后访问：`http://localhost:3000`即可进入系统登录页面，`http://localhost:3000/home`可进入首页

​	运行javamvc项目，访问`http://localhost:8080/shareArticle`可测试服务器的启动状态。

# 项目依赖

1. **服务器容器**：tomcat7（已集成到java项目maven仓库，即载入即用）；
2. **数据库**：mysql8 *当前后台使用的帐号密码 tang-123456*,如需修改i请修改mvc项目的db.properties文件参数
3. **react版本**：react18
4. **nodeJs版本**：node 16

# 文件夹模块介绍

1. **java后台文件夹**：存储的本系统的java后台项目，基于IDEA开发实现，对接mysql数据库，服务器容器为tomcat，采用maven进行项目管理；
2. **react_项目文件夹**：存储的本系统的react系统项目，本文件夹不包括npm包，需要自行加载安装；
3. **README.md**：本文件夹目录下的文件介绍；
4. **数据库初始化文件文件夹**：包含数据库的初始化.sql文件，可自行导入使用；
5. **文档文件夹**：包括本系统当前实现效果的概述和开发过程中的设计和数据库设计文档；
6. **war包**文件夹：存储的是当前后台打包好的war包，可直接放到tomcat服务器容器使用；
7. **部分实现效果**文件夹：存储的是部分实现效果的图片截图。

# 实现效果



![系统面板](./部分实现效果/系统面板.png)

![文章编辑页面](./部分实现效果/文章编辑页面.png)

# 附录


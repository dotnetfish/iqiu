# 爱球直播WEB

## 文档
- [原型](https://org.modao.cc/app/da5d7f81321138df137ff3c749c4bc8e299edfe4?simulator_type=device&sticky1)
- [UI 蓝湖](https://lanhuapp.com/url/qEnV2-q9icl)
- [接口](https://api.iqiulive.cn/aiqiu/v1/swagger-ui.html)
- [石墨](https://shimo.im/docs/JjcHYWD36RpR9ckD/ )

### 注意事项
+ 方便开发引入[element-ui](https://element.eleme.cn/#/zh-CN/component/quickstart)，使用时按需引用即可
+ 组件css尽量scoped,避免多人协作样式覆盖
+ 线上分支为master，开发分支为dev,每人可使用自己分支，开发完成后合并到dev提测（暂定，还不确定线上/测试切换是通过分支区别还是构建命令，最好使用不同构建命令，不然问题1不好处理环境配置）
+ 模块尽量拆分成组件，页面间有相同组件群内及时沟通
+ 不同页面类似模块，协调后开发，添加工具js、更改全局变量或配置时尽量通知大家
+ 个别模块开发完即可推到dev分支，保持代码一致，这样不会后期冲突过多，也可以使用最新的工具、sass变量等
+ 多沟通、再开发

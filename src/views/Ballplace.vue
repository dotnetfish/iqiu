<template>
  <div style="display:flex" @click="closeSel">
      <div>
          <div class="typecontent">
              <div style="display:flex">
                <div v-for="(item,index) in balltypelist" :key="index">
                    <div style="margin-top:24px;margin-left:25px;font-size:16px;margin-right:25px;color:#333333;cursor: pointer;" :class="{'myfocus':flagmyfocus == index}" @click="flagmyfocus=index">{{item.name}}</div>
                    <div style="display: flex;justify-content: center;"><div :class="{'line':flagmyfocus == index}"></div></div>
                </div>
              </div>
              <div style="width: 910px;height:1px;background:#F0F0F0;"></div>
              <div style="display:flex;margin-top:14px">
                  <!-- <div><input type="text" class="releasetitle" placeholder="请输入帖子的标题" v-model="title" @keyup.shift.51=keyCodeForEvent()></div> -->
                  <div style="margin-left:34px">
                    <el-select v-model="value" placeholder="请选择发布区域" class="area" @change="change">
                        <el-option
                        v-for="item in trueballtypelist"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name">
                        </el-option>
                    </el-select>
                  </div>
              </div>
              <div>
                  <el-input type="textarea" v-model="content" placeholder="分享新鲜事" @keyup.shift.51.native=keyCodeForEvent() @keyup.shift.50.native=getfollowList()></el-input>
              </div>
              <div style="display:flex;margin-top:20px">
                  <div><img src="@/assets/community/1.png" style="margin-left:36px;cursor: pointer;" @click="isaddface=true,getfeelingList()"></div>
                  <div style="color:#333333;font-size:14px;margin-left:7px;height:22px;line-height:22px;cursor: pointer;" @click="isaddface=true,getfeelingList()">表情</div>
                  <div><img src="@/assets/community/2.png" style="margin-left:40px;cursor: pointer;" @click="isaddimg=true"></div>
                  <div style="color:#333333;font-size:14px;margin-left:7px;height:22px;line-height:22px;cursor: pointer;" @click="isaddimg=true,isaddface=false">图片</div>
                  <div style="display:flex" id="isspeak">
                  <div><img src="@/assets/community/3.png" style="margin-left:40px;cursor: pointer;" @click="isaddspeak=true"></div>
                  <div style="color:#333333;font-size:14px;margin-left:7px;height:22px;line-height:22px;cursor: pointer;" @click="isaddspeak=true,isaddface=false">话题</div>
                  </div>
                  <div><img src="@/assets/community/4.png" style="margin-left:40px;cursor: pointer;" @click="vote"></div>
                  <div style="color:#333333;font-size:14px;margin-left:7px;height:22px;line-height:22px;cursor: pointer;" @click="vote">投票</div>
                  <div class="release" @click="release">发布</div>
              </div>
              <!-- 添加图片 -->
              <div class="addimg" v-if="isaddimg">
                  <div class="close"><img src="@/assets/close.png" style="width:14px;height:14px" @click="isaddimg=false,imageUrl='',imgnumber=0,imginfo=[]"></div>
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :show-file-list="true"
                        :before-upload="beforeAvatarUpload"
                        :before-remove="beforeAvatarremove"
                        :class="{hide:hideUploadEdit}"
                        :on-remove="avatarRemove"
                        >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
              </div>
              <!-- 添加表情 -->
              <div class="addface" v-if="isaddface">
                  <div class="close"><img src="@/assets/close.png" style="width:14px;height:14px" @click="isaddface=false"></div>
                  <div style="display:flex;flex-wrap:wrap">
                      <div v-for="(item,indexface) in facelist" :key="indexface">
                          <div><img :src="require('@/assets/face/' + item.image)" style="width:52px;height:52px;margin-right:12px;margin-top:10px;cursor: pointer;" @click="contentaddface(item.content)"></div>
                      </div>
                  </div>
              </div>
              <!-- 插入话题,话题列表 -->
              <div class="addspeak" v-if="isaddspeak" id="sellineName">
                  <!-- <div class="close"><img src="@/assets/close.png" style="width:14px;height:14px" @click="isaddface=false"></div> -->
                  <!-- <div class="addspeaktitle">#插入话题#</div> -->
                  <el-input v-model="topic" placeholder="请输入话题" class="topic" :fetch-suggestions="searchtopiclist()"></el-input>
                  <div v-if="this.topic!=''" @click="addspeak(topic)" style="display:flex;margin-top:16px;cursor: pointer;">
                    <div style="font-size: 16px;color: #000000;margin-right:10px">新话题:</div>
                    <div style="font-size: 16px;color: #000000;width:280px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">#{{this.topic}}#</div>
                  </div>
                  <div v-for="(item,index) in topiclist" :key="index">
                      <div style="display:flex;justify-content:space-between;margin-top:16px;cursor: pointer;" @click="addspeak(item.content)">
                        <div style="font-size: 16px;color: #000000;width:280px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">#{{item.content}}#</div>
                        <div style="font-size: 14px;color: #949494;margin-right:14px">讨论:{{item.hotNum}}</div>
                      </div>
                  </div>
                  <div style="margin-top:20px"></div>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[10, 50, 100, 500]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
                  </el-pagination>
              </div>
              <!-- @用户 -->
              <div class="isfollow" v-if="isfollow">
                  <div class="close"><img src="@/assets/close.png" style="width:14px;height:14px;" @click="isfollow=false"></div>
                  <div style="color:#333333;font-size:16px;">请选择一个用户</div>
                  <div v-for="(item,indexfollow) in followlist" :key="indexfollow">
                      <div style="display:flex;margin-top:30px;cursor: pointer;" @click="atuser(item.uname)">
                          <div><img :src="item.avatar" style="width:50px;height:50px;border-radius:50px;"></div>
                          <div>
                            <div style="font-size:16px;color:#333333;margin-left:20px;">{{item.uname}}</div>
                            <div style="font-size:16px;color:#999999;margin-left:20px;margin-top:15px">ID：{{item.id}}</div>
                          </div>
                      </div>
                  </div>
                  <div style="margin-top:20px"></div>
                  <el-pagination
                    @size-change="athandleSizeChange"
                    @current-change="athandleCurrentChange"
                    :current-page="atpageIndex"
                    :page-sizes="[10, 50, 100, 500]"
                    :page-size="atpageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="attotal">
                  </el-pagination>
              </div>
          </div>
          <div class="contentinfo">
              <div v-if="attotal==2 && flagmyfocus==0" style="width:100%;text-align:center">
                  <img src="@/assets/community/5.png" style="width:200px;height:200px;margin-top:200px;margin-bottom:200px">
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import { getKey, dynamictype, subjectList, searchSubjectList, followList, dynamicadd, addSubject, feelingList } from '@/api/api'
  export default {
    name: 'Ballplace',
    components: {
    },
    data() {
      return {
          flagmyfocus:'',
          balltypelist:[],
          trueballtypelist:[],
          value:'我的动态',
          content:'',
          isaddimg:false,
          isaddface: false,
          isaddspeak: false,
          hideUploadEdit:false,
          imageUrl:'',
          accessKeyId:'',
          accessKeySecret:'',
          imgnumber:0,
          title:'',
          imginfo:[],
          uidinfo:[],
          isfollow:false,
          imgw:'',
          imgh:'',
          topic:'',
          tellMe:'',
          typeName:'',
          flag:1,
          topics:[],
          topicscontents:'',
          topiclist:[],
          followlist:[],
          feelinglist:[],
          total:0,
          pageSize:10,
          pageIndex:1,
          attotal:0,
          atpageSize:10,
          atpageIndex:1,
          facelist:[],
          publicRouter: 'require(@/assets/face/)'
      }
    },
    created() {
    },
    mounted(){
        this.getballtype()
        this.gettopiclist()
        this.getfacelist()
        this.GetfollowList()
        // document.addEventListener('click', e => {
        //     if (!this.$el.contains(e.target)) {
        //         this.isaddspeak = false
        //     }
        // })
    },
    methods: {
        //输入框加图片
        contentaddface(content){
            this.content = this.content + content
        },
        //获取表情包列表
        getfacelist(){
            let obj = {
                "dir":"biaoqing",
                "version":1,
                "md5":"sdfsfsfsfasfsafasfsaf",
                "fileLength":82176,
                "data":[
                {
                "id":"1",
                "image":"bishi.png",
                "content":"[bishi]",
                "desc":"鄙视"
                },
                {
                "id":"2",
                "image":"jusang.png",
                "content":"[jusang]",
                "desc":"沮丧"
                },
                {
                "id":"3",
                "image":"kuqi.png",
                "content":"[kuqi]",
                "desc":"哭泣"
                },
                {
                "id":"4",
                "image":"taopao.png",
                "content":"[taopao]",
                "desc":"逃跑"
                },
                {
                "id":"5",
                "image":"shangxin.png",
                "content":"[shangxin]",
                "desc":"伤心"
                },
                {
                "id":"6",
                "image":"tiaowu.png",
                "content":"[tiaowu]",
                "desc":"跳舞"
                },
                {
                "id":"7",
                "image":"weixiao.png",
                "content":"[weixiao]",
                "desc":"微笑"
                }
                ]
                }
            let obj2 = JSON.parse(JSON.stringify(obj))
            this.facelist = obj2.data
            console.log("obj===",obj2)
        },
        //改变话题页数
        handleSizeChange(val){
            this.pageSize = val
            this.pageIndex = 1
            this.gettopiclist()
        },
        handleCurrentChange(val) {
            this.pageIndex = val
            this.gettopiclist()
        },
        //改变关注页数
        athandleSizeChange(val){
            this.atpageSize = val
            this.atpageIndex = 1
            this.getfollowList()
        },
        athandleCurrentChange(val) {
            this.atpageIndex = val
            this.getfollowList()
        },
        //屏幕外区域
        closeSel(event){
            var a = document.getElementById("isspeak");
            if(a.contains(event.target)){
                this.isaddspeak = true;
            }else{
                var currentCli = document.getElementById("sellineName");
                if(currentCli){
                if(!currentCli.contains(event.target)){      //点击到了id为sellineName以外的区域，隐藏下拉框
                this.isaddspeak = false;
            }
            }
            }
        },
        //获取球场分类
        getballtype(){
            dynamictype().then((res) => {
              this.balltypelist = res.data
              this.balltypelist.unshift({name:'我的关注'})
          })
          this.gettrueballtype()
        },
        gettrueballtype(){
            dynamictype().then((res) => {
              this.trueballtypelist = res.data
              this.trueballtypelist.unshift({name:'我的动态'})
          })
        },
        //投票
        vote(){
            // this.getfollowList()
            this.$message.error("app专属功能，请前往下载app")
        },
        //发布
        release(){
            console.log("this.imginfo=",this.imginfo)
            if(!this.imginfo[0]){
                this.imginfo='';console.log("改变了",this.imginfo)
                }else{
                    this.imginfo = JSON.stringify(this.imginfo)}
            // this.imginfo = JSON.stringify(this.imginfo)
            if(!this.value || this.value=='我的动态'){this.value=0;this.typeName=''}
            //匹配话题
            var pattern =/#(.+?)#/g;
            this.topics=this.content.match(pattern);
            this.topicscontents = this.content.match(pattern);
            if(this.topics){
                this.topics = this.topics.toString().replace(/(#)/g, "");
                this.topicscontents = this.topics.toString().replace(/(#)/g, "");
                this.topicscontents = this.topicscontents.toString()
                this.getaddSubject()
                this.topics = this.topics.split(',')
                let obj = {};
                // 将数组转化为对象
                for (let key in this.topics) {
                    obj[key] = this.topics[key];
                };
                this.topics = Object.keys(obj).map(val => ({
                        content: obj[val],
                }));
            }
            //匹配话题对应的id
            setTimeout(()=>{
                if(this.topics){
                console.log('this.topics=',this.topics)
                console.log('this.topiclist=',this.topiclist)
                for(let i = 0;i<this.topics.length;i++){
                    // console.log('this.tellMe[i].name=',this.tellMe[i].name)
                    // this.topics[i].content = this.topics[i].content.substring(0, this.topics[i].content.length - 1);
                    for(let j = 0;j<this.topiclist.length;j++){
                        // console.log('this.followlist[j].uname',this.followlist[j].uname)
                        // console.log('相等吗',this.tellMe[i].name == this.followlist[j].uname)
                        if(this.topics[i].content==this.topiclist[j].content){
                           this.topics[i]['subjectId']=this.topiclist[j].id
                           this.topics[i]['id']=this.$store.state.userStatus.userInfo.uid
                           console.log('我要的对象2=',this.topics)
                        }
                    }
                }
                this.topics = JSON.stringify(this.topics)
            }
            },120)
            //匹配@
            var pattern2 =/@(.+?)\s/g;
            this.tellMe=this.content.match(pattern2);
            if(this.tellMe){
                this.tellMe = this.tellMe.toString().replace(/(@)/g, "");
                this.tellMe = this.tellMe.split(',')
                let obj = {};
                // 将数组转化为对象
                for (let key in this.tellMe) {
                    obj[key] = this.tellMe[key];
                };
                this.tellMe = Object.keys(obj).map(val => ({
                        uname: obj[val],
                }));
                }
            //对应@的id
            if(this.tellMe){
                for(let i = 0;i<this.tellMe.length;i++){
                    // console.log('this.tellMe[i].name=',this.tellMe[i].name)
                    this.tellMe[i].uname = this.tellMe[i].uname.substring(0, this.tellMe[i].uname.length - 1);
                    for(let j = 0;j<this.followlist.length;j++){
                        // console.log('this.followlist[j].uname',this.followlist[j].uname)
                        // console.log('相等吗',this.tellMe[i].name == this.followlist[j].uname)
                        if(this.tellMe[i].uname==this.followlist[j].uname){
                           this.tellMe[i]['uid']=this.followlist[j].id
                           console.log('this.tellMe=',this.tellMe)
                        }
                    }
                }
                this.tellMe = JSON.stringify(this.tellMe)
            }
            setTimeout(()=>{
                let data = {
                type: 0,
                typeName: this.typeName,
                typeId:this.value,
                content: this.content,
                imgs: this.imginfo,
                uid:this.$store.state.userStatus.userInfo.uid,
                twoContent:'',
                choose:'',
                isRepeat:0,
                chooseContent:'',
                topic:'',
                overTime:'',
                dynamicId:'',
                tellMe:this.tellMe,
                topics:this.topics,
                resourceType:1,
            }
            dynamicadd(data).then((res) => {
                if(res.code==0){
                    this.$message.success("发布成功")
                    this.content = ''
                    this.isaddimg = false
                    this.imginfo = []
                }else{
                    this.$message.error(res.msg)
                }
            })
            this.value = '我的动态'
            },120)
        },
        //表情列表
        getfeelingList(){
        //     let data = {
        //         version:''
        //     }
        //     feelingList(data).then((res) => {
        //         this.feelinglist = res.data
        //   })
        },
        //添加话题
        getaddSubject(){
            let data = {
                contents: this.topicscontents
            }
            addSubject(data).then((res) => {
                this.gettopiclist()
          })
        },
        //删除图片 这个不能用？不知道，这是删除前调用的打印看看就知道了,z
        beforeAvatarremove(file){
            // console.log('file',file)
            // for(let i=0;i<this.uidinfo.length;i++){
            //     if(file.uid == this.uidinfo[i].uid){
            //         this.$delete(this.imginfo,i)
            //     }
            // }
            // var reader = new FileReader();
            // reader.onload = (event) => {
            //             var txt = event.target.result;
            //             var img = document.createElement("img");
            //             img.src = txt;
            //             img.onload = () => {
            //                 this.imgw = img.width
            //                 this.imgh = img.height
            //                 console.log("宽=",this.imgw,"高",this.imgh)
            //             }
            //         };
            // reader.readAsDataURL(file);
            this.imgnumber-- 
            setTimeout(()=>{this.hideUploadEdit=false},400)
        },
        avatarRemove(file,fileList) {
            // console.log('avatarRemove',file.uid)
            for(let i=0;i<this.uidinfo.length;i++){
                if(file.uid == this.uidinfo[i].uid){
                    this.$delete(this.imginfo,i)
                }
            }
            // console.log('imginfo====',this.imginfo)
        },
        //上传图片
        beforeAvatarUpload(file) {
        console.log('上传',file.uid)
        var obj = {
            uid: file.uid,
            };
        this.uidinfo.push(obj);
        var reader = new FileReader();
        reader.onload = (event) => {
                        var txt = event.target.result;
                        var img = document.createElement("img");
                        img.src = txt;
                        img.onload = () => {
                            this.imgw = img.width
                            this.imgh = img.height
                        }
                    };
        reader.readAsDataURL(file);
        const OSS = require("ali-oss/dist/aliyun-oss-sdk");
        let client = new OSS({
            region: "oss-cn-shenzhen",
            accessKeyId: "this.accessKeyId",
            accessKeySecret: "this.accessKeySecret",
            bucket: "iqiulive-static",
        });
        getKey(data).then((res) => {
            client.options.accessKeyId = res.data.ak;
            client.options.accessKeySecret = res.data.as;
        });
        var key = new Date().getTime();//生成时间戳
        let Name = file.name;
        let reg = new RegExp(/[\u4e00-\u9fa5]/g,'g');
        Name=Name.replace(reg,'');
        console.log('656565=',Name)
        const filename = "/avatar/" + key + Name; // 组成新文件名
        const data = file;
        setTimeout(() => {
            client
            .multipartUpload(filename, data)
            .then((res) => {
                console.log(res)
                if (res.res.status === 200) {
            //         this.$message({
            //     message: "添加成功",
            //     type: "success",
            //   });
                this.imageUrl = "http://static.cloudartisan.cn/avatar/" + key + Name
                var obj = {
                    width: this.imgw,
                    height: this.imgh,
                    url: this.imageUrl,
                    };
                this.imginfo.push(obj);
                this.imgnumber++
                if(this.imgnumber==9){this.hideUploadEdit=true}
              }else{
              }
            })
            .catch((err) => {});
        }, 200);
      },
      //获取话题列表
      gettopiclist(){
        //   console.log("you?")
          let data = {
              pageNum:this.pageIndex,
              pageSize:this.pageSize,
          }
        subjectList(data).then((res) => {
            this.topiclist = res.data
            this.total = res.total
            // console.log("you=",this.topiclist)
            return
        })
      },
      //搜索话题列表
      searchtopiclist(){
          console.log("=")
        if(this.topic!==''){
            let data = {
              search:this.topic,
          }
        searchSubjectList(data).then((res) => {
            this.topiclist = res.data
            return
        })
        }else if(!this.topiclist){
            this.gettopiclist()
        }
      },
      //输入框插入话题
      addspeak(content){
          this.content = this.content + '#' + content + '#'
          this.isaddspeak = false
          this.topic =''
      },
      //#号事件
      keyCodeForEvent(){
        //   console.log("触发了")
          this.content = this.content.substring(0, this.content.length - 1);
          this.isaddspeak=true
      },
      //获取关注列表
      getfollowList(){
          let data = {
              pageNum:this.atpageIndex,
              pageSize:this.atpageSize,
          }
        followList(data).then((res) => {
            this.followlist = res.data
            this.attotal = res.total
        })
        this.isfollow = true
      },
      GetfollowList(){
          let data = {
              pageNum:this.atpageIndex,
              pageSize:this.atpageSize,
          }
        followList(data).then((res) => {
            this.followlist = res.data
            this.attotal = res.total
        })
      },
      //@用户
      atuser(name){
          this.content = this.content + name + ' '
          this.isfollow = false
      },
      //球场选择
      change(e){
          for(let i = 0;i<this.trueballtypelist.length;i++){
              if(e==this.trueballtypelist[i].id){
                  this.typeName = this.trueballtypelist[i].name
              }
          }
      }
    }
  }
</script>
<style lang="scss" scoped>
    .typecontent{
        width: 768px;
        height: 365px;
        background: #FFFFFF;
        border-radius: 8px;
        margin-top: 10px;
    }
    .myfocus{
        margin-top:24px;
        margin-left:35px;
        font-size:16px;
        margin-right:25px;
        color:#F9772A !important;
    }
    .choosecolor{
        color:#F9772A !important;
    }
    .line{
        width: 40px;
        height: 4px;
        background: #F9772A;
        border-radius: 2px;
        margin-top: 12px;
    }
    .releasetitle{
        width: 480px;
        height: 38px;
        border-radius: 4px;
        border: 1px solid #CCCCCC;
        margin-left: 30px;
        padding-left: 10px;
        outline:0;
        margin-right: 10px;
    }
    .releasetitle:focus{
       border-color:  #F9772A !important;      
    }
    ::v-deep .el-input__inner:focus{
        border-color:  #F9772A !important;      
    }
    ::v-deep .el-input__inner{
        // width:392px    
    }
    ::v-deep .el-textarea__inner:focus{
        border-color:  #F9772A !important;
    }
    ::v-deep .el-textarea__inner{
        width: 704px;
        height: 146px;
        border-radius: 4px;
        border: 1px solid #CCCCCC;
        margin-left: 30px;
        margin-top: 20px;
    }
    ::v-deep input::-webkit-input-placeholder {
        color: #cccccc;
    }
    ::v-deep input::-moz-input-placeholder {
        color: #cccccc;
    }
    ::v-deep input::-ms-input-placeholder {
        color: #cccccc;
    }
    .release{
        width: 80px;
        height: 36px;
        background: #F9772A;
        border-radius: 4px;
        color:#FFFFFF;
        cursor: pointer;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        margin-left: 272px;
    }
    .contentinfo{
        width: 768px;
        background: #FFFFFF;
        border-radius: 8px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .addimg{
    position: absolute;
    z-index: 1;
    width: 412px;
    // height: 100px;
    padding: 15px 0 15px 20px;
    background-color: #fff;
    border: 1px solid #f6f6f6;
    border-radius: 12px;
    -webkit-box-shadow: 0 0 8px #dcdcdc;
    box-shadow: 0 0 8px #dcdcdc;
    }
    .addface{
    position: absolute;
    z-index: 3;
    width: 412px;
    // height: 100px;
    padding: 15px 0 15px 20px;
    background-color: #fff;
    border: 1px solid #f6f6f6;
    border-radius: 12px;
    -webkit-box-shadow: 0 0 8px #dcdcdc;
    box-shadow: 0 0 8px #dcdcdc;
    }
    .addspeak{
    position: absolute;
    z-index: 3;
    width: 412px;
    // height: 100px;
    padding: 15px 0 15px 20px;
    background-color: #fff;
    border: 1px solid #f6f6f6;
    border-radius: 12px;
    -webkit-box-shadow: 0 0 8px #dcdcdc;
    box-shadow: 0 0 8px #dcdcdc;
    }
    ::v-deep .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #F9772A;
  }
  ::v-deep .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    margin-left: -44px;
    position: absolute;
    text-align: center;
  }
  ::v-deep .el-upload--picture-card {
    width: 90px;
    height: 90px;
  }
  ::v-deep .el-upload-list__item-actions{
    width: 90px;
    height: 90px;
  }
  ::v-deep .el-upload-list__item-thumbnail{
    width: 90px;
    height: 90px;
  }
  ::v-deep .el-upload-list__item{
      width: 90px;
      height: 90px;
      margin-right: 20px;
  }
  ::v-deep .hide .el-upload--picture-card {
    display: none;
  }
  .close {
      position: absolute;
      right: 14px;
      cursor: pointer;
  }
  .isfollow{
    position: absolute;
    z-index: 10;
    width: 412px;
    padding: 15px 0 15px 20px;
    background-color: #fff;
    border: 1px solid #f6f6f6;
    border-radius: 12px;
    -webkit-box-shadow: 0 0 8px #dcdcdc;
    box-shadow: 0 0 8px #dcdcdc;
    top: 200px;
    left: 154px;
  }
.topic{
    width:392px
}
</style>

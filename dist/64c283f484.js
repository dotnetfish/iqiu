(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d36cbe62"],{"0342":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAABR1BMVEUAAAD///+AgIBVVVVAQEAzMzNAQEAzMzNAQEA3Nzc8PDw5OTk2NjYzMzM6Ojo7Ozs4ODg2NjYzMzM4ODg0NDQ2NjY1NTUzMzM1NTU3Nzc2NjY1NTU0NDQ2NjY1NTU2NjYzMzM2NjY0NDQ0NDQ0NDQ2NjY0NDQzMzM0NDQzMzM1NTU0NDQzMzM1NTU1NTU0NDQ1NTU0NDQ0NDQ0NDQzMzM1NTU0NDQ0NDQzMzM1NTU0NDQzMzM0NDQ1NTUzMzM0NDQ0NDQ0NDQzMzM0NDQzMzMzMzM0NDQzMzM0NDQzMzMzMzM0NDQ0NDQ0NDQ0NDQ0NDQ0NDQzMzMzMzM0NDQzMzM0NDQzMzMzMzMzMzM0NDQzMzMzMzM0NDQ0NDQzMzMzMzM0NDQzMzMzMzMzMzM0NDQzMzMzMzMzMzM0NDQzMzM0NDQzMzMzMzMSjSYEAAAAbHRSTlMAAQIDBAUICgwOERITFBYaICEoKSwvMDI1ODk6Oz0/QkZHSUpPUVRVWVpcXl9gYWNlZ2tsbm9wcXN0dnd6foGEhYqMjpGWmKStrq+ytba6u7/Cw8TIydLV2t7f4eLj5OXn6err7O7w9ff6/P5nI94jAAABU0lEQVRIx83VR1MCQRCG4UYFE0bMWVExoiiYE+aAgjmLrArKvv//7IECLdiFmfLid9x6aqu3p3tHRERqVy4SJkXy6JWfBJKUiuHI6R1KJ1Wee7eCTs9ntTsJcDjW1lIkNblSVgECoppL4EhZiwGMK8mGtZkKMYF2FV35BHsC0Pr7cbPPYcl7gHghPyZSZ8X7gfdCHoGXPi1Oer1Mh0OsQYtjDGlxzLBTh8NVoxYnOarFoVeL39Xr8IMqjWJSfp3O3Hh0+r7v0jimpE9nZq6bNCbS3HaqD3D41Sv261G4q9a7JwOAIQlgQmW1Q8CtnAMnCtqR+SEtA4RK6w2Aaan5AIj4OzuKpHs2BvDsEvGjGnNYRGRLVS9l6pp6U9Hxkex3VAejj6nPIkk9nAYq5V/HM7eYn4VBW931ZdWRTTtufcHe2/FJS257zzmCkWh+znbdf2jGNw6mRudDJPM1AAAAAElFTkSuQmCC"},"7b4a":function(t,e,i){},"839b":function(t,e,i){"use strict";i.r(e),i("b0c0"),i("4795");var a=i("2909"),n=(i("d3b7"),i("ddb0"),i("5d2d")),s=i("4ec3"),o={name:"SubNav",props:{typeId:{type:String,default:"all"},typeName:{type:String,default:""},keys:{type:String,default:"subNav"},exclude:{type:String,default:""}},data:function(){return{configs:[]}},created:function(){var t=this;this.getAllCategoryList().then((function(){t.$emit("update:typeId",n.a.getItem(t.keys)||"all"),t.$emit("update:typeName",n.a.getItem(t.keys+"Name")||"全部"),t.$emit("change")}))},methods:{getAllCategoryList:function(){var t=this;return s.a({name:"index"},{}).then((function(e){t.configs=e.data,t.configs.unshift({code:"all",name:"全部"})})).catch((function(t){}))},handleClick:function(t,e){this.$emit("update:typeId",t),this.$emit("update:typeName",e),this.$emit("change"),n.a.setItem(this.keys,t),n.a.setItem(this.keys+"Name",e)}}},l=(i("bfa2"),i("2877")),c=Object(l.a)(o,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"sub-nav"},t._l(t.configs,(function(e){return i("li",{directives:[{name:"show",rawName:"v-show",value:e.code!=t.exclude,expression:"item.code !=exclude"}],key:e.code,class:{active:t.typeId===e.code},on:{click:function(i){return t.handleClick(e.code,e.name)}}},[t._v(" "+t._s(e.name)+" ")])})),0)}),[],!1,null,"e656e900",null).exports,d=i("9eca"),r=i("8984"),u={name:"CategoryList",components:{LiveListItem:d.a,subNav:c},data:function(){return{typeId:"all",page:1,size:30,typeName:"",loadTxt:"~努力加载中...",scrollFlag:!1,noDataFlag:!1,isDataShow:1,isNoData:0,isMore:0,allLiveList:[],isFold:!1}},props:{getisFold:{type:Boolean,default:!1}},created:function(){},mounted:function(){window.addEventListener("scroll",this.scrollLoadMore,!0)},destroyed:function(){window.removeEventListener("scroll",this.scrollLoadMore)},watch:{$route:"routeChange",getisFold:function(t){this.isFold=t}},computed:{getItemW:function(){return this.isFold?"fold":"unfold"}},methods:{getFoldState:function(){var t=window.sessionStorage.getItem("leftFoldState");this.isFold=null!==t&&"false"!==t},scrollLoadMore:function(){var t=document.documentElement.clientHeight||document.body.clientHeight||window.screen.height;if((document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset)+t>=(document.documentElement.scrollHeight||document.body.scrollHeight)-60&&!this.noDataFlag){if(this.scrollFlag)return!1;this.scrollFlag=!0,this.isMore=1;var e=this;setTimeout((function(){e.page++,e.getAllLiveList(e.page,e.size,e.typeId),e.scrollFlag=!1}),1e3)}},routeChange:function(){this.isMore=0,this.page=1,this.allLiveList=[],this.getAllLiveList()},getAllLiveList:function(){var t=this;this.typeId=this.typeId||"all";var e=document.documentElement.clientHeight||document.body.clientHeight||window.screen.height;e>1080&&e<1215?this.size=40:e>1215&&e<1350?this.size=50:e>1350&&e<1495?this.size=60:e>1495&&(this.size=70),this.page>1&&(this.size=20);var i={p:this.page,size:this.size,typeId:this.typeId};s.j(i,{}).then((function(e){var i;e.data.length?(t.isMore=0,t.loadTxt="加载中...",t.noDataFlag=!1,(i=t.allLiveList).push.apply(i,Object(a.a)(e.data))):(t.isMore=1,t.loadTxt="真的到底了",t.noDataFlag=!0)})).catch((function(t){}))},regularRefresh:function(){},liveListEventTanck:function(t){var e;e={item_id:"living_room_enter_click",page_id:"zhibo",page_2_id:this.typeName,room_id:t.id,btn:t.name},r.a(e)}}},M=(i("97c3"),Object(l.a)(u,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"live-list-box"},[a("subNav",{attrs:{typeId:t.typeId,typeName:t.typeName,keys:"CategoryList"},on:{"update:typeId":function(e){t.typeId=e},"update:type-id":function(e){t.typeId=e},"update:typeName":function(e){t.typeName=e},"update:type-name":function(e){t.typeName=e},change:t.routeChange}}),a("div",{staticClass:"liveRecomend-title"},[a("img",{staticStyle:{width:"23px",height:"23px",margin:"18px 12px 18px 0px"},attrs:{src:i("0342")}}),a("p",{staticClass:"liveRecomend-title-text"},[t._v(t._s(t.typeName)+"直播"),a("i",{staticClass:"el-icon-arrow-right arrow-right"})])]),a("div",{staticStyle:{margin:"0 -12px",width:"1224px"}},[a("live-list-item",{attrs:{liveList:t.allLiveList,itemW:t.getItemW},on:{liveListEventTanck:t.liveListEventTanck}})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isNoData,expression:"isNoData"}],staticClass:"no-data"},[a("img",{attrs:{src:"",alt:""}}),a("p",[t._v("暂时没有数据")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isMore,expression:"isMore"}],staticClass:"load-more"},[t._v(t._s(t.loadTxt))])],1)}),[],!1,null,"87bddab4",null));e.default=M.exports},"8f71":function(t,e,i){},"97c3":function(t,e,i){"use strict";var a=i("8f71");i.n(a).a},bfa2:function(t,e,i){"use strict";var a=i("7b4a");i.n(a).a}}]);
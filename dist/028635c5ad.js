(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-feed0536"],{"0d91":function(t,a,e){"use strict";e.r(a);var o=e("44c4"),n=e("c367"),s={name:"channel",components:{RightFloatLayer:o.a,homeNav:n.a},data:function(){return{page:1,size:20,typeName:"全部直播",typeId:"all",loadTxt:"努力加载中...",scrollFlag:!1,noDataFlag:!1,isDataShow:1,isNoData:0,isMore:0,allLiveList:[],isFold:!1,flag:""}},created:function(){},mounted:function(){this.download()},destroyed:function(){},computed:{getItemW:function(){return this.isFold?"fold":"unfold"},getisFold:function(){return this.isFold}},methods:{download:function(){this.flag=this.$route.path,"/download"==this.flag?this.$refs.download.style.width="100%":this.$refs.download.style.width="1200px"},changeFoldState:function(){this.getFoldState()},getFoldState:function(){var t=window.sessionStorage.getItem("leftFoldState");this.isFold=null!==t&&"false"!==t}}},i=(e("9dae"),e("2877")),l=Object(i.a)(s,(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"wrap"},[a("div",{staticClass:"topNav"},[a("homeNav",{attrs:{navLogo:!0}})],1),a("right-float-layer",{attrs:{step:200}}),a("div",{ref:"download",staticClass:"main-box"},[a("router-view",{attrs:{getisFold:this.getisFold}})],1)],1)}),[],!1,null,"554723ca",null);a.default=l.exports},"9dae":function(t,a,e){"use strict";var o=e("bb45");e.n(o).a},bb45:function(t,a,e){}}]);
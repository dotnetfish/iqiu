<template>
    <div class="wrap">
        <div class="topNav">
            <homeNav :navLogo="true"></homeNav>
        </div>
<!--        <left-side-bar @changeFoldState="changeFoldState"></left-side-bar>-->
        <right-float-layer :step="200"></right-float-layer>
        <div class="main-box" ref="download">
            <router-view :getisFold="getisFold"></router-view>
        </div>
    </div>
</template>

<script>
  // @ is an alias to /src
  // import LeftSideBar from '@/components/left-side-bar.vue'
  import RightFloatLayer from '@/components/right-float-layer.vue'
  import homeNav from '@/views/home/homeNav.vue'

//   import { Button } from 'element-ui';

  export default {
    name: 'channel',
    components: {
    //   [Button.name]: Button,
    //   LeftSideBar,
      RightFloatLayer,
      homeNav
    },
    data () {
      return {
        page: 1,
        size: 20,
        typeName: '全部直播',
        typeId: 'all',
        loadTxt: '努力加载中...',
        scrollFlag: false,
        noDataFlag: false,
        isDataShow: 1,
        isNoData: 0,
        isMore: 0,
        allLiveList: [],
        isFold: false,
        flag:'',
      }
    },
    created () {
      // console.log('频道首页')
      // console.log('折叠状态',this.$store.state.fold);
      // this.getFoldState();
    },
    mounted () {
      this.download();
    },
    beforeUpdate () {
      this.download();
    },
    destroyed () {
    },
    computed: {
      getItemW () {
         if(this.isFold){
          return  'fold';
        }else {
          return  'unfold';
        }
      },
      getisFold () {
        return this.isFold;
      },
      // mainStyleObj () {
      //   if(this.isFold){
      //     return {
      //       marginLeft: `68px`,
      //       minWidth: '1132px'
      //     }
      //   }else {
      //     return {
      //       marginLeft: `252px`,
      //       minWidth: '948px'
      //     }
      //   }
      // },
      // topNavStyleObj () {
      //   if(this.isFold){
      //     return {
      //       // paddingLeft: `48px`,
      //       width: `calc(100% - 48px)`,
      //       minWidth: '1132px'
      //     }
      //   }else {
      //     return {
      //       // paddingLeft: `240px`,
      //       width: `calc(100% - 240px)`,
      //       minWidth: '948px'
      //     }
      //   }
      // }
    },
    methods: {
      download() {
        this.flag = this.$route.path
        if(this.flag == '/download') {
          this.$refs.download.style.width = '100%';
        }else {
          this.$refs.download.style.width = '1200px';
        }
        // console.log("44444444444",this.$route.path);
      },
      // 修改折叠状态
      changeFoldState () {
        this.getFoldState();
        // console.log(55)
      },
      // 获取折叠状态
      getFoldState () {
        let leftFoldState = window.sessionStorage.getItem('leftFoldState');
        this.isFold =  leftFoldState === null ||  leftFoldState === 'false' ? false : true;
        // console.log('channel:',this.isFold)
      }
    }

  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/_index.scss";
.wrap {
    padding-top: 60px;
}
.topNav {
    position: fixed;
    z-index: $z-index1;
    top: 0;
    left: 0;
    width: 100%;
    /*padding-left: 240px;*/
    // transition: all 0.5s;
    background-color: #fff;
}
.main-box {
    position: relative;
    left: 0;
    // min-width: 1640px;
    // min-width: 1837px;
    margin: 0 auto;
    width: 1200px;
    // min-width: 1132px;
    /*margin-left: 252px;*/
    //   margin-left: 68px;
    // padding: 0 8px;
    font-size: 14px;
    color: $color-title1;
    transition: all 0.5s;
  }
</style>

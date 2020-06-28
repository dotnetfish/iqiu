<template>
    <div class="wrap">
        <div class="topNav">
            <homeNav :navLogo="true"></homeNav>
        </div>
        <div class="main-box" >
            <router-view :getisFold="getisFold"></router-view>
        </div>
    </div>
</template>

<script>
  // @ is an alias to /src
  import homeNav from '@/views/home/homeNav.vue'

//   import { Button } from 'element-ui';

  export default {
    name: 'Mchannel',
    components: {
    //   [Button.name]: Button,
      homeNav
    },
    data () {
      return {
        page: 1,
        size: 20,
        scrollFlag: false,
        noDataFlag: false,
        isDataShow: 1,
        isNoData: 0,
        isMore: 0,
        allLiveList: [],
        isFold: false
      }
    },
    created () {
      console.log('频道首页')
      console.log('折叠状态',this.$store.state.fold);
      this.getFoldState();
    },
    mounted () {
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
      topNavStyleObj () {
        if(this.isFold){
          return {
            paddingLeft: `48px`,
            width: `calc(100% - 48px)`,
            minWidth: '1132px'
          }
        }else {
          return {
            paddingLeft: `240px`,
            width: `calc(100% - 240px)`,
            minWidth: '948px'
          }
        }

      }
    },
    methods: {
      changeFoldState () {
        this.getFoldState();
        // console.log(55)
      },
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
    transition: all 0.5s;
    background-color: #fff;
}
.main-box {
    position: relative;
    left: 0;
    min-width: 948px;
    font-size: 14px;
    color: $color-title1;
    transition: all 0.5s;
  }
</style>

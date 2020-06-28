<template>
  <ul class="sub-nav">
    <li v-for="item in configs" :key="item.code" :class="{active: typeId === item.code}" @click="handleClick(item.code,item.name)" v-show="item.code !=exclude">
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
  import storages from "@/utils/storage.js";
  import * as api from "@/api/api";

  export default {
    name: 'SubNav',
    props: {
      typeId: {
        type: String,
        default: "all"
      },
      typeName: {
        type: String,
        default: ""
      },
      keys: {
        type: String,
        default: "subNav"
      },
      exclude: {
        type: String,
        default: ""
      },
    },
    data() {
      return {
        configs: [
        //   {
        //   key: "all",
        //   value: "热门"
        // }, {
        //   key: "basketball",
        //   value: "篮球"
        // }, {
        //   key: "football",
        //   value: "足球"
        // }, {
        //   key: "other",
        //   value: "综合"
        // }
        ]
      }
    },
    created() {
      this.getAllCategoryList().then(() => {
        this.$emit('update:typeId', storages.getItem(this.keys) || 'all')
        this.$emit('update:typeName', storages.getItem(this.keys+'Name') || '全部')
        this.$emit('change')
      })
    },
    methods: {
      // 获取分类列表
      getAllCategoryList () {
        return api.CategoryList({name: 'index'},{}).then(res => {
          // console.warn(res);
          this.configs = res.data;
          this.configs.unshift({code: "all", name: "全部"});
          console.log(this.configs);
        }).catch(e => {
          console.error(e);

        })
      },
      handleClick(keys,typeName) {
        // this.typeId = keys
        this.$emit('update:typeId', keys)
        this.$emit('update:typeName', typeName)
        this.$emit('change')
        storages.setItem(this.keys, keys)
        storages.setItem(this.keys+'Name', typeName)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/_index.scss";

  .sub-nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 60px;
    margin: 17px 0 10px;
    padding-left: 18px;
    border-radius: 6px;
    background-color: #fff;
    color: $color-title3;
    font-size: 18px;
    box-sizing: border-box;
    li {
      padding: 0 18px;
      cursor: pointer;

      &.active {
        color: $color-main;
        font-size: 22px;
        @extend .bold;
      }
    }
  }
</style>

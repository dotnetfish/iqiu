<template>
  <div class="bj">
    <div class="sign-bj">
            <div class="week1"><img src="@/assets/sign/alone.png"></div>
            <div class="week1"><img src="@/assets/sign/tow.png"></div>
            <div class="week1"><img src="@/assets/sign/three.png"></div>
            <div class="week1"><img src="@/assets/sign/four.png"></div>
            <div class="week2"><img src="@/assets/sign/five.png"></div>
            <div class="week2"><img src="@/assets/sign/six.png"></div>
            <div class="week2"><img src="@/assets/sign/seven.png"></div>
            <div style="width:342px;height:45px"><button class="sign-in">马上签到</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeSign",
};
</script>

<style lang="scss" scoped>
.bj {
    position: absolute;
    width: 100%;
    height: 1000px;
    background-color: rgba(53, 53, 53, 0.658);
    z-index: 9;
}
.sign-bj {
  position: absolute;
  width: 544px;
  height: 688px;
  background: url(../../assets/sign/beijing.png) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  z-index: 10;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  right:0;
  left:0;
  margin:0 auto;
  text-align:center;
//   margin-left: 600px;
}
.week1 {
    margin-top: 240px;
    margin-left: 23px;
    width: 107px;
    height: 128px;
}

.week2 {
    margin-left: 23px;
    width: 107px;
    height: 128px;
}

.sign-in {
    width: 342px;
    height: 65px;
    background:linear-gradient(0deg,rgba(249,183,33,1),rgba(249,183,33,1));
    border-radius:33px;
    color: #fff;
    border: 0;
    outline: 0;
    margin-left: 101px;
}
</style>
<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(sc,index) in starClasses" :key="index" :class="sc"></span>
  </div>
</template>
<script>
const class_on = "on";
const class_half = "half";
const class_off = "off";
export default {
  name: "Star",
  props: {
    size: Number,
    score: Number
  },
  computed: {
    //   3.2: 3+0+2
    //   3.5: 3+1+1
    // 星星计算方式
    // 实星:评分整数部分
    // 半星：评分小数部分，小数部分大于等于5，半星个数为1，小于5，半星个数为0
    // 灰星：5-实星-半星
    starClasses() {
      const { score } = this;
      const scs = [];
      //  向scs中添加n个class_on
      const scoreInteger = Math.floor(score);
      for (let i = 0; i < scoreInteger; i++) {
        scs.push(class_on);
      }
      if (score * 10 - scoreInteger * 10 >= 5) {
        scs.push(class_half);
      }
      while (scs.length < 5) {
        scs.push(class_off);
      }
      return scs;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.star { // 2x图 3x图
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star48_on');
      }

      &.half {
        bg-image('./images/stars/star48_half');
      }

      &.off {
        bg-image('./images/stars/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star36_on');
      }

      &.half {
        bg-image('./images/stars/star36_half');
      }

      &.off {
        bg-image('./images/stars/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star24_on');
      }

      &.half {
        bg-image('./images/stars/star24_half');
      }

      &.off {
        bg-image('./images/stars/star24_off');
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            :class="{current: currentIndex===index}"
            v-for="(good,index) in goods"
            @click="clickMenuItem(index)"
            :key="index"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <ShopCart />
      <div class="foods-wrapper">
        <ul ref="foodsUi">
          <li class="food-list-hook" v-for="(good,index) in goods"
           :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Food ref="food" :food="food" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import CartControl from '../../../components/cartControl/cartControl'
import Food from '../../../components/food/food'
import ShopCart from '../../../components/ShopCart/ShopCart'
export default {
  name: "ShopGoods",
  data() {
    return {
      scrollY: 0, //右侧滑动的Y轴坐标(滑动过程实时变化)
      tops: [], //所有右侧分类li的top组成的数组，列表第一次显示后就不再变化
      food:{},//点击显示的food
    };
  },
  components:{
    CartControl,
    Food,//点击显示的food
    ShopCart
  },
  // computed初始时和相关数据发生变化时会执行
  computed: {
    ...mapState(["goods"]),
    // 计算得到当前分类的下标
    currentIndex() {
      const { scrollY, tops } = this;
      // 根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {//findIndex() 返回符合测试条件的数组第一个元素位置。
        // scrollY>=top&&scrollY<下一个top
        return scrollY >= top && scrollY < tops[index + 1];
      });
     
      return index
    }
  },
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      this.$nextTick(() => {
        //数据更新后执行
        this._initScroll();
        this._initTops();
      });
    });
  },
  methods: {
    _initScroll() {
      new BScroll(".menu-wrapper",{
        click:true
      });
      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType: 2, //设置这个才能监听滑动，2这个值因为惯性滑动不会触发
        click:true
      });
      // 给右侧列表绑定scroll监听
      this.foodsScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    _initTops() {
      const tops = [];
      let top = 0;
      tops.push(top);
      const lis = this.$refs.foodsUi.getElementsByClassName("food-list-hook");
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      this.tops = tops;
    },
    clickMenuItem(index){
      // 得到目标位置的scrollY
      const scrollY = this.tops[index]
      // 立即更新scrollY(让点击的分类项成为当前分类)
      this.scrollY = scrollY
      // 平滑移动右侧列表
      this.foodsScroll.scrollTo(0,-scrollY,300)
    },
    showFood(food){
      this.food = food
      this.$refs.food.toggleShow()
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>





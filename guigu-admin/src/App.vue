<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
import { mapActions } from "vuex";
export default {
  name: "Msite",
  components: {
    FooterGuide
  },
  mounted(){
    // this.$store.dispatch('getAddress')
    this.getAddress()
    this.getUserInfo()
  },
 methods:{
   ...mapActions(['getAddress','getUserInfo'])
 }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  body{
    touch-action: none;
  }
</style>

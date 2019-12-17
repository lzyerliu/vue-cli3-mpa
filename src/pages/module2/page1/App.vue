<template>
  <div class="wrapper">
    <h3>vue-page1</h3>
    <img src="../../../assets/images/play.png" alt="">
  </div>
</template>

<script>

export default {
  name: 'page1',
  mounted () {
    console.log('page1')
  }
}
</script>

<style lang="less">
.wrapper{
  h3{
    font-size: 46px;
  }
  img{
    width: 100%;
  }
}
</style>

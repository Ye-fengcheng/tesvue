<template>
  <div class="progressBar">
     <!-- 进度条 -->
     <div>
         <span :class="progess"></span>
     </div>
     <!-- 四个圆 -->
     <span :class="visited2"></span>
     <span :class="visited3"></span>
     <span :class="visited4"></span>
     <span :class="visited1"></span>
  </div>
</template>
<script>
export default {
  name: 'epmsProgressBar',
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  methods: {
  },
  computed: {
    progess () {
      if (this.step < 1) {
        this.step = 1
      }
      if (this.step > 4) {
        this.step = 4
      }
      return 'progess' + this.step * 25
    },
    visited1 () {
      return 'vistied'
    },
    visited2 () {
      return this.step > 1 ? 'vistied' : 'noVistied'
    },
    visited3 () {
      return this.step > 2 ? 'vistied' : 'noVistied'
    },
    visited4 () {
      return this.step > 3 ? 'vistied' : 'noVistied'
    }
  }
}
</script>

<style scoped>
.progressBar{
    width: 600px;
    height: 50px;
    position: relative;
    margin: 30px 0 0 200px;
}
.progressBar div{
    width: 100%;
    height: 5px;
    position: absolute;
    top:50%;
    left: 0;
    margin-top:-20px;
    border:1px solid #ddd;
    background: #ccc;
}
.progess0{
    width: 0%
}
.progess25{
    width: 25%
}
.progess50{
    width: 50%
}
.progess75{
    width: 75%
}
.progess100{
    width: 100%
}
.progressBar>span .vistied{
    background: #5bc0de
}
.progressBar>span .noNistied{
    background: #ccc
}
.progressBar div span{
    position: absolute;
    display: inline-block;
    background: #5bc0de;
    height: 5px;
}
.progressBar>span{
    position: absolute;
    top:0;
    margin-top:-2px;
    width: 20px;
    height: 20px;
    border:2px solid #fff;
    border-radius: 50%;
    background: #5bc0de;
    margin-left: -10px;
    color:#fff;
}
.progressBar>span:nth-child(0){
    left: 0%;
}
.progressBar>span:nth-child(2){
    left: 37.5%;
}
.progressBar>span:nth-child(3){
    left: 62.5%;
}
.progressBar>span:nth-child(4){
    left: 87.5%;
}
.progressBar>span:nth-child(5){
    left: 12.5%;
}
</style>


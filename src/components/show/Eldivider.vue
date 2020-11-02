<template>
  <div ref="divider" id="dividerId" class="el-divider">
    <div ref="dividerText" id="dividerTextId" class="el-divider__text" :style="{left}">
      {{ baziTime.year }}年{{ baziTime.month }}月{{ baziTime.day }}日
      {{ baziTime.hour }}时{{ baziTime.minute }}分
    </div>
  </div>
</template>

<script>
export default {
  name: "Eldivider",
  data() {
    return {
      left: '',
      dividerWidth: '',
      dividerTextWidth: '',
    }
  },
  watch: {
    dividerWidth: 'dividerTextLeft'
  },
  methods: {
    //计算位置
    dividerTextLeft() {
      let n = ((this.dividerWidth + 48) / 2) - 20
      this.left = n + 'px'
    },
  },
  props: {
    baziTime: {type: Object},
  },
  mounted() {
    this.$nextTick(() => {
      this.dividerWidth = document.getElementById('dividerId').clientWidth
      // this.dividerWidth = this.$refs.divider.clientWidth
      // this.dividerTextWidth = this.$refs.dividerText.clientWidth
      window.onresize = () => {
        return (() => {
          // this.dividerTextWidth = document.getElementById('dividerTextId').clientWidth
          this.dividerWidth = document.getElementById('dividerId').clientWidth
        })();
      };
    })
  }
}
</script>

<style scoped>
.el-divider {
  position: relative;
  background-color: #c2a36a;
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
  font-size: 0.6rem !important;
}

.el-divider__text {
  width: 200px;
  background-color: #595757;
  color: white;
  position: absolute;
  padding: 0 15px;
  text-align: center;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
</style>
<template>
  <div>
    <v-snackbar
        transition="scroll-y-transition"
        v-model="isShow"
        timeout="3000"
        :color="color + ' !important'"
        top
        elevation="9"
    >
      <template>
        <div>
          <v-icon left>{{ icon }}</v-icon>
          {{ message }}
        </div>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Message",
  computed: {
    isShow: {
      get() {
        return this.$store.state.alert.isShow
      },
      set(v) {
        this.$store.commit('alertMuta', {isShow: v})
      }
    },
    color: {
      get() {
        return this.$store.state.alert.color
      },
      set(v) {
        this.$store.commit('alertMuta', {color: v})
      }
    },
    message: {
      get() {
        return this.$store.state.alert.message
      },
      set(v) {
        this.$store.commit('alertMuta', {message: v})
      }
    },
    icon: {
      get() {
        return this.$store.state.alert.icon
      },
      set(v) {
        this.$store.commit('alertMuta', {icon: v})
      }
    },
  },
  mounted() {
    //把组件加载到BODY，切换页面的时候还会有提示
    this.$nextTick(() => {
      const body = document.querySelector("body");
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  }
}
</script>
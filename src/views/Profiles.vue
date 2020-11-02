<template>
  <div>
    <Message/>
    <Header></Header>
    <Side></Side>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Foot></Foot>
  </div>
</template>

<script>
const Foot = () => import("@/common/Foot")
const Header = () => import("@/components/profiles/Header")
const Message = () => import("@/common/Message")
const Side = () => import("@/components/profiles/Side")

export default {
  name: "Profiles",
  components: {Message, Side, Foot, Header}
}
</script>
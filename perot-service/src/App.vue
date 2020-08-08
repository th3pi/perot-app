<template>
  <div id="app">
    <el-menu default-active="0" style="flex: 1; height: 100vh;">
      <Logo primary="Perot" secondary="Service" />
      <el-menu-item index="0" @click="$router.push({ name: 'home' }).catch(() => {})">
        <h3>Quick Actions</h3>
      </el-menu-item>
      <el-submenu index="1" @click="$router.push({ name: 'exhibits' }).catch(() => {})">
        <template slot="title">
          <h3>Exhibits</h3>
        </template>
        <el-menu-item
          index="1"
          @click="$router.push({ name: 'exhibits' }).catch(() => {})"
        >Exhibit Halls</el-menu-item>
        <el-menu-item
          index="2"
          @click="$router.push({ name: 'experience-route' }).catch(() => {})"
        >Exhibits Experience Route</el-menu-item>
      </el-submenu>
      <el-menu-item index="2" @click="$router.push({ name: 'trivia' }).catch(() => {})">
        <h3>Trivia</h3>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push({ name: 'scavenger-hunts' }).catch(() => {})">
        <h3>Scavenger Hunt</h3>
      </el-menu-item>
      <el-menu-item index="4" @click="$router.push({ name: 'faqs' }).catch(() => {})">
        <h3>FAQs</h3>
      </el-menu-item>
      <el-menu-item index="5" @click="$router.push({ name: 'announcements' }).catch(() => {})">
        <h3>Announcements</h3>
      </el-menu-item>
      <el-menu-item index="6" @click="$router.push({ name: 'activities' }).catch(() => {})">
        <h3>Activities</h3>
      </el-menu-item>
    </el-menu>

    <slide-x-right-transition mode="out-in">
      <router-view class="body" style="flex: 2;"></router-view>
    </slide-x-right-transition>
  </div>
</template>

<script>
import { SlideXRightTransition } from "vue2-transitions";
import Logo from "@/components/Logo";
export default {
  name: "App",
  created() {
    document.title = this.$route.meta.title;
  },
  components: { SlideXRightTransition, Logo },
  watch: {
    $route(to) {
      document.title = to.meta.title;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");
#app {
  display: flex;
  flex-direction: row;
  font-family: "Open Sans", sans-serif;
}
</style>

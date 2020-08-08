<template>
  <div class="placeholder-body">
    <!-- Page header -->
    <div class="page-header">
      <Logo
        primary="Activities"
        secondary="is a nice to have"
        style="text-align: center; font-size: 125%;"
        :logoButton="true"
      ></Logo>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "scavenger-hunts",
  components: { Logo },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
h4 {
  margin: 0;
}

.placeholder-body {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

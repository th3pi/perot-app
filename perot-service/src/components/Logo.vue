<template>
  <div class="logo">
    <h2>
      {{ primary }}
      <span style="color:#FF0000;">[</span
      ><span style="font-weight: 300; font-size: 85%;"
        ><span
          :class="{ 'logo-button': logoButton }"
          @click="$emit('logo-clicked')"
          >{{ secondary }}</span
        ></span
      ><span style="color:#FF0000;">]</span>
    </h2>
  </div>
</template>

<script>
export default {
  name: "logo",
  props: {
    primary: String,
    secondary: String,
    logoButton: Boolean,
  },
};
</script>

<style lang="scss">
.logo-button {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: red;
}
</style>

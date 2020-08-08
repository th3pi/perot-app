<template>
  <div class="home-body">
    <Logo primary="Quick" secondary="ACTIONS" />

    <div>
      <!-- Exhibit options -->
      <el-divider content-position="left"
        ><Logo secondary="Exhibit Halls" style="font-size: .75rem;"
      /></el-divider>
      <div
        class="card-button"
        @click="
          $router
            .push({ name: 'exhibits-form', params: { action: 'create' } })
            .catch(() => {})
        "
      >
        <el-card class="qa-card">
          <h4>Add a new Exhibit Hall</h4>
        </el-card>
      </div>

      <div
        @click="$router.push({ name: 'exhibits' }).catch(() => {})"
        class="card-button"
      >
        <el-card class="qa-card">
          <h4>Modify Exhibit Halls</h4>
        </el-card>
      </div>
      <el-divider content-position="left"
        ><Logo secondary="Trivia" style="font-size: .75rem;"
      /></el-divider>
      <div
        class="card-button"
        @click="
          $router
            .push({ name: 'trivia-form', params: { action: 'create' } })
            .catch(() => {})
        "
      >
        <el-card class="qa-card">
          <h4>Add a Trivia Question</h4>
        </el-card>
      </div>
      <div
        @click="$router.push({ name: 'trivia' }).catch(() => {})"
        class="card-button"
      >
        <el-card class="qa-card">
          <h4>Modify Trivia Questions</h4>
        </el-card>
      </div>
      <el-divider content-position="left"
        ><Logo secondary="Scavenger Hunt" style="font-size: .75rem;"
      /></el-divider>
      <div
        class="card-button"
        @click="
          $router
            .push({ name: 'sh-form', params: { action: 'create' } })
            .catch(() => {})
        "
      >
        <el-card class="qa-card">
          <h4>Add a Scavenger Hunt</h4>
        </el-card>
      </div>
      <div
        @click="$router.push({ name: 'scavenger-hunts' }).catch(() => {})"
        class="card-button"
      >
        <el-card class="qa-card">
          <h4>Modify Scavenger Hunts</h4>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "home",
  components: { Logo },
};
</script>

<style lang="scss">
.home-body {
  display: block;
  margin: 0 auto;
  .logo {
    font-size: 200%;
    h2 {
      text-align: center;
    }
  }
  h2 {
    text-align: center;
  }
  .qa-card {
    border-radius: 5px;
    border: 1px solid red;
    border-color: transparent;
    transition: border-color 0.5s, color 0.5s;
  }
  .qa-card:hover {
    color: red;

    border-color: red;
  }
  .card-button {
    margin: 1rem;
    cursor: pointer;
  }
}
</style>

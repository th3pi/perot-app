<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo
        primary="Scavenger Hunt"
        :secondary="showingScavengerHunts"
        style="text-align: center; font-size: 150%;"
        :logoButton="true"
        @logo-clicked="logoClicked"
      ></Logo>
    </div>
    <div style="display:inline">
      <el-button
        style="margin-left:.5rem"
        @click="
          $router
            .push({ name: 'sh-form', params: { action: 'create' } })
            .catch(() => {})
        "
      >
        <i class="el-icon-plus" style="margin-right: .5rem"></i>Add a new
        Scavenger Hunt</el-button
      >
      <el-dropdown trigger="click">
        <el-button style="margin-left:.5rem">
          <i class="el-icon-s-unfold" style="margin-right: .5rem"></i>Show
          {{ showingScavengerHunts }}</el-button
        >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="open-sans">
            <el-button type="text" @click="show('ALL')">
              All
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item class="open-sans">
            <el-button type="text" @click="show('FEATURED')">
              Featured
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item class="open-sans">
            <el-button type="text" @click="show('OTHERS')">
              Others
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- Scavenger Hunt cards -->
    <el-card
      class="box-card"
      v-for="(sh, index) in scavengerHunts"
      :key="index"
    >
      <!-- Scavenger Hunt card header -->
      <div slot="header" class="clearfix header">
        <div>
          <el-tag effect="dark"
            ><h3>{{ sh.exhibitName }}</h3></el-tag
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            class="text-button"
            @click="
              $router.push({
                name: 'sh-form',
                params: { action: 'modify', shId: sh.shId },
              })
            "
          >
            <p style="display: inline; margin: 0 .5rem;">Modify</p>
            <i class="el-icon-right"></i>
          </el-button>
          <el-switch
            style="float: right; marign: 0 1rem;"
            v-model="sh.status"
            @change="updateStatus(sh.shId, sh.status)"
          ></el-switch>
        </div>
      </div>
      <div class="card-row">
        <h4>Scavenger Hunt ID</h4>
        <p>{{ sh.shId }}</p>
      </div>
      <el-collapse>
        <el-collapse-item>
          <template slot="title"
            ><h3>Items for this Scavenger Hunt</h3></template
          >
          <el-card
            v-for="(item, index) in sh.items"
            :key="index"
            class="box-card"
          >
            <div class="card-row">
              <h4>Name</h4>
              <p>{{ item.name }}</p>
            </div>
            <div class="card-row">
              <h4>Task</h4>
              <p>{{ item.question }}</p>
            </div>
            <div class="card-row">
              <h4>Answer</h4>
              <p>{{ item.answer }}</p>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "scavenger-hunts",
  components: { Logo },
  data() {
    return {
      scavengerHunts: [],
      showingScavengerHunts: "ALL",
    };
  },
  created() {
    this.fetchSh("ALL");
  },
  methods: {
    fetchSh(showing = null) {
      if (showing == null) {
        this.$http
          .get("/api/sh/get-all")
          .then((res) => {
            this.scavengerHunts = res.data;
          })
          .catch((err) => console.log(err));
      } else {
        if (showing == "ALL") {
          this.$http
            .get("/api/sh/get-all")
            .then((res) => {
              this.scavengerHunts = res.data;
            })
            .catch((err) => console.log(err));
        } else if (showing == "ACTIVE") {
          this.$http
            .get("/api/sh/get-status", { params: { status: true } })
            .then((res) => {
              this.scavengerHunts = res.data;
            })
            .catch((err) => console.log(err));
        } else if (showing == "INACTIVE") {
          this.$http
            .get("/api/sh/get-status", { params: { status: false } })
            .then((res) => {
              this.scavengerHunts = res.data;
            })
            .catch((err) => console.log(err));
        }
      }
    },
    logoClicked() {
      switch (this.showingScavengerHunts) {
        case "ALL":
          this.showingScavengerHunts = "ACTIVE";
          break;
        case "ACTIVE":
          this.showingScavengerHunts = "INACTIVE";
          break;
        case "INACTIVE":
          this.showingScavengerHunts = "ALL";
          break;
        default:
          this.showingScavengerHunts = "ALL";
          break;
      }
      this.fetchSh(this.showingScavengerHunts);
    },
    updateStatus(shId, status) {
      this.$http
        .put("/api/sh/update-status", { shId: shId, status: status })
        .then(() => {})
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
h4 {
  margin: 0;
}
.box-card {
  margin: 0.5rem;
  h3 {
    margin: 0;
    display: inline;
  }
  .header {
    padding: 0;
  }
  .text-button {
    padding: 0;
  }
}
.card-row {
  margin-bottom: 0.5rem;
  h4 {
    display: inline;

    margin-right: 0.5rem;
  }
  p {
    display: inline;
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>

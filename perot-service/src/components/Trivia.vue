<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo
        primary="Trivia"
        :secondary="showingTrivia"
        style="text-align: center; font-size: 200%;"
        :logoButton="true"
        @logo-clicked="logoClicked"
      ></Logo>
    </div>
    <div style="display:inline">
      <el-button
        style="margin-left:.5rem"
        @click="
          $router
            .push({ name: 'trivia-form', params: { action: 'create' } })
            .catch(() => {})
        "
      >
        <i class="el-icon-plus" style="margin-right: .5rem"></i>Add a new Trivia
      </el-button>
      <el-dropdown trigger="click">
        <el-button style="margin-left:.5rem">
          <i class="el-icon-s-unfold" style="margin-right: .5rem"></i>
          Show
          {{ showingTrivia }}
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="open-sans">
            <el-button type="text" @click="show('ALL')">All</el-button>
          </el-dropdown-item>
          <el-dropdown-item class="open-sans">
            <el-button type="text" @click="show('FEATURED')"
              >Featured</el-button
            >
          </el-dropdown-item>
          <el-dropdown-item class="open-sans">
            <el-button type="text" @click="show('OTHERS')">Others</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- Trivia cards -->
    <el-card class="box-card" v-for="(t, index) in trivia" :key="index">
      <!-- Trivia card header -->
      <div slot="header" class="clearfix header">
        <div>
          <el-tag effect="dark"
            ><h3>{{ t.exhibitName }}</h3></el-tag
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            class="text-button"
            @click="
              $router.push({
                name: 'trivia-form',
                params: { action: 'modify', tId: t.tId },
              })
            "
          >
            <p style="display: inline; margin: 0 .5rem;">Modify</p>
            <i class="el-icon-right"></i>
          </el-button>
          <el-switch
            style="float: right; marign: 0 1rem;"
            v-model="t.status"
            @change="updateStatus(t.tId, t.status)"
          ></el-switch>
        </div>
      </div>
      <div class="card-row">
        <h4>Trivia ID</h4>
        <p>{{ t.tId }} {{ " " }}</p>
        <el-tag>{{ t.subExhibitName }}</el-tag>
      </div>
      <div class="card-row">
        <h4>Question</h4>
        <p>{{ t.question }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "trivia",
  components: { Logo },
  data() {
    return {
      trivia: [],
      showingTrivia: "ALL",
    };
  },
  created() {
    this.fetchTrivia("ALL");
  },
  methods: {
    fetchTrivia(showing = null) {
      if (showing == null) {
        this.$http
          .get("/api/trivia/get-all")
          .then((res) => {
            this.trivia = res.data;
          })
          .catch((err) => console.log(err));
      } else {
        if (showing == "ALL") {
          this.$http
            .get("/api/trivia/get-all")
            .then((res) => {
              this.trivia = res.data;
            })
            .catch((err) => console.log(err));
        } else if (showing == "ACTIVE") {
          this.$http
            .get("/api/trivia/get-status", { params: { status: true } })
            .then((res) => {
              this.trivia = res.data;
            })
            .catch((err) => console.log(err));
        } else if (showing == "INACTIVE") {
          this.$http
            .get("/api/trivia/get-status", { params: { status: false } })
            .then((res) => {
              this.trivia = res.data;
            })
            .catch((err) => console.log(err));
        }
      }
    },
    logoClicked() {
      switch (this.showingTrivia) {
        case "ALL":
          this.showingTrivia = "ACTIVE";
          break;
        case "ACTIVE":
          this.showingTrivia = "INACTIVE";
          break;
        case "INACTIVE":
          this.showingTrivia = "ALL";
          break;
        default:
          this.showingTrivia = "ALL";
          break;
      }
      this.fetchTrivia(this.showingTrivia);
    },
    updateStatus(tId, status) {
      this.$http
        .put("/api/trivia/update-status", { tId: tId, status: status })
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

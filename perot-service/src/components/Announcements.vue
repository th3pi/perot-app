
<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo secondary="Announcements" style="text-align: center; font-size: 200%;"></Logo>
    </div>
    <div style="display:inline">
      <el-button
        style="margin-left:.5rem"
        @click="
          $router
            .push({ name: 'announcement-form', params: { action: 'create' } })
            .catch(() => {})
        "
      >
        <i class="el-icon-plus" style="margin-right: .5rem"></i>Add a new
        Announcement
      </el-button>
    </div>
    <!-- Exhibit cards -->
    <el-card class="box-card" v-for="(announcement, index) in announcements" :key="index">
      <!-- Exhibit card header -->
      <div slot="header" class="clearfix header">
        <div>
          <el-tag effect="dark">
            <h3>{{ announcement.id }}</h3>
          </el-tag>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            class="text-button"
            @click="
              $router.push({
                name: 'announcement-form',
                params: { action: 'modify', id: announcement.id },
              })
            "
          >
            <p style="display: inline; margin: 0 .5rem;">Modify</p>
            <i class="el-icon-right"></i>
          </el-button>
          <el-switch
            style="float: right; marign: 0 1rem;"
            v-model="announcement.status"
            @change="updateStatus(announcement.id, announcement.status)"
          ></el-switch>
        </div>
      </div>

      <div class="card-row">
        <h4>Title</h4>
        <p>{{ announcement.title }}</p>
      </div>
      <div class="card-row">
        <h4>Description</h4>
        <p>{{ announcement.description }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "announcements",
  components: {
    Logo,
  },
  data() {
    return {
      announcements: [],
    };
  },
  created() {
    this.fetchAnnouncements();
  },
  methods: {
    fetchAnnouncements(showing = null) {
      if (showing == null) {
        this.$http
          .get("/sp/get-announcements")
          .then((res) => {
            this.announcements = res.data;
          })
          .catch((err) => console.log(err));
      } else {
        this.$http
          .get("/sp/get-announcements")
          .then((res) => {
            this.announcements = res.data;
          })
          .catch((err) => console.log(err));
      }
    },
    updateStatus(id, status) {
      this.$http
        .put("/sp/update-announcement-status", { id: id, status: status })
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

.add-button {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0;
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

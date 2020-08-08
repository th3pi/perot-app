<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo
        primary="Announcement"
        :secondary="$route.params.action == 'create' ? 'ADD' : 'MODIFY'"
        style="text-align: center; font-size: 200%;"
      ></Logo>
    </div>
    <el-form ref="form" :model="announcement" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="announcement.title" placeholder="You won't believe what we are doing"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          type="textarea"
          v-model="announcement.description"
          placeholder="e.g We are taking a break until 2030"
        ></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="announcement.id" placeholder="e.g ann-1" :disabled="action == 'modify'"></el-input>
      </el-form-item>
      <el-form-item label="Image URL">
        <el-input v-model="announcement.image" placeholder="e.g https://imgur.com/coolPicture.jpg"></el-input>
      </el-form-item>
      <el-form-item label="Status">
        <el-switch v-model="announcement.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button v-if="action == 'create'" type="primary" @click="onAdd">Add</el-button>
        <el-button v-if="action == 'modify'" type="primary" @click="onUpdate">Update</el-button>
        <el-button @click="onClear">Clear</el-button>
        <el-button type="text" @click="goBack">
          <i class="el-icon-back" style="margin-right: .5rem"></i>Back to
          Announcements
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "announcements-form",
  components: { Logo },
  props: {
    action: String,
    id: String,
  },
  created() {
    document.title = "Announcement - Add";

    if (this.action == "modify") {
      this.fetchAnnouncementToModify();
      document.title = "Announcement - Modify";
    }
  },
  data() {
    return {
      announcement: {
        id: null,
        title: null,
        description: null,
        image: null,
      },
    };
  },
  methods: {
    fetchAnnouncementToModify() {
      this.$http
        .get("/sp/get-announcement", {
          params: {
            name: this.id,
          },
        })
        .then((res) => (this.announcement = res.data))
        .catch((err) => console.log(err));
    },
    onAdd() {
      const h = this.$createElement;

      this.$http
        .post("/sp/create-announcement", {
          id: this.announcement.id,
          title: this.announcement.title,
          description: this.announcement.description,
          image: this.announcement.image,
          status: this.announcement.status,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Added " + this.announcement.id
            ),
          });
        })
        .catch(() => {
          this.$notify({
            title: "Failed",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: red;" },
              "Couldn't add " + this.announcement.id
            ),
          });
        });
    },
    onUpdate() {
      const h = this.$createElement;

      this.$http
        .put("/sp/update-announcement", {
          id: this.announcement.id,
          title: this.announcement.title,
          description: this.announcement.description,
          image: this.announcement.image,
          status: this.announcement.status,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Updated " + this.announcement.id
            ),
          });
        })
        .catch(() => {
          this.$notify({
            title: "Failed",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: red;" },
              "Couldn't update " + this.announcement.id
            ),
          });
        });
    },
    onClear() {
      this.announcement = {
        id: null,
        title: null,
        description: null,
        image: null,
      };
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.open-sans {
  font-family: "Open Sans", sans-serif;
}
</style>

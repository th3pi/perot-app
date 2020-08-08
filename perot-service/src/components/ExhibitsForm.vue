<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo
        primary="Exhibit"
        :secondary="$route.params.action == 'create' ? 'ADD' : 'MODIFY'"
        style="text-align: center; font-size: 200%;"
      ></Logo>
    </div>
    <el-form ref="form" :model="exhibit" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="exhibit.title" placeholder="Cool Dinosaurus Exhibit"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          type="textarea"
          v-model="exhibit.description"
          placeholder="e.g Come to this exhibit. We have nice dinosaurs"
        ></el-input>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="exhibit.name" placeholder="e.g tbp-1" :disabled="action == 'modify'"></el-input>
      </el-form-item>
      <el-form-item label="Image URL">
        <el-input v-model="exhibit.image" placeholder="e.g https://imgur.com/coolPicture.jpg"></el-input>
      </el-form-item>
      <el-form-item label="Featured">
        <el-switch v-model="exhibit.featured"></el-switch>
      </el-form-item>
      <el-form-item label="Location">
        <el-select v-model="exhibit.location" placeholder="Exhibit floor">
          <el-option class="open-sans" label="Level 1" value="1"></el-option>
          <el-option class="open-sans" label="Level 2" value="2"></el-option>
          <el-option class="open-sans" label="Level 3" value="3"></el-option>
          <el-option class="open-sans" label="Level 4" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Age group">
        <el-select v-model="exhibit.ages" placeholder="e.g 3-9">
          <el-option label="3 - 9" value="3-9" class="open-sans"></el-option>
          <el-option label="10 - 16" value="10-16" class="open-sans"></el-option>
          <el-option label="17+" value="17+" class="open-sans"></el-option>
          <el-option label="All" value="0-99" class="open-sans"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Focus">
        <el-input v-model="exhibit.focus" placeholder="e.g Engineering"></el-input>
      </el-form-item>
      <el-form-item label="Active">
        <el-switch v-model="exhibit.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button v-if="action == 'create'" type="primary" @click="onAdd">Add</el-button>
        <el-button v-if="action == 'modify'" type="primary" @click="onUpdate">Update</el-button>
        <el-button @click="onClear">Clear</el-button>
        <el-button type="text" @click="goBack">
          <i class="el-icon-back" style="margin-right: .5rem"></i>Back to
          Exhibits
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "exhibits-form",
  components: { Logo },
  props: {
    action: String,
    exhibitName: String,
  },
  created() {
    document.title = "Exhibits - Add";

    if (this.action == "modify") {
      this.fetchExhibitToModify();
      document.title = "Exhibits - Modify";
    }
  },
  data() {
    return {
      exhibit: {
        title: null,
        description: null,
        name: null,
        featured: false,
        location: null,
        ages: null,
        focus: null,
        status: false,
        subexhibits: [],
        image: null,
      },
    };
  },
  methods: {
    fetchExhibitToModify() {
      this.$http
        .get("/sp/exb/get-exhibit", {
          params: {
            name: this.exhibitName,
          },
        })
        .then((res) => (this.exhibit = res.data))
        .catch((err) => console.log(err));
    },
    onAdd() {
      const h = this.$createElement;

      this.$http
        .post("/sp/exb/create", {
          title: this.exhibit.title,
          description: this.exhibit.description,
          name: this.exhibit.name,
          featured: this.exhibit.featured,
          location: this.exhibit.location,
          ages: this.exhibit.ages,
          focus: this.exhibit.focus,
          status: this.exhibit.status,
          image: this.exhibit.image,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Added " + this.exhibit.name
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
              "Couldn't add " + this.exhibit.name
            ),
          });
        });
    },
    onUpdate() {
      const h = this.$createElement;

      this.$http
        .put("/sp/exb/update", {
          title: this.exhibit.title,
          description: this.exhibit.description,
          name: this.exhibit.name,
          featured: this.exhibit.featured,
          location: this.exhibit.location,
          ages: this.exhibit.ages,
          focus: this.exhibit.focus,
          status: this.exhibit.status,
          image: this.exhibit.image,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Updated " + this.exhibit.name
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
              "Couldn't update " + this.exhibit.name
            ),
          });
        });
    },
    onClear() {
      this.exhibit = {
        title: null,
        description: null,
        name: null,
        featured: false,
        location: null,
        ages: null,
        focus: null,
        status: false,
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

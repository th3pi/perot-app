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
    <el-form ref="form" :model="subexhibit" label-width="120px">
      <el-form-item label="Title">
        <el-input
          v-model="subexhibit.title"
          placeholder="Tyrannosaurus Rex Exhibit"
        ></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          type="textarea"
          v-model="subexhibit.description"
          placeholder="e.g Check out our full collection of T-Rex bones!"
        ></el-input>
      </el-form-item>
      <el-form-item label="Name">
        <el-input
          v-model="subexhibit.name"
          placeholder="e.g tbp-1"
          :disabled="action == 'modify'"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="action == 'create'" type="primary" @click="onAdd"
          >Add</el-button
        >
        <el-button v-if="action == 'modify'" type="primary" @click="onUpdate"
          >Update</el-button
        >
        <el-button @click="onClear">Clear</el-button>
        <el-button type="text" @click="goBack">
          <i class="el-icon-back" style="margin-right: .5rem"></i>Back to
          Exhibit Halls
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "subexhibits-form",
  components: { Logo },
  props: {
    action: String,
    exhibitName: String,
  },
  created() {
    document.title = "Exhibits - Add";
    this.fetchExhibitToModify();

    if (this.action == "modify") {
      document.title = "Exhibits - Modify";
    }
  },
  data() {
    return {
      subexhibit: {
        title: null,
        description: null,
        name: null
      },
    };
  },
  methods: {
    fetchExhibitToModify() {
      this.$http
        .get("/sp/exb/get-exhibit", {
          params: {
            name: this.$route.params.exhibitName,
          },
        })
        .then((res) => (this.exhibit = res.data))
        .catch((err) => console.log(err));
    },
    onAdd() {
      this.$http
        .put("/sp/exb/add-subexb", {
          exhibitName: this.exhibit.name,
          subexhibitName: this.subexhibit.name,
          title: this.subexhibit.title,
          description: this.subexhibit.description,
        })
        .then(() => {})
        .catch((err) => console.log(err));
    },
    onUpdate() {
      this.$http
        .put("/sp/exb/update-subexb", {
          exhibitName: this.exhibit.name,
          title: this.subexhibit.title,
          description: this.subexhibit.description,
          subexhibitName: this.subexhibit.name
        })
        .then(() => {})
        .catch((err) => console.log(err));
    },
    onClear() {
      this.subexhibit = {
        title: null,
        description: null,
        name: null,
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

<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo
        primary="FAQ"
        :secondary="$route.params.action == 'create' ? 'ADD' : 'MODIFY'"
        style="text-align: center; font-size: 200%;"
      ></Logo>
    </div>
    <el-form ref="form" :model="faq" label-width="120px">
      <el-form-item label="Question">
        <el-input v-model="faq.question" placeholder="Where is the place?"></el-input>
      </el-form-item>
      <el-form-item label="Answer">
        <el-input
          type="textarea"
          v-model="faq.answer"
          placeholder="e.g Go right, then make a left then upstairs then downstairs"
        ></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="faq.id" placeholder="e.g faq-dinosaur-1" :disabled="action == 'modify'"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="action == 'create'" type="primary" @click="onAdd">Add</el-button>
        <el-button v-if="action == 'modify'" type="primary" @click="onUpdate">Update</el-button>
        <el-button @click="onClear">Clear</el-button>
        <el-button type="text" @click="goBack">
          <i class="el-icon-back" style="margin-right: .5rem"></i>Back to
          FAQs
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "faq-form",
  components: { Logo },
  props: {
    action: String,
    id: String,
  },
  created() {
    document.title = "FAQ - Add";

    if (this.action == "modify") {
      this.fetchFaqToModify();
      document.title = "FAQ - Modify";
    }
  },
  data() {
    return {
      faq: {
        question: null,
        answer: null,
        id: null,
      },
    };
  },
  methods: {
    fetchFaqToModify() {
      this.$http
        .get("/sp/get-faq", {
          params: {
            name: this.id,
          },
        })
        .then((res) => (this.faq = res.data))
        .catch((err) => console.log(err));
    },
    onAdd() {
      const h = this.$createElement;

      this.$http
        .post("/sp/create-faq", {
          id: this.faq.id,
          question: this.faq.question,
          answer: this.faq.answer,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h("p", { style: "color: green;" }, "Added " + this.faq.id),
          });
        })
        .catch(() => {
          this.$notify({
            title: "Failed",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: red;" },
              "Couldn't add " + this.faq.id
            ),
          });
        });
    },
    onUpdate() {
      const h = this.$createElement;

      this.$http
        .put("/sp/update-faq", {
          id: this.faq.id,
          question: this.faq.question,
          answer: this.faq.answer,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Updated " + this.faq.id
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
              "Couldn't update " + this.faq.id
            ),
          });
        });
    },
    onClear() {
      this.faq = {
        question: null,
        answer: null,
        id: null,
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

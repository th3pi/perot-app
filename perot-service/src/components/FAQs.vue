<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo secondary="FAQs" style="text-align: center; font-size: 200%;"></Logo>
    </div>
    <div style="display:inline">
      <el-button
        style="margin-left:.5rem"
        @click="
          $router
            .push({ name: 'faq-form', params: { action: 'create' } })
            .catch(() => {})
        "
      >
        <i class="el-icon-plus" style="margin-right: .5rem"></i>Add a new
        FAQ
      </el-button>
    </div>
    <!-- Exhibit cards -->
    <el-card class="box-card" v-for="(faq, index) in faqs" :key="index">
      <!-- Exhibit card header -->
      <div slot="header" class="clearfix header">
        <div>
          <el-tag effect="dark">
            <h3>{{ faq.id }}</h3>
          </el-tag>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            class="text-button"
            @click="
              $router.push({
                name: 'faq-form',
                params: { action: 'modify', id: faq.id },
              })
            "
          >
            <p style="display: inline; margin: 0 .5rem;">Modify</p>
            <i class="el-icon-right"></i>
          </el-button>
        </div>
      </div>

      <div class="card-row">
        <h4>Question</h4>
        <p>{{ faq.question }}</p>
      </div>
      <div class="card-row">
        <h4>Answer</h4>
        <p>{{ faq.answer }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "faqs",
  components: {
    Logo,
  },
  data() {
    return {
      faqs: [],
    };
  },
  created() {
    this.fetchFAQs();
  },
  methods: {
    fetchFAQs(showing = null) {
      if (showing == null) {
        this.$http
          .get("/sp/get-faqs")
          .then((res) => {
            this.faqs = res.data;
          })
          .catch((err) => console.log(err));
      } else {
        this.$http
          .get("/sp/exb/get-faqs")
          .then((res) => {
            this.faqs = res.data;
          })
          .catch((err) => console.log(err));
      }
    },
    onDelete(name, featured) {
      this.$http
        .put("/sp/exb/update-featured", { name: name, featured: featured })
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

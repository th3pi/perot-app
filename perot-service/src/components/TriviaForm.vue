<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo
        primary="Trivia"
        :secondary="$route.params.action == 'create' ? 'ADD' : 'MODIFY'"
        style="text-align: center; font-size: 200%;"
      ></Logo>
    </div>
    <el-form ref="form" :model="trivia" label-width="120px">
      <el-form-item label="Trivia ID">
        <el-input
          v-model="trivia.tId"
          placeholder="e.g space-trivia-1"
          :disabled="action == 'modify'"
        ></el-input>
      </el-form-item>
      <el-form-item label="Question">
        <el-input v-model="trivia.question" placeholder="e.g Question?"></el-input>
      </el-form-item>
      <el-form-item label="Responses">
        <el-input v-model="trivia.responses[0]" placeholder="First response"></el-input>
        <el-input
          v-model="trivia.responses[1]"
          placeholder="Second response"
          style="margin-top: .5rem"
        ></el-input>
        <br />
        <el-input
          v-model="trivia.responses[2]"
          placeholder="Third response"
          style="margin-top: .5rem"
        ></el-input>
        <br />
        <el-input
          v-model="trivia.responses[3]"
          placeholder="Fourth response"
          style="margin-top: .5rem"
        ></el-input>
        <br />
      </el-form-item>
      <el-form-item label="Answer">
        <fade-transition mode="out-in">
          <div
            v-if="
              trivia.responses[0] != null &&
                trivia.responses[1] != null &&
                trivia.responses[0] != '' &&
                trivia.responses[1] != ''
            "
            key="responsesAdded"
          >
            <el-select
              v-model="trivia.correct"
              placeholder="Space"
              @change="fetchSubExhibits(trivia.exhibitName)"
            >
              <el-option
                class="open-sans"
                v-for="(response, index) in trivia.responses"
                :key="index"
                :label="response"
                :value="response"
              ></el-option>
            </el-select>
          </div>
          <div v-else>
            <el-input
              v-model="trivia.correct"
              placeholder="Add some responses first"
              key="noResponses"
              disabled
            ></el-input>
          </div>
        </fade-transition>
      </el-form-item>
      <el-form-item label="Exhibit">
        <el-select
          v-model="trivia.exhibitName"
          placeholder="Space"
          @change="fetchSubExhibits(trivia.exhibitName)"
        >
          <el-option
            class="open-sans"
            v-for="(exhibit, index) in exhibits"
            :key="index"
            :label="exhibit.name"
            :value="exhibit.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Sub-Exhibit">
        <el-select
          v-model="trivia.subExhibitName"
          placeholder="sub-tb-1"
          :disabled="trivia.exhibitName === null"
        >
          <el-option
            class="open-sans"
            v-for="(subExhibit, index) in subExhibits"
            :key="index"
            :label="subExhibit.name"
            :value="subExhibit.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Sub-Exhibit Title">
        <el-select
          v-model="trivia.subExhibitTitle"
          placeholder="Space Rocks"
          :disabled="trivia.subExhibitName === null"
        >
          <el-option
            class="open-sans"
            v-for="(subExhibit, index) in subExhibits"
            :key="index"
            :label="subExhibit.title"
            :value="subExhibit.title"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Active">
        <el-switch v-model="trivia.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button v-if="action == 'create'" type="primary" @click="onAdd">Add</el-button>
        <el-button v-if="action == 'modify'" type="primary" @click="onUpdate">Update</el-button>
        <el-button @click="onClear">Clear</el-button>
        <el-button type="text" @click="goBack">
          <i class="el-icon-back" style="margin-right: .5rem"></i>Back to Trivia
          list
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { FadeTransition } from "vue2-transitions";

import Logo from "@/components/Logo";
export default {
  name: "trivia-form",
  components: { Logo, FadeTransition },
  props: {
    action: String,
    tId: String,
  },
  created() {
    this.fetchTrivia();
    document.title = "Trivia - Add";

    if (this.action == "modify") {
      document.title = "Trivia - Modify";
      this.fetchTriviaToModify();
    }
  },
  data() {
    return {
      exhibits: [],
      subExhibits: [],
      trivia: {
        tId: null,
        question: null,
        correct: null,
        subExhibitTitle: null,
        subExhibitName: null,
        status: null,
        exhibitName: null,
        responses: [null, null, null, null],
      },
    };
  },
  methods: {
    fetchTrivia() {
      this.$http
        .get("/sp/exb/get-all")
        .then((res) => {
          this.exhibits = res.data;
        })
        .catch((err) => console.log(err));
    },
    fetchSubExhibits(exhibitName) {
      this.$http
        .get("/sp/exb/get-subs", { params: { exhibitName: exhibitName } })
        .then((res) => {
          this.subExhibits = res.data[0].subExhibits;
        })
        .catch(() => {});
    },
    fetchTriviaToModify() {
      this.$http
        .get("/api/trivia/get", {
          params: {
            tId: this.tId,
          },
        })
        .then((res) => (this.trivia = res.data))
        .catch((err) => console.log(err));
    },
    onAdd() {
      const h = this.$createElement;

      this.$http
        .post("/api/trivia/create", {
          tId: this.trivia.tId,
          question: this.trivia.question,
          responses: this.trivia.responses,
          correct: this.trivia.correct,
          exhibitName: this.trivia.exhibitName,
          subExhibitTitle: this.trivia.subExhibitTitle,
          subExhibitName: this.trivia.subExhibitName,
          status: this.trivia.status,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Added " + this.trivia.tId
            ),
          });
          this.onClear();
        })
        .catch(() => {
          this.$notify({
            title: "Failed",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: red;" },
              "Couldn't add " + this.trivia.tId
            ),
          });
        });
    },
    onUpdate() {
      const h = this.$createElement;

      this.$http
        .put("/api/trivia/update", {
          tId: this.trivia.tId,
          question: this.trivia.question,
          correct: this.trivia.correct,
          responses: this.trivia.responses,
          exhibitName: this.trivia.exhibitName,
          subExhibitTitle: this.trivia.subExhibitTitle,
          subExhibitName: this.trivia.subExhibitName,
          status: this.trivia.status,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Updated " + this.trivia.tId
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
              "Couldn't update " + this.trivia.tId
            ),
          });
        });
    },
    onClear() {
      this.trivia = {
        tId: null,
        question: null,
        responses: [null, null, null, null],
        correct: null,
        subExhibitName: null,
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

.notification {
  font-family: "Open Sans", sans-serif;
}
</style>

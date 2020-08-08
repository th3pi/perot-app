<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo
        primary="Scavenger Hunt"
        :secondary="$route.params.action == 'create' ? 'ADD' : 'MODIFY'"
        style="text-align: center; font-size: 150%;"
      ></Logo>
    </div>
    <el-form ref="form" :model="sh" label-width="120px">
      <el-form-item label="SH ID">
        <el-input
          v-model="sh.shId"
          placeholder="e.g space-sh-1"
          :disabled="action == 'modify'"
        ></el-input>
      </el-form-item>
      <el-form-item label="Exhibit">
        <el-select v-model="sh.exhibitName" placeholder="sp-1">
          <el-option
            class="open-sans"
            v-for="(exhibit, index) in exhibits"
            :key="index"
            :label="exhibit.name"
            :value="exhibit.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Active">
        <el-switch v-model="sh.status"></el-switch>
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
          Scavenger Hunt list
        </el-button>
      </el-form-item>
    </el-form>

    <!-- Items sections -->

    <collapse-transition>
      <el-tabs
        v-model="activeTab"
        class="item-tabs"
        v-if="action !== 'create' || added"
      >
        <!-- Add items -->

        <el-tab-pane label="Add Item" name="add">
          <el-form ref="form" :model="item" label-width="120px">
            <el-form-item label="Name">
              <el-input v-model="item.name" placeholder="e.g Ruby"></el-input>
            </el-form-item>
            <el-form-item label="Relation">
              <el-input
                v-model="item.connection"
                placeholder="Red color"
              ></el-input>
            </el-form-item>
            <el-form-item label="Location">
              <el-input
                v-model="item.location"
                placeholder="Space Exhibit"
              ></el-input>
            </el-form-item>
            <el-form-item label="Question">
              <el-input
                v-model="item.question"
                placeholder="Where is the Rocket?"
              ></el-input>
            </el-form-item>
            <el-form-item label="Hints">
              <el-input
                v-model="item.hint1"
                placeholder="First hint"
              ></el-input>
              <el-input
                v-model="item.hint2"
                placeholder="Second hint"
              ></el-input>
              <el-input
                v-model="item.hint3"
                placeholder="Third hint"
              ></el-input>
            </el-form-item>
            <el-form-item label="Answer">
              <el-input v-model="item.answer" placeholder="In Space"></el-input>
            </el-form-item>
            <el-form-item>
              <vue-qrcode :value="item.answer" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onAddItem">Add Item</el-button>
              <el-button @click="onClear">Clear</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- All items list -->

        <el-tab-pane label="Items List" name="list">
          <!-- Scavenger Hunt cards -->
          <el-card class="box-card" v-for="(i, index) in sh.items" :key="index">
            <!-- Scavenger Hunt card header -->
            <div slot="header" class="clearfix header">
              <div>
                <h3>{{ i.name }}</h3>
                <el-divider direction="vertical"></el-divider>
                <fade-transition mode="out-in">
                  <el-button
                    v-if="i.modify == null || i.modify == false"
                    type="text"
                    class="text-button"
                    @click="$set(i, 'modify', true)"
                    key="modify"
                  >
                    <p style="display: inline; margin: 0 .5rem;">Modify</p>
                    <i class="el-icon-right"></i>
                  </el-button>
                  <el-button
                    v-if="i.modify == true"
                    type="text"
                    class="text-button"
                    @click="onUpdateItem(i)"
                    key="done"
                  >
                    <p style="display: inline; margin: 0 .5rem;">Update</p>
                    <i class="el-icon-check"></i>
                  </el-button>
                </fade-transition>
                <el-button
                  type="text"
                  class="text-button"
                  style="display: inline; float:right; margin: 0 .5rem;"
                  @click="onDeleteItem(i.name)"
                >
                  <i class="el-icon-close"></i>
                </el-button>
              </div>
            </div>
            <collapse-transition mode="out-in">
              <div v-if="i.modify == null || i.modify == false" key="list">
                <div class="card-row">
                  <h4>Located at</h4>
                  <p>{{ i.location }}</p>
                </div>
                <div class="card-row">
                  <h4>Based On</h4>
                  <p>{{ i.connection }}</p>
                </div>
                <div class="card-row">
                  <h4>Question</h4>
                  <p>{{ i.question }}</p>
                </div>
                <div class="card-row">
                  <h4>Answer</h4>
                  <p>{{ i.answer }}</p>
                </div>
              </div>

              <!-- List item card converts into a form to modify -->

              <div v-if="i.modify == true" key="form">
                <el-form ref="form" :model="i" label-width="120px">
                  <el-form-item label="Name">
                    <el-input
                      v-model="i.name"
                      placeholder="e.g Ruby"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Relation">
                    <el-input
                      v-model="i.connection"
                      placeholder="Red color"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Location">
                    <el-input
                      v-model="i.location"
                      placeholder="Space Exhibit"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Question">
                    <el-input
                      v-model="i.question"
                      placeholder="Where is the Rocket?"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Hints">
                    <el-input
                      v-model="i.hints[0]"
                      placeholder="First hint"
                    ></el-input>
                    <el-input
                      v-model="i.hints[1]"
                      placeholder="Second hint"
                    ></el-input>
                    <el-input
                      v-model="i.hints[2]"
                      placeholder="Third hint"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Answer">
                    <el-input
                      v-model="i.answer"
                      placeholder="In Space"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <vue-qrcode :value="i.answer" />
                  </el-form-item>
                </el-form>
              </div>
            </collapse-transition>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </collapse-transition>
  </div>
</template>

<script>
import VueQrcode from "vue-qrcode";
import { FadeTransition, CollapseTransition } from "vue2-transitions";

import Logo from "@/components/Logo";
export default {
  name: "sh-form",
  components: { Logo, CollapseTransition, FadeTransition, VueQrcode },
  props: {
    action: String,
    shId: String,
  },
  created() {
    this.fetchExhibits();
    document.title = "Scavenger Hunt - Add";
    if (this.action == "modify") {
      document.title = "Scavenger Hunt - Modify";
      this.fetchShToModify();
      this.activeTab = "list";
    }
  },
  data() {
    return {
      exhibits: [],
      sh: {
        shId: null,
        items: [],
        exhibitName: null,
        status: null,
      },
      item: {
        shId: null,
        name: null,
        connection: null,
        location: null,
        question: null,
        hint1: null,
        hint2: null,
        hint3: null,
        answer: null,
      },
      activeTab: "add",
      added: false,
    };
  },
  methods: {
    fetchExhibits() {
      this.$http
        .get("/sp/exb/get-all")
        .then((res) => (this.exhibits = res.data))
        .catch((err) => console.log(err));
    },
    fetchShToModify() {
      this.$http
        .get("/api/sh/get", {
          params: {
            shId: this.shId,
          },
        })
        .then((res) => {
          this.sh = res.data;
          console.log(this.sh);
        })
        .catch((err) => console.log(err));
    },
    onAdd() {
      const h = this.$createElement;

      this.$http
        .post("/api/sh/create", {
          shId: this.sh.shId,
          exhibitName: this.sh.exhibitName,
          status: this.sh.status,
        })
        .then(() => {
          this.added = true;
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Added " + this.sh.shId
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
              "Couldn't add " + this.sh.shId
            ),
          });
        });
    },
    onUpdate() {
      const h = this.$createElement;

      this.$http
        .put("/api/sh/update", {
          shId: this.sh.shId,
          question: this.sh.question,
          correct: this.sh.correct,
          exhibitName: this.sh.exhibitName,
          status: null,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Updated " + this.sh.shId
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
              "Couldn't update " + this.sh.shId
            ),
          });
        });
    },
    onClear() {
      this.sh = {
        sh: {
          shId: null,
          question: null,
          correct: null,
          subExhibitName: null,
        },
      };
    },
    onAddItem() {
      const h = this.$createElement;

      this.$http
        .put("/api/sh/add-item", {
          shId: this.sh.shId,
          name: this.item.name,
          connection: this.item.connection,
          location: this.item.location,
          question: this.item.question,
          hints: [this.item.hint1, this.item.hint2, this.item.hint3],
          answer: this.item.answer,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Added " + this.item.name
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
              "Couldn't add " + this.item.name
            ),
          });
        });
    },
    onUpdateItem(item) {
      const h = this.$createElement;
      item.modify = false;
      this.$http
        .put("/api/sh/update-item", {
          shId: this.sh.shId,
          name: item.name,
          connection: item.connection,
          location: item.location,
          question: item.question,
          hints: item.hints,
          answer: item.answer,
        })
        .then(() => {
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Updated item " + item.name
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
              "Couldn't update " + item.name
            ),
          });
        });
    },
    onDeleteItem(name) {
      const h = this.$createElement;
      this.$http
        .put("/api/sh/delete-item", { shId: this.sh.shId, name: name })
        .then(() => {
          this.$notify({
            title: "Deleted",
            customClass: "notification",
            message: h("p", { style: "color: red;" }, "Removed " + name),
          });
        })
        .catch(() => {
          this.$notify({
            title: "Failed",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: red;" },
              "Couldn't remove " + name
            ),
          });
        });
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

.item-tabs {
  margin: 0.5rem;
}
</style>

<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo
        primary="Exhibit Halls"
        :secondary="showingExhibits"
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
            .push({ name: 'exhibits-form', params: { action: 'create' } })
            .catch(() => {})
        "
      >
        <i class="el-icon-plus" style="margin-right: .5rem"></i>Add a new
        Exhibit Hall
      </el-button>
      <el-dropdown trigger="click">
        <el-button style="margin-left:.5rem">
          <i class="el-icon-s-unfold" style="margin-right: .5rem"></i>
          Show
          {{ showingExhibits }}
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="open-sans">
            <el-button type="text" @click="show('ALL')">All</el-button>
          </el-dropdown-item>
          <el-dropdown-item class="open-sans">
            <el-button type="text" @click="show('FEATURED')">Featured</el-button>
          </el-dropdown-item>
          <el-dropdown-item class="open-sans">
            <el-button type="text" @click="show('OTHERS')">Others</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- Exhibit cards -->
    <el-card class="box-card" v-for="(exhibit, index) in exhibits" :key="index">
      <!-- Exhibit card header -->
      <div slot="header" class="clearfix header">
        <div>
          <el-tag effect="dark">
            <h3>{{ exhibit.name }}</h3>
          </el-tag>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            class="text-button"
            @click="
              $router.push({
                name: 'exhibits-form',
                params: { action: 'modify', exhibitName: exhibit.name },
              })
            "
          >
            <p style="display: inline; margin: 0 .5rem;">Modify</p>
            <i class="el-icon-right"></i>
          </el-button>
          <el-switch
            style="float: right; marign: 0 1rem;"
            v-model="exhibit.featured"
            @change="updateFeatured(exhibit.name, exhibit.featured)"
          ></el-switch>
        </div>
      </div>

      <div class="card-row">
        <h4>Title</h4>
        <p>{{ exhibit.title }}</p>
      </div>
      <div class="card-row">
        <h4>Description</h4>
        <p>{{ exhibit.description }}</p>
      </div>

      <!-- Sub-Exhibits section -->
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <h4>Sub-Exhibits</h4>
          </template>
          <el-card class="box-card" v-for="(subExb, index) in exhibit.subExhibits" :key="index">
            <div slot="header" class="clearfix header">
              <div>
                <h3>{{ subExb.name }}</h3>
                <el-divider direction="vertical"></el-divider>
                <fade-transition mode="out-in">
                  <el-button
                    v-if="subExb.modify == null || subExb.modify == false"
                    type="text"
                    class="text-button"
                    @click="$set(subExb, 'modify', true)"
                    key="modify"
                  >
                    <p style="display: inline; margin: 0 .5rem;">Modify</p>
                    <i class="el-icon-right"></i>
                  </el-button>
                  <el-button
                    v-if="subExb.modify == true"
                    type="text"
                    class="text-button"
                    @click="updateSubExhibit(exhibit.name, subExb)"
                    key="done"
                  >
                    <p style="display: inline; margin: 0 .5rem;">Update</p>
                    <i class="el-icon-check"></i>
                  </el-button>
                </fade-transition>
                <el-switch
                  v-model="subExb.status"
                  style="display: inline; float:right; margin: 0 .5rem;"
                ></el-switch>
              </div>
            </div>
            <collapse-transition mode="out-in">
              <div v-if="subExb.modify == null || subExb.modify == false" key="list">
                <div class="card-row">
                  <h4>Title</h4>
                  <p>{{ subExb.title }}</p>
                </div>
                <div class="card-row">
                  <h4>Description</h4>
                  <p>{{ subExb.description }}</p>
                </div>
              </div>
              <!-- List item card converts into a form to modify -->

              <div v-if="subExb.modify == true" key="form">
                <el-form ref="form" :model="subExb" label-width="120px">
                  <el-form-item label="Name">
                    <el-input v-model="subExb.name" placeholder="e.g Ruby"></el-input>
                  </el-form-item>
                  <el-form-item label="Relation">
                    <el-input v-model="subExb.title" placeholder="Red color"></el-input>
                  </el-form-item>
                  <el-form-item label="Location">
                    <el-input v-model="subExb.description" placeholder="Space Exhibit"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </collapse-transition>
          </el-card>
          <zoom-center-transition mode="out-in">
            <div class="add-button" v-if="!addSub" key="dont-add">
              <el-button class="subexb-button" @click="addSub = true">
                <i class="el-icon-plus" />
                <p style="display: inline; margin: 0 .5rem;">Add a new Sub-Exhibit</p>
              </el-button>
            </div>
            <div v-else key="add">
              <h4>Add Sub-Exhibit</h4>
              <el-card class="box-card">
                <el-form ref="form" :model="newSub" label-width="120px">
                  <el-form-item label="Name">
                    <el-input v-model="newSub.name" placeholder="e.g sub-tb-1"></el-input>
                  </el-form-item>
                  <el-form-item label="Title">
                    <el-input v-model="newSub.title" placeholder="The Sub-Dinosaur Exhibit"></el-input>
                  </el-form-item>
                  <el-form-item label="Description">
                    <el-input
                      v-model="newSub.description"
                      placeholder="An Exhibit for Sub-Dinosaurs"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onAdd(exhibit.name, newSub)">Add</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </zoom-center-transition>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import {
  FadeTransition,
  CollapseTransition,
  ZoomCenterTransition,
} from "vue2-transitions";
import Logo from "@/components/Logo";
export default {
  name: "exhibits",
  components: {
    Logo,
    CollapseTransition,
    FadeTransition,
    ZoomCenterTransition,
  },
  data() {
    return {
      exhibits: [],
      newSub: {
        name: null,
        title: null,
        description: null,
      },
      showingExhibits: "ALL",
      addSub: false,
    };
  },
  created() {
    this.fetchExhibits();
  },
  methods: {
    fetchExhibits(showing = null) {
      if (showing == null) {
        this.$http
          .get("/sp/exb/get-" + this.showingExhibits)
          .then((res) => {
            this.exhibits = res.data;
          })
          .catch((err) => console.log(err));
      } else {
        this.$http
          .get("/sp/exb/get-" + showing)
          .then((res) => {
            this.exhibits = res.data;
          })
          .catch((err) => console.log(err));
      }
    },
    updateFeatured(name, featured) {
      this.$http
        .put("/sp/exb/update-featured", { name: name, featured: featured })
        .then(() => {})
        .catch((err) => console.log(err));
    },
    updateSubExhibit(name, subExhibit) {
      const h = this.$createElement;
      this.$set(subExhibit, "modify", false);
      this.$http
        .put("/sp/exb/update-sub", {
          exhibitName: name,
          subExhibitName: subExhibit.name,
          title: subExhibit.title,
          description: subExhibit.description,
        })
        .then((res) => {
          console.log(res.data);
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Updated " + subExhibit.name
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
              "Couldn't update " + subExhibit.name
            ),
          });
        });
    },
    onAdd(name, subExhibit) {
      const h = this.$createElement;
      this.$http
        .put("/sp/exb/add-sub", {
          exhibitName: name,
          subExhibitName: subExhibit.name,
          title: subExhibit.title,
          description: subExhibit.description,
        })
        .then((res) => {
          console.log(res.data);
          this.$notify({
            title: "Success",
            customClass: "notification",
            message: h(
              "p",
              { style: "color: green;" },
              "Added " + subExhibit.name
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
              "Couldn't update " + subExhibit.name
            ),
          });
        });
    },
    show(showing) {
      this.showingExhibits = showing;
      this.fetchExhibits(showing);
    },
    logoClicked() {
      switch (this.showingExhibits) {
        case "ALL":
          this.showingExhibits = "FEATURED";
          break;
        case "FEATURED":
          this.showingExhibits = "OTHERS";
          break;
        case "OTHERS":
          this.showingExhibits = "ALL";
          break;
        default:
          this.showingExhibits = "ALL";
          break;
      }
      this.fetchExhibits();
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

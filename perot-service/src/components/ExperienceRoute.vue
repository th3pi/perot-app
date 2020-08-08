<template>
  <div>
    <!-- Page header -->
    <div class="page-header">
      <Logo
        primary="Experience"
        secondary="Route"
        style="text-align: center; font-size: 200%;"
      ></Logo>
    </div>
    <div style="display:inline">
      <fade-transition mode="out-in" group>
        <el-button
          style="margin-left:.5rem"
          type="primary"
          @click="onSave"
          v-if="saveState !== 'saved' && saveState !== 'saving'"
          key="save"
        >
          <i class="el-icon-check" style="margin-right: .5rem"></i>Save
        </el-button>
        <el-button
          style="margin-left:.5rem"
          type="default"
          disabled
          v-if="saveState === 'saving'"
          key="saving"
        >
          <i class="el-icon-loading" style="margin-right: .5rem"></i>Saving...
        </el-button>
        <el-button
          style="margin-left:.5rem"
          type="success"
          disabled
          v-if="saveState === 'saved'"
          key="saved"
        >
          <i class="el-icon-check" style="margin-right: .5rem"></i>Saved
        </el-button>
      </fade-transition>
      <!-- Exhibit cards -->
      <draggable :list="exhibits" @change="onMove">
        <el-card
          class="box-card"
          v-for="(exhibit, index) in exhibits"
          :key="index"
          @click="
            $router
              .push({
                name: 'exhibits-form',
                params: { action: 'modify', exhibitName: exhibit.name },
              })
              .catch(() => {})
          "
        >
          <!-- Exhibit card header -->
          <div
            class="clearfix header"
            style="display: flex; align-items: center"
          >
            <el-tag effect="dark"
              ><h3>{{ index + 1 }}</h3></el-tag
            >
            <div
              class="info"
              style="margin-left: .5rem; display: flex; justify-content: space-between; width: 100%"
            >
              <h4>{{ exhibit.title }}</h4>
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
                <p style="display: inline; margin: 0 .5rem; cursor:pointer">
                  Modify
                </p>
                <i class="el-icon-right"></i>
              </el-button>
            </div>
          </div>
        </el-card>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { FadeTransition } from "vue2-transitions";
import Logo from "@/components/Logo";
export default {
  name: "exhibits",
  components: {
    Logo,
    draggable,
    FadeTransition,
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
      saveState: null,
    };
  },
  created() {
    this.fetchExhibits();
  },
  methods: {
    fetchExhibits() {
      this.$http
        .get("/sp/exb/get-recommended")
        .then((res) => {
          this.exhibits = res.data;
        })
        .catch((err) => console.log(err));
    },
    onSave() {
      this.saveState = "saving";
      this.exhibits.forEach((exhibit, index) => {
        this.$http
          .put("/sp/exb/update-flow", {
            name: exhibit.name,
            flowIndex: index,
          })
          .then(() => {
            this.saveState = "saved";
          })
          .catch(() => {});
      });
    },
    onMove() {
      this.saveState = "save";
    },
  },
};
</script>

<style lang="scss">
h4 {
  margin: 0;
}
.box-card {
  cursor: grab;
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
.box-card:active {
  cursor: grabbing;
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

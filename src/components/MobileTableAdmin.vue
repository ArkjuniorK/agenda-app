<template>
  <div class="d-flex flex-column mb-3">
    <div class="tb-item d-flex px-4 py-2 align-center" :class="color">
      <span class="raleway font-weight-bold activity-name"> {{ nama }} </span>
      <v-spacer></v-spacer>
      <v-btn x-small fab icon @click="collapse = !collapse">
        <v-icon color="white" class="pa-1">mdi-plus</v-icon>
      </v-btn>
    </div>
    <div
      class="tb-detail px-4 d-flex flex-column pt-10 pb-4"
      :class="collapseTable"
    >
      <span class="lato mb-2">
        Hari/Tanggal:
        <span class="lato font-weight-bold"> {{ hari }} </span></span
      >
      <span class="lato mb-2">
        Waktu: <span class="lato font-weight-bold"> {{ waktu }} </span></span
      >
      <span class="lato mb-2">
        Pelaksana:
        <span class="lato font-weight-bold"> {{ pelaksana }} </span></span
      >
      <span class="lato mb-2">
        Tempat Kegiatan:
        <span class="lato font-weight-bold"> {{ tempat }} </span></span
      >
      <span class="lato mb-2">
        Pejabat:
        <span class="lato font-weight-bold"> {{ pejabat }} </span></span
      >
      <v-divider class="my-1"></v-divider>
      <div class="editable-btn d-flex align-center pt-2">
        <v-btn
          small
          depressed
          :color="icon"
          style="color:#e1ebf7"
          @click="editData"
        >
          <v-icon color="#e1ebf7" class="" small>mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon x-small fab @click="deleteData">
          <v-icon color="#3D4F70">mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import { db } from "../plugins/firebase";

export default {
  name: "MobileTable",
  props: {
    // ref and id
    id: String,
    // class-color
    color: String,
    text: String,
    icon: String,
    // table
    nama: String,
    tempat: String,
    pejabat: String,
    pelaksana: String,
    waktu: String,
    hari: String
  },
  data: () => ({
    collapse: false
  }),
  computed: {
    collapseTable() {
      return this.collapse == true
        ? "animated fadeIn faster open"
        : "animated fadeOut faster";
    }
  },
  methods: {
    tostring(value) {
      return value.reverse();
    },
    async deleteData() {
      let id = this.id;
      await db
        .collection("collection")
        .doc(id)
        .delete();
    },
    // parameter (id) akan dipassing ke parent
    editData(id) {
      let identify = this.id;
      id = identify;
      this.$emit("editForm", id);
    }
  }
};
</script>

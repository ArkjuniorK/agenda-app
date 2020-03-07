<template>
  <div class="d-flex flex-column mb-3">
    <div class="tb-item d-flex px-4 py-2 align-center" :class="color">
      <span class="raleway font-weight-bold activity-name"> {{ nama }} </span>
      <v-spacer></v-spacer>
      <v-btn text x-small fab icon @click="collapse = !collapse">
        <v-icon color="white" class="pa-1">mdi-plus</v-icon>
      </v-btn>
    </div>
    <div
      class="tb-detail second px-4 d-flex flex-column pt-10 pb-4"
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
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  name: "MobileTable",
  props: {
    // class-color
    color: String,
    text: String,
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
        : "animated fadeOut";
    }
  },
  methods: {
    tostring(value) {
      return value.reverse();
    }
  }
};
</script>

<template>
  <div class="img-slider-section" @click="deleteImg" style="cursor: pointer;">
    <div class="icon-section d-flex align-center justify-center flex-column">
      <v-icon color="white">mdi-delete</v-icon>
      <span class="lato white--text">Delete</span>
    </div>
    <img :src="img" />
  </div>
</template>
<script>
/* eslint-disable vue/require-default-prop */
import { db } from "../plugins/firebase";

export default {
  name: "ImageSlide",
  props: {
    id: String,
    img: String
  },
  methods: {
    async deleteImg() {
      await this.$emit("deleteSliderBtn");
      await db
        .collection("pictures")
        .doc(this.id)
        .delete();
    }
  }
};
</script>

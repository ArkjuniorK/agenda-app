<template>
  <tr>
    <td class="lato subtitle-1 font-weight-bold">
      {{ hari }}
    </td>
    <td class="lato subtitle-1 font-weight-bold">
      {{ waktu }}
    </td>
    <td class="lato subtitle-1 font-weight-bold">
      {{ nama }}
    </td>
    <td class="lato subtitle-1 font-weight-bold">
      {{ pelaksana }}
    </td>
    <td class="lato subtitle-1 font-weight-bold">
      {{ tempat }}
    </td>
    <td class="lato subtitle-1 font-weight-bold">
      {{ pejabat }}
    </td>
    <td class="action">
      <div class="action-child d-flex">
        <v-btn icon @click="editData">
          <v-icon color="white" small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteData">
          <v-icon color="white">mdi-delete</v-icon>
        </v-btn>
      </div>
    </td>
  </tr>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import { db } from "../plugins/firebase";

export default {
  name: "TableBody",
  props: {
    // color class
    color: String,
    icon: String,
    // table
    index: Number,
    id: String,
    nama: String,
    tempat: String,
    pelaksana: String,
    pejabat: String,
    hari: String,
    waktu: String
  },
  methods: {
    async deleteData() {
      let id = this.id;
      await db
        .collection("agendas")
        .doc(id)
        .delete();
    },
    editData(id) {
      id = this.id;
      this.$emit("editForm", id);
    }
  }
};
</script>

<template>
  <div class="form-container ma-3 pa-5" :class="animation">
    <div class="form-title-section d-flex align-center mb-3">
      <span class="lato prime--text form-title font-weight-bold"
        >Tambah Agenda</span
      >
      <v-spacer></v-spacer>
      <v-btn icon x-small>
        <v-icon :color="icon" @click="formClose">mdi-close</v-icon>
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-row class="form-section">
      <v-col cols="12" class="form-input pb-0 px-3">
        <v-text-field
          label="Nama"
          placeholder="Nama Kegiatan"
          v-model="namaKgtn"
          :color="icon"
        ></v-text-field>
        <v-text-field
          label="Tempat"
          placeholder="Tempat Pelaksanaan Kegiatan"
          v-model="tempatKgtn"
          :color="icon"
        ></v-text-field>
        <v-text-field
          label="Pelaksana"
          placeholder="Pelaksana Kegiatan"
          v-model="pelaksanaKgtn"
          :color="icon"
        ></v-text-field>
        <v-text-field
          label="Pejabat"
          placeholder="Pejabat"
          v-model="pejabat"
          :color="icon"
        ></v-text-field>
      </v-col>
      <v-col class="picker-btn px-3">
        <div class="date-picker-section">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedMoment"
                label="Tanggal Kegiatan"
                readonly
                :color="icon"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              scrollable
              reactive
              v-model="picker"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </div>
        <div class="time-picker-section">
          <!-- time picker menggunakan v-menu agar dapat di toggle
                menggunakan text-field -->
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="time"
                label="Waktu"
                :color="icon"
                placeholder="Waktu Kegiatan"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              :color="icon"
              v-model="time"
              full-width
              @click:minute="$refs.menu2.save(time)"
            ></v-time-picker>
          </v-menu>
        </div>
        <div class="alert-section mt-10">
          <v-alert v-show="error" type="error" dense text
            >Data Gagal di Tambahkan</v-alert
          >
          <v-alert v-show="success" type="success" dense text
            >Data Berhasil di Tambahkan</v-alert
          >
        </div>
        <div class="btn-section d-flex align-center">
          <v-btn
            depressed
            style="color: #e1ebf7"
            :color="icon"
            @click="tambah"
            :loading="loadingAdd"
            >Tambahkan</v-btn
          >
          <v-btn depressed text class="ml-1" @click="reset">Reset</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import moment from "moment";
import { db } from "../plugins/firebase";
import { Timestamp } from "../plugins/firebase";

export default {
  name: "FormAdd",
  props: {
    icon: String,
    animation: String
  },
  data: () => ({
    // tabel
    namaKgtn: "",
    tempatKgtn: "",
    pelaksanaKgtn: "",
    pejabat: "",
    // menu dan menu2 adalah boolean dari v-menu component
    menu: false,
    menu2: false,
    // time and date harus dijadikan sebagai tanggal agar mudah diolah di methods properties
    // substr(0, 5) = HH:MM
    // subsrt(0, 10) = YYYY/MM/DD atau YYYY/DD/MM
    time: new Date().toTimeString().substr(0, 5),
    picker: new Date().toISOString().substr(0, 10),
    // alert and btn
    error: false,
    success: false,
    loadingAdd: false
  }),
  computed: {
    computedMoment() {
      // tanggal dan nama hari di ubah menjadi bahasa dengan moment.js
      // computedMoment akan di tampilkan di text-field :value
      return this.picker
        ? moment(this.picker)
            .locale("id")
            .format("dddd, Do MMMM YYYY")
        : "";
    }
  },
  methods: {
    async tambah() {
      let response = () =>
        new Promise(resolve => {
          setTimeout(() => resolve(), 1500);
          this.success = true;
        });
      let responseFinal = () =>
        new Promise(resolve => {
          setTimeout(() => resolve(), 1000);
          this.success = false;
        });

      this.loadingAdd = await true;
      await db.collection("agendas").add({
        nama: this.namaKgtn,
        tempat: this.tempatKgtn,
        pelaksana: this.pelaksanaKgtn,
        pejabat: this.pejabat,
        // Timestamp berasal dari {Timestamp}
        // new Date menerima parameter berupa string sehingga
        // ketika menggunakan (this.picker + " " + this.time)
        // akan menghasilkan (YYYY-MM-DD HH:MM)
        waktu: Timestamp.fromDate(new Date(this.picker + " " + this.time))
      });
      await response();
      this.loadingAdd = await false;
      await this.formClose();
      await this.reset();
      await responseFinal();
    },
    reset() {
      this.namaKgtn = "";
      this.tempatKgtn = "";
      this.pelaksanaKgtn = "";
      this.pejabat = "";
    },
    async formClose() {
      await this.$emit("formClosed");
      this.namaKgtn = "";
      this.tempatKgtn = "";
      this.pelaksanaKgtn = "";
      this.pejabat = "";
    }
  }
};
</script>

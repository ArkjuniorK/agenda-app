<template>
  <div class="overlay-display" :class="overlayer">
    <div class="overlay-display-area" @click="leave"></div>
    <div class="logged-setting" v-if="login">
      <v-row class="overlay-content-area ma-3">
        <v-col class="overlay-card" :class="animate" cols="12" xl="3">
          <input
            type="file"
            @change="selectImg"
            ref="select"
            id="hero-selecter"
            accept="image/*"
            style="display: none"
          />
          <div class="upper-section d-flex align-center px-3 py-2">
            <v-icon class="mx-1" :color="icon" @click="leave"
              >mdi-chevron-left</v-icon
            >
            <v-spacer></v-spacer>
            <span class="lato font-weight-medium setting-title prime--text"
              >Pengaturan</span
            >
            <v-spacer></v-spacer>
            <v-icon class="mx-1" color="#3D4F70">mdi-settings</v-icon>
          </div>
          <v-divider class="mx-5"></v-divider>
          <div class="color-section setting-section pa-3 ma-1">
            <div class="app-color d-flex align-center">
              <span class="lato title-setting prime--text">Mode Warna</span>
              <v-spacer></v-spacer>
              <div class="color-mode d-flex aling-center" ref="colorMode">
                <div
                  class="btn-color mx-1 btn-primary d-flex align-center justify-center"
                  :class="primeActive"
                  @click="$emit('prime')"
                >
                  <div class="btn-toggle"></div>
                </div>
                <div
                  class="btn-color mx-1 btn-reddy d-flex align-center justify-center"
                  :class="reddyActive"
                  @click="$emit('reddy')"
                >
                  <div class="btn-toggle"></div>
                </div>
                <div
                  class="btn-color mx-1 btn-violet d-flex align-center justify-center"
                  :class="violetActive"
                  @click="$emit('violet')"
                >
                  <div class="btn-toggle"></div>
                </div>
                <div
                  class="btn-color mx-1 btn-bluery d-flex align-center justify-center"
                  :class="blueryActive"
                  @click="$emit('bluery')"
                >
                  <div class="btn-toggle"></div>
                </div>
              </div>
            </div>
          </div>
          <v-divider class="mx-5 d-xl-none"></v-divider>
          <mq-layout mq="mobile">
            <div class="table-section setting-section pa-3 ma-1">
              <div class="mobile-table">
                <div class="mb-table-upper d-flex align-center mb-5">
                  <span class="lato title-setting prime--text"
                    >Jadwal Kegiatan</span
                  >
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    depressed
                    :color="icon"
                    style="color: #fff"
                    @click="formOpen"
                    >Tambah Data</v-btn
                  >
                </div>
                <div class="mb-table-downer">
                  <div class="table-parent">
                    <div
                      class="table-child"
                      v-for="(item, index) in activity"
                      :key="index"
                      :id="item.id"
                    >
                      <mobile-table-admin
                        :id="item.id"
                        :icon="icon"
                        :color="color"
                        :text="text"
                        :nama="item.nama"
                        :tempat="item.tempat"
                        :pelaksana="item.pelaksana"
                        :pejabat="item.pejabat"
                        :hari="item.waktu.seconds | hari"
                        :waktu="item.waktu.seconds | waktu"
                        @editForm="formEditOpen($event)"
                      ></mobile-table-admin>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </mq-layout>
          <v-divider class="mx-5"></v-divider>
          <div class="marquee-section setting-section pa-3 ma-1">
            <div class="app-marquee d-flex align-center mb-5">
              <span class="lato title-setting prime--text">Marquee Text</span>
              <v-spacer></v-spacer>
              <span class="lato title-setting mr-1" :class="text">Ulang:</span>
              <input
                type="number"
                name="marquee"
                id="marquee"
                v-model="marqueeRepeat"
                style="width: 40px;"
              />
            </div>
            <div class="app-marquee-text-field">
              <v-textarea
                :messages="messages"
                filled
                v-model="marqueeText"
                height="215"
              >
              </v-textarea>
              <v-btn
                block
                depressed
                :color="icon"
                :loading="loadingBtn"
                style="color: #fff"
                @click="marqueeBtn"
                >Simpan</v-btn
              >
            </div>
          </div>
          <v-divider class="mx-5"></v-divider>
          <div class="image-section setting-section pa-3 ma-1">
            <div class="image-upper-section d-flex align-center mb-5">
              <span class="lato title-setting prime--text">Gambar</span>
              <v-spacer></v-spacer>
              <v-btn
                small
                depressed
                :color="icon"
                style="color: #fff"
                class="mr-2"
                @click="selectedImg"
              >
                Pilih Gambar
              </v-btn>
              <v-btn
                small
                depressed
                :loading="replaceLoading"
                :color="icon"
                style="color: #fff"
                @click="changeImg"
                >Ganti</v-btn
              >
            </div>
            <div class="image-middle-section">
              <v-alert
                v-show="success"
                class="animated fadeInRight faster"
                text
                type="success"
                dense
                >Gambar Berhasil di Ubah</v-alert
              >
            </div>
            <div
              class="image-downer-section img-hero-section-overlay"
              :class="color"
            >
              <v-img :src="hero"></v-img>
            </div>
            <div class="image-downer-note mt-5">
              <v-alert type="info" dense>
                Pastikan gambar memiliki resolusi tidak kurang dari 322px x
                272px.
              </v-alert>
            </div>
          </div>
          <v-divider class="mx-5 d-xl-none"></v-divider>
          <mq-layout mq="mobile">
            <div class="slider-section setting-section pa-3 ma-1">
              <div class="slider-upper-section d-flex align-center mb-5">
                <span class="lato title-setting prime--text">
                  Slideshow
                </span>
                <v-spacer></v-spacer>
                <v-btn
                  small
                  depressed
                  :color="icon"
                  style="color: #fff"
                  class="mr-2"
                  @click="selectedSlider"
                >
                  Pilih Gambar
                </v-btn>
                <v-btn
                  small
                  depressed
                  :color="icon"
                  style="color: #fff"
                  :loading="sliderLoading"
                  @click="addSlider"
                  >Tambah</v-btn
                >
              </div>
              <div class="slider-downer-section">
                <div class="response" :class="sliderResponse">
                  <v-alert v-show="successSlider" type="success" dense
                    >Gambar Berhasil di Tambahkan</v-alert
                  >
                  <v-alert v-show="deleteSlider" type="warning" dense
                    >Gambar akan di Hapus</v-alert
                  >
                </div>
                <v-row>
                  <v-col
                    v-for="(slide, index) in slides"
                    :key="index"
                    cols="4"
                    sm="4"
                  >
                    <image-slide
                      :img="slide.img"
                      :id="slide.id"
                      @deleteSliderBtn="deleteSliderBtn"
                    ></image-slide>
                  </v-col>
                </v-row>
              </div>
            </div>
          </mq-layout>
        </v-col>
        <v-col
          cols="12"
          xl="9"
          class="pt-2 py-xl-0 pr-xl-0"
          :class="animateTwo"
        >
          <mq-layout mq="desktop">
            <div class="overlay-card pa-6">
              <div class="dp-table-display">
                <div class="upper-section d-flex align-center">
                  <span class="title-setting lato prime--text"
                    >Jadwal Kegiatan</span
                  >
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    depressed
                    :color="icon"
                    style="color: #fff"
                    @click="formOpen"
                    >Tambah Data</v-btn
                  >
                </div>
                <div class="downer-section mt-4">
                  <div class="table-overlay-section" :class="color">
                    <div class="table-overlay-child pa-5">
                      <v-simple-table color="primary">
                        <template v-slot:default>
                          <thead class="table-head" :class="color">
                            <tr>
                              <th
                                v-for="(th, index) in tHead"
                                :key="index"
                                class="text-left lato subtitle-2 font-weight-medium th-class"
                              >
                                {{ th }}
                              </th>
                            </tr>
                          </thead>
                          <tbody class="table-body" :class="color">
                            <table-body
                              v-for="(item, index) in activity"
                              :key="index"
                              :index="index"
                              :id="item.id"
                              :color="color"
                              :icon="icon"
                              :nama="item.nama"
                              :tempat="item.tempat"
                              :pelaksana="item.pelaksana"
                              :pejabat="item.pejabat"
                              :hari="item.waktu.seconds | hari"
                              :waktu="item.waktu.seconds | waktu"
                              @editForm="formEditOpen($event)"
                            ></table-body>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dp-slider-display mt-6">
                <div class="upper-section d-flex align-center">
                  <span class="lato title-setting prime--text">
                    Slideshow
                  </span>
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    depressed
                    :color="icon"
                    style="color: #fff"
                    class="mr-2"
                    @click="selectedSlider"
                  >
                    Pilih Gambar
                  </v-btn>
                  <v-btn
                    small
                    depressed
                    :color="icon"
                    style="color: #fff"
                    :loading="sliderLoading"
                    @click="addSlider"
                    >Tambah</v-btn
                  >
                </div>
                <div class="slider-downer-section mt-3">
                  <div class="response" :class="sliderResponse">
                    <v-alert v-show="successSlider" type="success" dense
                      >Gambar Berhasil di Tambahkan</v-alert
                    >
                    <v-alert v-show="deleteSlider" type="warning" dense
                      >Gambar akan di Hapus</v-alert
                    >
                  </div>
                  <v-row>
                    <v-col
                      v-for="(slide, index) in slides"
                      :key="index"
                      cols="4"
                      sm="4"
                      xl="1"
                    >
                      <image-slide
                        :img="slide.img"
                        :id="slide.id"
                        @deleteSliderBtn="deleteSliderBtn"
                      ></image-slide>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>
          </mq-layout>
        </v-col>
      </v-row>
      <div class="overlay-display" :class="overlay">
        <div class="overlay-display-area"></div>
        <div class="overlay-display-content">
          <form-add
            v-show="tambah"
            :icon="icon"
            :animation="animation"
            @formClosed="formClose"
          ></form-add>
          <form-edit
            v-show="edit"
            :agenda="agenda"
            :id-data="idData"
            :icon="icon"
            :animation="animation"
            @formEditClosed="formEditClose"
          ></form-edit>
        </div>
      </div>
    </div>
    <div class="login-setting" v-else>
      <div class="login-setting-child d-flex" :class="animate">
        <div class="login-form pa-6">
          <div class="d-flex align-center mb-5">
            <span class="lato prime--text font-weight-thin">Login</span>
            <v-spacer></v-spacer>
            <v-btn small icon :color="icon" @click="leave">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <img src="@/assets/img/logo.png" width="40" />
          <br />
          <span class="login-head raleway font-weight-bold prime--text"
            >Selamat Datang</span
          >
          <br />
          <span class="lato prime--text font-weight-thin"
            >Login Untuk Melanjutkan Sebagai Admin</span
          >
          <div class="form-section mt-10">
            <v-text-field
              label="Email"
              :color="icon"
              outlined
              placeholder="Emailanda@email.com"
              v-model="email"
            ></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              :color="icon"
              outlined
              placeholder="Password Anda"
              v-model="password"
              @keyup.enter="validate"
            ></v-text-field>
          </div>
          <div class="btn-section mt-8 mb-2">
            <v-btn
              block
              elevation="0"
              :color="icon"
              style="color: #fff"
              :loading="validateLoad"
              @click="validate"
              >LOGIN</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/css/color.scss";
$active: #e1ebf7;
$desktop: 1800px;

@media (min-width: $desktop) {
  .img-hero-section-overlay {
    height: 355px;
  }
  span.setting-title {
    font-size: 25pt !important;
  }
  span.title-setting {
    font-size: 15pt !important;
  }
  .table-overlay-section {
    border-radius: 10px;
    .table-head {
      .th-class {
        color: #fff;
        border-bottom: thin solid #c8c8c8 !important;
      }
    }
    .table-body {
      td {
        border-bottom: thin solid #c8c8c8 !important;
      }
      tr:hover {
        background-color: transparent !important;
      }
    }
    .response-table-sect {
      .response-table-child {
        background-color: $active;
        border-radius: 5px;
      }
    }
  }
  .overlay-active {
    .overlay-display-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

// img-hero
.img-hero-section-overlay {
  overflow: hidden;
  border-radius: 10px !important;
}
// input
#marquee {
  color: $prime;
  border-bottom: thin solid $prime;
}
// form-section
.overlay-hidden {
  display: none;
}
.overlay-active {
  display: block;
  .overlay-display-area {
    position: fixed;
    overflow-y: auto;
    z-index: 10;
    background-color: #2c3a54;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  .overlay-display-content {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    .form-container {
      background-color: #d3deec;
      border-radius: 5px;
      span.form-title {
        font-size: 15pt;
      }
    }
    .picker-btn {
      padding: 0px;
    }
    .form-section {
      padding: 0;
    }
  }
}

.hidden {
  display: none;
}
.active {
  display: block;
}
.btn-primary {
  background-color: $prime;
}
.btn-reddy {
  background-color: $reddy;
}
.btn-violet {
  background-color: $violet;
}
.btn-bluery {
  background-color: $bluery;
}
.active-btn {
  .btn-toggle {
    width: 15px;
    height: 15px;
    background-color: $active;
    border-radius: 30px;
    margin: auto;
  }
}
.btn-color {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  cursor: pointer;
}
.overlay-display-area {
  position: fixed;
  overflow-y: auto;
  z-index: 5;
  background-color: #2c3a54;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
}
// login setting
.login-setting-child {
  position: absolute;
  z-index: 10;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  .login-form {
    border-radius: 10px;
    text-align: center;
    margin: 0 auto;
    background-color: #e1ebf7;
    align-self: center;
    width: 320px;
    span.login-head {
      font-size: 20pt;
    }
  }
}
.overlay-content-area {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  .overlay-card {
    background-color: #e1ebf7;
    border-radius: 10px;
    span.setting-title {
      font-size: 7vw;
    }
    .setting-section {
      span.title-setting {
        font-size: 4vw;
      }
    }
  }
}
.round {
  border-radius: 30px !important;
  // background-color: #2c3a54 !important;
}
.table-section {
  .mb-table-downer {
    .table-parent {
      position: relative;
    }
    .activity-name {
      line-height: 1.5;
    }
    .tb-item {
      border-radius: 5px;
      z-index: 1;
    }
    .tb-detail {
      position: relative;
      display: none !important;
      transition: 1s ease-in-out;
      background-color: #d3deec;
      border-radius: 5px;
      margin-top: -20px;
      span {
        font-size: 11pt;
      }
    }
    .open {
      visibility: visible !important;
      display: flex !important;
    }
  }
}
.slider-downer-section {
  .img-slider-section {
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    .icon-section {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<script>
/* eslint-disable vue/require-default-prop */
import moment from "moment";
import { db, st, auth } from "../plugins/firebase";

export default {
  name: "Overlay",
  data: () => ({
    // login status
    validateLoad: false,
    login: false,
    email: null,
    password: null,
    // data
    agenda: {},
    idData: "",
    // class
    overlay: "overlay-hidden",
    animation: "",
    // db
    activity: [],
    // form-condition
    tambah: false,
    edit: false,
    // marquee messages
    messages: "Data Belum di Simpan",
    loadingBtn: false,
    // file-img
    replaceLoading: false,
    success: false,
    file: null,
    fileUrl: null,
    // img slides
    slides: [],
    sliderLoading: false,
    successSlider: false,
    deleteSlider: false,
    sliderResponse: "",
    // table
    tHead: [
      "Hari/Tanggal",
      "Waktu",
      "Agenda Kegiatan",
      "Pelaksana",
      "Tempat Kegiatan",
      "Pejabat",
      "Aksi"
    ]
  }),
  props: {
    // class
    overlayer: String,
    animate: String,
    animateTwo: String,
    // classes db
    color: String,
    name: String,
    text: String,
    icon: String,
    // marquee
    marqueeText: String,
    marqueeRepeat: Number,
    // hero-img
    hero: String
  },
  components: {
    MobileTableAdmin: () => import("./MobileTableAdmin"),
    FormAdd: () => import("./FormAdd"),
    FormEdit: () => import("./FormEdit"),
    ImageSlide: () => import("./ImageSlide"),
    TableBody: () => import("./TableBody")
  },
  methods: {
    leave() {
      // close adalah nama yang akan di passing ke parent menjadi @close
      // overlay adalah parameter untuk props
      this.$emit("close");
      this.success = false;
    },
    async formClose() {
      let overlay = () =>
        new Promise(resolve => {
          setTimeout(() => resolve(), 100);
          this.overlay = "overlay-hidden";
        });
      let animate = () =>
        new Promise(resolve => {
          setTimeout(() => resolve(), 900);
          this.animation = "animated slideOutUp faster";
        });
      await animate();
      await overlay();
      this.tambah = await false;
    },
    formOpen() {
      this.tambah = true;
      this.overlay = "overlay-active";
      this.animation = "animated slideInDown faster";
    },
    async formEditOpen(id) {
      this.edit = await true;
      this.overlay = await "overlay-active";
      this.animation = await "animated slideInDown faster";
      let idData = id;
      this.idData = idData;
      // when we only passing the id to the another child component
      // it will hard to maintain the data and also made the mounted property
      // did not work properly
      // [SOLVE] passing the whole data in the button function
      // then the data would be trigger automaticly
      await db
        .collection("agendas")
        .doc(id)
        .get()
        .then(snapshot => {
          this.agenda = snapshot.data();
        });
      await console.log(this.agenda);
    },
    async formEditClose() {
      let overlay = () =>
        new Promise(resolve => {
          setTimeout(() => resolve(), 100);
          this.overlay = "overlay-hidden";
        });
      let animate = () =>
        new Promise(resolve => {
          setTimeout(() => resolve(), 900);
          this.animation = "animated slideOutUp fast";
        });
      await animate();
      await overlay();
      this.edit = await false;
    },
    async marqueeBtn() {
      let number = parseInt(this.marqueeRepeat);
      this.loadingBtn = await true;
      await db
        .collection("classes")
        .doc("UnxSbUgAvMtNuAKIPgFm")
        .update({
          repeat: number,
          text: this.marqueeText
        });
      this.messages = await "Data Berhasil di Simpan";
      this.loadingBtn = await false;
    },
    selectImg(event) {
      this.file = event.target.files[0];
    },
    selectedImg() {
      this.$refs.select.click();
    },
    async changeImg() {
      let storeRef = st.ref();
      let storePlace = storeRef.child(`hero/${this.file.name}`);
      this.replaceLoading = await true;
      await storePlace.put(this.file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.fileUrl = downloadURL;
          db.collection("classes")
            .doc("e4BDb9SS7SxXozfmUs8o")
            .update({
              pic: this.fileUrl
            });
        });
      });
      this.success = await true;
      this.replaceLoading = await false;
    },
    selectedSlider() {
      this.$refs.select.click();
    },
    async addSlider() {
      let storeRef = st.ref();
      let storePlace = storeRef.child(`pictures/${this.file.name}`);
      this.sliderLoading = await true;
      await storePlace.put(this.file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          let urlImg = downloadURL;
          db.collection("pictures").add({
            img: urlImg
          });
        });
      });
      this.sliderResponse = await "animated slideInRight faster";
      this.successSlider = await true;
      this.sliderLoading = await false;
      await new Promise(resolve => {
        setTimeout(() => resolve(), 3000);
      });
      this.sliderResponse = await "animated slideOutLeft faster";
      await new Promise(resolve => {
        setTimeout(() => resolve(), 1000);
      });
      this.successSlider = await false;
    },
    async deleteSliderBtn() {
      this.sliderResponse = await "animated slideInRight faster";
      this.deleteSlider = await true;
      await new Promise(resolve => {
        setTimeout(() => resolve(), 1000);
      });
      this.sliderResponse = "animated slideOutLeft faster";
      await new Promise(resolve => {
        setTimeout(() => resolve(), 1000);
      });
      this.deleteSlider = false;
    },
    async validate() {
      this.validateLoad = await true;
      await auth
        .signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then(data => {
          this.login = true;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          this.validateLoad = false;
        });
    }
  },
  computed: {
    primeActive() {
      return this.name === "Primary" ? "active-btn" : "";
    },
    reddyActive() {
      return this.name === "Reddy" ? "active-btn" : "";
    },
    blueryActive() {
      return this.name === "Bluery" ? "active-btn" : "";
    },
    violetActive() {
      return this.name === "Violet" ? "active-btn" : "";
    }
  },
  filters: {
    hari(value) {
      let namaHari = new Array(
        "Ahad",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
      );
      let namaBulan = new Array(
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      );

      let time = new Date(value * 1000);
      let hari = time.getDay();
      let tanggal = time.getDate();
      let bulan = time.getMonth();
      let tahun = time.getFullYear();
      return (value =
        namaHari[hari] + "/" + tanggal + " " + namaBulan[bulan] + " " + tahun);
    },
    waktu(value) {
      let time = new Date(value * 1000);
      return moment(time)
        .locale("id")
        .format("hh:mm a");
    }
  },
  firestore: {
    activity: db.collection("agendas").orderBy("waktu", "asc"),
    slides: db.collection("pictures")
  },
  mounted() {
    this.primeActive;
    this.reddyActive;
    this.blueryActive;
    this.violetActive;
  }
};
</script>

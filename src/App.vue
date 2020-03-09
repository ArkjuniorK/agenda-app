<template>
  <v-app>
    <v-content>
      <div class="app-container" :class="container">
        <v-row :class="responsiveEdge">
          <v-col class="card-one d-flex flex-column" xl="8">
            <div id="column-one" class="d-flex" :class="columnOne" xl="8">
              <div class="logo-section d-flex pa-2">
                <img src="@/assets/img/logo.png" class="logo mr-2" />
                <span
                  class="lato heading-1 font-weight-black"
                  :class="theme.text"
                  >Pemerintah<br />Kabupaten Sinjai</span
                >
              </div>
              <div class="vision-section mt-2 d-flex pa-7" :class="theme.color">
                <div class="visi-misi d-flex">
                  <div class="visi pa-1 mr-3">
                    <span class="raleway font-weight-black text-center"
                      >VISI</span
                    >
                  </div>
                  <div class="misi-text">
                    <span class="raleway"> {{ misi }} </span>
                  </div>
                </div>
                <div class="background">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="divider-section d-flex my-7 align-center">
              <span class="raleway second px-5 py-3 mr-4" :class="theme.text">
                Jadwal Kegiatan Pemkab Sinjai
              </span>
              <v-divider color="primary"></v-divider>
            </div>
            <div id="column-two" class="flex-grow-1 flex-shrink-1">
              <mq-layout mq="mobile" class="mobile-table">
                <div class="table-parent">
                  <div
                    class="table-child"
                    v-for="(item, index) in agendas"
                    :key="index"
                  >
                    <mobile-table
                      :color="theme.color"
                      :text="theme.text"
                      :nama="item.nama"
                      :tempat="item.tempat"
                      :pelaksana="item.pelaksana"
                      :pejabat="item.pejabat"
                      :hari="item.waktu.seconds | hari"
                      :waktu="item.waktu.seconds | waktu"
                    ></mobile-table>
                  </div>
                </div>
              </mq-layout>
              <mq-layout mq="desktop" class="desktop-table">
                <div class="table-parent px-6 d-flex">
                  <div
                    class="table-child align-self-stretch"
                    :class="theme.color"
                  >
                    <div class="table-section pa-5">
                      <v-simple-table color="primary">
                        <template v-slot:default>
                          <thead class="table-head" :class="theme.color">
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
                          <tbody class="table-body" :class="theme.color">
                            <tr v-for="(item, index) in agendas" :key="index">
                              <td class="lato subtitle-1 font-weight-bold">
                                {{ item.waktu.seconds | hari }}
                              </td>
                              <td class="lato subtitle-1 font-weight-bold">
                                {{ item.waktu.seconds | waktu }}
                              </td>
                              <td class="lato subtitle-1 font-weight-bold">
                                {{ item.nama }}
                              </td>
                              <td class="lato subtitle-1 font-weight-bold">
                                {{ item.pelaksana }}
                              </td>
                              <td class="lato subtitle-1 font-weight-bold">
                                {{ item.tempat }}
                              </td>
                              <td class="lato subtitle-1 font-weight-bold">
                                {{ item.pejabat }}
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>
                  </div>
                </div>
              </mq-layout>
            </div>
            <div id="column-three">
              <div
                class="marquee-section marquee py-3 lato font-weight-bold mt-7"
              >
                <marquee-text
                  :repeat="marquee.repeat"
                  :duration="10"
                  :key="marquee.id"
                >
                  {{ marquee.text }}
                </marquee-text>
              </div>
            </div>
          </v-col>
          <v-col class="card-two" xl="4">
            <div class="card-parent d-flex flex-column" :class="cardTwo">
              <div class="img-hero-section" :class="theme.color">
                <v-img :src="hero.pic"></v-img>
                <mq-layout mq="desktop">
                  <div
                    class="card-name d-flex pa-2 ma-3 justify-center"
                    :class="theme.color"
                  >
                    <div class="bupati text-right">
                      <span class="lato body-1"
                        >Andi Seto Gadhista Asapa, SH, LL.M</span
                      >
                      <br />
                      <span class="overline">Bupati Sinjai</span>
                    </div>
                    <span class="mx-2"></span>
                    <div class="wakil text-left">
                      <span class="lato body-1"
                        >Hj. Andi Kartini Ottong, Sp, M.SP</span
                      >
                      <br />
                      <span class="overline">Wakil Bupati Sinjai</span>
                    </div>
                  </div>
                </mq-layout>
              </div>
              <div class="img-slider-section mt-4">
                <span class="lato body-2 ml-2 prime--text"
                  >Dokumentasi Kegiatan</span
                >
                <div class="slider-section mt-1">
                  <hooper
                    :item-to-show="1"
                    :center-mode="true"
                    :infinite-scroll="true"
                    :play-speed="3000"
                    :auto-play="true"
                    class="hooper-class"
                  >
                    <slide v-for="(pic, index) in pictures" :key="index">
                      <img :src="pic.img" />
                    </slide>
                  </hooper>
                </div>
              </div>
              <div class="social-section mt-4 ml-2">
                <span class="lato body-2 prime--text">Social Media</span>
                <div class="social-item d-flex align-center ">
                  <div class="email align-center d-flex mt-1">
                    <v-icon class="prime--text">mdi-email</v-icon>
                    <span class="body-2 lato ml-1 prime--text"
                      >email21@email.co.id</span
                    >
                  </div>
                  <div class="social align-center d-flex mt-1 ml-2">
                    <v-icon>mdi-facebook</v-icon>
                    <span class="body-2 lato ml-1 prime--text"
                      >Humas Sinjai</span
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div class="setting-section mt-1">
                    <v-btn x-small icon @click="setting">
                      <v-icon>mdi-tune</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <overlay
        :overlayer="overlayer"
        @close="closed"
        :animate="animate"
        :animate-two="animateTwo"
        :name="theme.name"
        :color="theme.color"
        :text="theme.text"
        :icon="theme.icon"
        @prime="primeBtn"
        @reddy="reddyBtn"
        @violet="violetBtn"
        @bluery="blueryBtn"
        :marquee-text="marquee.text"
        :marquee-repeat="marquee.repeat"
        :hero="hero.pic"
      ></overlay>
    </v-content>
  </v-app>
</template>

<script>
import { db } from "./plugins/firebase.js";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
import moment from "moment";

export default {
  name: "App",
  components: {
    MobileTable: () => import("./components/MobileTable"),
    MarqueeText: () => import("vue-marquee-text-component"),
    Hooper,
    Slide,
    Overlay: () => import("./components/Overlay")
  },
  data: () => ({
    // firebae db
    agendas: [],
    pictures: [],
    hero: {},
    // class
    overlayer: "hidden",
    container: "active",
    animate: "",
    animateTwo: "",
    // table
    theme: {},
    tHead: [
      "Hari/Tanggal",
      "Waktu",
      "Agenda Kegiatan",
      "Pelaksana",
      "Tempat Kegiatan",
      "Pejabat"
    ],
    // marquee db
    marquee: {},
    // misi-section
    misi:
      "Terwujudnya Masyarakat Sinjai yang Mandiri, Berkeadilan, dan Religius Melalui Peningkatan Kualitas Sumber Daya Manusia Yang Unggul dan Berdaya Saing"
  }),
  computed: {
    columnOne() {
      return this.$mq === "mobile" ? "flex-column" : "";
    },
    cardTwo() {
      return this.$mq === "mobile" ? "mt-4" : "ml-4";
    },
    responsiveEdge() {
      return this.$mq == "mobile" ? "py-3 mx-3" : "py-5 mx-5";
    }
  },
  methods: {
    setting() {
      this.overlayer = "active";
      this.animate = "animated slideInDown faster";
      this.animateTwo = "animated slideInDown fast";
      this.container = "no-scroll";
    },
    async closed() {
      let close = () =>
        new Promise(resolve => {
          setTimeout(() => resolve(), 1000);
          this.animate = "animated slideOutUp faster";
          this.animateTwo = "animated slideOutUp slow";
        });

      await close();
      this.overlayer = await "hidden";
      this.container = await "active";
    },
    primeBtn() {
      db.collection("collection")
        .doc("doc_id")
        .update({
          name: "Primary",
          text: "prime--text",
          color: "prime",
          icon: "#3D4F70"
        })
        .then(snapshot => {
          this.theme = snapshot.data();
        });
    },
    reddyBtn() {
      db.collection("collection")
        .doc("doc_id")
        .update({
          name: "Reddy",
          text: "reddy--text",
          color: "reddy",
          icon: "#FF376E"
        })
        .then(snapshot => {
          this.theme = snapshot.data();
        });
    },
    violetBtn() {
      db.collection("collection")
        .doc("doc_id")
        .update({
          name: "Violet",
          text: "violet--text",
          color: "violet",
          icon: "#604695"
        })
        .then(snapshot => {
          this.theme = snapshot.data();
        });
    },
    blueryBtn() {
      db.collection("collection")
        .doc("doc_id")
        .update({
          name: "Bluery",
          text: "bluery--text",
          color: "bluery",
          icon: "#2769DB"
        })
        .then(snapshot => {
          this.theme = snapshot.data();
        });
    }
  },
  filters: {
    hari(value) {
      let time = new Date(value * 1000);
      return moment(time)
        .locale("id")
        .format(" dddd/MMMM Do YYYY");
    },
    waktu(value) {
      let time = new Date(value * 1000);
      return moment(time)
        .locale("id")
        .format("hh:mm a");
    }
  },
  mounted() {
    this.theme;
  },
  created() {
    this.colorTheme;
  },
  firestore: {
    agendas: db.collection("agenda_db").orderBy("waktu", "asc"),
    pictures: db.collection("pictures_db"),
    theme: db.collection("classes_db_themecolor").doc("BKy5pOZcKNp0HPHcNE5D"),
    marquee: db.collection("classes_db_marquee").doc("UnxSbUgAvMtNuAKIPgFm"),
    hero: db.collection("classes_db_hero").doc("e4BDb9SS7SxXozfmUs8o")
  }
};
</script>

<style lang="scss">
@import "@/assets/css/color.scss";
$desktop: 1800px;

// desktop style
@media (min-width: $desktop) {
  ::-webkit-scrollbar {
    display: none;
  }
  .app-container {
    height: 100vh;
    overflow: hidden;
    .row {
      height: 100%;
    }
  }
  .card-one {
    position: relative;
    border-radius: 20px !important;
    #column-one {
      padding: 20px 20px 0 20px;
      flex-shrink: 1;
      .logo-section {
        flex-shrink: 0 !important;
      }
      .heading-1 {
        font-size: 50pt;
        line-height: 1;
        margin: 0 10px;
        font-family: "Lato", sans-serif !important;
      }
      img.logo {
        width: 100px;
        object-fit: cover;
        height: 100%;
      }
      .vision-section {
        margin-top: 0 !important;
        margin-left: 30px;
        .visi {
          span {
            font-size: 15pt;
          }
        }
        .misi-text {
          span {
            font-size: 12pt;
          }
        }
      }
    }
    .divider-section {
      padding: 0 20px;
      span {
        font-size: 12pt !important;
      }
    }
    #column-two {
      .desktop-table {
        height: 100%;
        width: 100%;
        .table-parent {
          height: 100%;
          .table-child {
            width: 100%;
            border-radius: 15px;
            .table-head {
              .th-class {
                color: #fff;
                border-bottom: thin solid #c8c8c8;
              }
            }
            .table-body {
              td {
                border-bottom: thin solid #c8c8c8;
              }
              tr:hover {
                background-color: transparent;
              }
            }
          }
        }
      }
    }
    #column-three {
      padding: 0 20px 20px 20px;
    }
  }
  .card-two {
    position: relative;
    .card-parent {
      height: 100%;
      margin-top: 0 !important;
      .img-hero-section {
        border-radius: 20px !important;
        height: 515px;
      }
      .img-slider-section {
        flex-grow: 1;
        .slider-section {
          width: 100%;
          border-radius: 20px !important;
        }
      }
      .hooper-class {
        height: 420px;
        width: 100%;
      }
    }
  }
}

.no-scroll {
  overflow: hidden !important;
  position: fixed;
  -webkit-overflow-scrolling: hidden;
}

// app-container
.v-application ul {
  padding: 0 !important;
}
.app-container {
  background-color: #e1ebf7;
  width: 100%;
  max-width: 100%;
  line-height: 1 !important;
}
.card-one {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px !important;
  .heading-1 {
    font-size: 8vw;
    line-height: 1.2;
  }
  img.logo {
    width: 14vw;
    height: 100%;
  }
  .vision-section {
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    .visi {
      line-height: 1.3;
    }
    .misi-text {
      font-size: 10pt;
      line-height: 1.4;
    }
    .visi-misi {
      z-index: 2;
    }
    .background {
      position: absolute;
      z-index: 1;
      right: 0;
      top: -30px;
      svg {
        width: 120px;
        height: 120px;
      }
    }
  }
  .divider-section {
    span {
      font-size: 12px;
      border-radius: 100px;
    }
    .v-divider {
      border: 1px solid #3e4f70;
    }
  }
  #column-two {
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
      visibility: none !important;
      transition: 1s ease-in-out;
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
  #column-three {
    .marquee-section {
      border-radius: 5px;
    }
  }
}
.card-two {
  padding: 0 !important;
  .img-hero-section {
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    .card-name {
      position: absolute;
      border-radius: 5px;
      z-index: 1;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .slider-section {
    border-radius: 10px;
    overflow: hidden;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
// font-class
.lato {
  font-family: "Lato", sans-serif;
}
.raleway {
  font-family: "Raleway", sans-serif;
}
</style>

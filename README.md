# Agenda App
Vue app to manage Agenda

## Getting Started
Agenda App is an open-source PWA to manage Agenda or Activity for Sinjai Regency, but because I decide this app to be open-source, so feel free to use and change the code as you need. 

## Brief
Agenda App is build with [Firebase](https://firebase.google.com/) Firestore, Storage and Auth. Also with another great plugin such as [Vuefire](https://vuefire.vuejs/org), [Vuetify](https://vuetifyjs.com), and other helpfull plugin.

## Installing
To start installing the project, run npm command install.
```
npm install
```

Add Vuetify and other plugin.
```
vue add vuetify pwa babel
```

Install dependencies and plugin.
```
npm install vuefire firebase moment hooper vue-marquee-text-component 
```

### Firebase Setup
Create a new project on [Firebase](https://firebase.google.com). Then add the config code setup on "src/plugins/firebase.js" path.
Inside the config field.

Example: 
```
const congfig = {
  apiKey: "yourapikey123",
  authDomain: "yourauthdomain.firebaseapp.com",
  databaseURL: "https://databaseurl.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-storage.appspot.com"
}

```

If you want to use RTB instead of Firestore, make sure to replace the import statement and change the export variable.

Example:

From:
```
import "firebase/firestore"
export const db = app.firestore();
```
To
```
import "firebase/database"
export const db = app.database();
```

Then you are ready to ROCK!!!

### Plugin Setup On main.js
Inside the main.js file, there is a few plugin that we have to import so the plugin could be use in the app such as the vueMq plugin to setting the media query for the app, but unfortenally the media query that I set is just for mobile and desktop display, to change it you only need to add a new breakpoint inside the ;"breakpoints" field.

Example:
```
Vue.use(vueMq, {
  breakpoints: {
    mobile: 600,
    tablet: 780, //tablet display
    laptop: 1200, //laptop display 
    desktop; Infinity
  }
})
```
After change or add your own media query configuration, ***please note* that you need add your own style for your recent mq configuration.**

You can easily look the [vue-mq](https://github.com/AlexandreBonaventure/vue-mq) documentation for more configuration.

### Plugin and Dependencies
* [Vue](https://vuejs.org)
* [Firebase](https://firebase.google.com)
* [Hooper](https://baianat.github.io/hooper/)
* [Momentjs](https://momentjs.com/)
* [Vuefire](https://vuefire.vuejs/org)
* [Vue-Mq](https://github.com/AlexandreBonaventure/vue-mq)
* [vue-marquee-text](https://github.com/EvodiaAut/vue-marquee-text-component)
* [Vuetify](https://vuetifyjs.com)

### Author
**ArkjuniorK** - *College Student and Front End Developer*

### Say Hi!
* [Dribbble](https://dribbble.com/ArkjuniorK)
* [GitHub](https://github.com/ArkjuniorK)

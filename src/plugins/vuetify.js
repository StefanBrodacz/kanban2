import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    values: {
      mdiWeatherSunny: "mdiWeatherSunny",
      mdiWeatherNight: "mdiWeatherNight"
    }
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      },
      dark: {
        primary: "#ffffff",
        secondary: "#000000",
        accent: "#FFC107"
      }
    }
  }
});

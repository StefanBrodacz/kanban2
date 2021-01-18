<template>
  <v-app>
    <v-app-bar dense app elevation="1" height="64px">
      <v-toolbar-title>Vuetify Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        top
        height="100%"
        class="pa-7"
        :ripple="false"
        tile
        :to="link.url"
        v-for="link in links"
        :key="`${link.label}-header-link`"
      >
        <v-badge
          color="deep-purple accent-4"
          icon="mdi-alert"
          offset-x="3px"
          offset-y="7px"
          overlap
          bordered
        >
          {{ link.label }}
        </v-badge>
      </v-btn>

      <v-divider class="mx-4" vertical></v-divider>
      <v-switch
        dense
        hide-details
        class="mx-auto"
        color="white"
        v-model="$vuetify.theme.dark"
        prepend-icon="mdi-weather-sunny"
        append-icon="mdi-weather-night"
      ></v-switch>
    </v-app-bar>
    <v-main>
      <transition :name="transitionName" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </v-main>
    <!--    <v-footer color="primary lighten-1" padless>-->
    <!--      <v-layout justify-center wrap>-->
    <!--        <v-btn-->
    <!--          v-for="link in links"-->
    <!--          :key="`${link.label}-footer-link`"-->
    <!--          color="white"-->
    <!--          text-->
    <!--          rounded-->
    <!--          class="my-2"-->
    <!--          :to="link.url"-->
    <!--        >-->
    <!--          {{ link.label }}-->
    <!--        </v-btn>-->
    <!--        <v-flex primary lighten-2 py-4 text-center white&#45;&#45;text xs12>-->
    <!--          {{ new Date().getFullYear() }} — <strong>Vuetify Dashboard</strong>-->
    <!--        </v-flex>-->
    <!--      </v-layout>-->
    <!--    </v-footer>-->
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    darkTheme: false,
    transitionName: "scale",
    links: [
      {
        label: "Home",
        url: "/"
      },
      {
        label: "Login",
        url: "/login"
      },
      {
        label: "Signup",
        url: "/signup"
      },
      {
        label: "Kanban",
        url: "/kanban"
      }
    ]
  }),
  watch: {
    $route(to, from) {
      if (to.name === "Home" || from.name === "Home") {
        this.transitionName = "scale";
      } else {
        this.transitionName = "slide-fade";
      }
    }
  },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>
<style>
.slide-fade-enter {
  opacity: 0;
  transform: translateX(10px);
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.scale-enter {
  opacity: 0;
  transform: scale(1.5);
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.46, 1.64, 0.41, 0.8);
}
.scale-leave-to {
  opacity: 0;
  transform: scale(1.5);
  /*transform: translate3d(20px, 20px, 0px);*/
}

.switch-center {
  display: flex;
  justify-content: center;
}
</style>

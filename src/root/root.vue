<template>
  <div>
    <main-navbar :token="token" />
    <router-view />
  </div>
</template>

<script>
import { ref } from "vue";

import mainNavbar from "/src/main-navbar/main-navbar.vue";
import { setupGraphQL } from "./graphql/setupGraphQL";

export default {
  components: { mainNavbar },

  setup: () => {
    const token = ref(localStorage.getItem("token"));

    if (token.value) {
      setupGraphQL({ token: token.value });
    }

    return {
      token,
    };
  },
};
</script>

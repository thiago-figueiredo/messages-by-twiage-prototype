<template>
  <div>
    <main-navbar :email="email" :version="version" />
    <router-view />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

import mainNavbar from "/src/main-navbar/main-navbar.vue";
import { version } from "../../package.json";
import { setupGraphql } from "./graphql/setup-graphql";

export default {
  components: { mainNavbar },

  setup: () => {
    const token = localStorage.getItem("token");

    let email;

    try {
      ({ email } = jwt_decode(token));

      setupGraphql({ token });
    } catch (error) {
      console.error(error);

      email = null;
    }

    return {
      email,
      version,
    };
  },
};
</script>

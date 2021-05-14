<template>
  <div>
    <main-navbar />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";

import mainNavbar from "/src/main-navbar/main-navbar.vue";

export default defineComponent({
  components: { mainNavbar },
});
</script>

<template>
  <hello-world msg="Messages by Twiage" />
</template>

<script>
import { defineComponent } from "vue";

import helloWorld from "./components/hello-world.vue";

export default defineComponent({
  components: {
    helloWorld,
  },
});
</script>

<template>
  <div class="mt-5 splash">
    <h1>{{ msg }}</h1>
    <div>
      <p>{{ greeting }} ({{ val }}) World! :: {{ stuff("test-", 42) }}</p>
    </div>
    <a
      href="https://www.deviantart.com/dio-03/art/MEKANO-Retrofix-d-201919932"
      target="_blank"
    >
      <img
        alt="Mekano"
        class="image mb-2"
        src="src/home/assets/mekano-big-screenRS.jpg"
      />
    </a>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

import x, { notTest } from "../services/something";

console.log(import.meta.env.VITE_ACCESS_TOKEN);

export default defineComponent({
  props: {
    msg: { default: "", type: String },
  },
  setup() {
    const greeting = "Hello";

    const stuff = (a, b) => {
      notTest(8, "some string");
      return "test-" + a + b;
    };

    const val = computed(() => x());

    return {
      greeting,
      stuff,
      val,
    };
  },
});
</script>

<style scoped>
.splash {
  text-align: center;
}
.image {
  max-width: 100vw;
  width: 600px;
}
</style>

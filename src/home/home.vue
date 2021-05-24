<template>
  <div class="mt-5 splash">
    <h1>Messages by Twiage</h1>
    <form>
      <textarea @input="login({ token: $event.target.value })" placeholder="Paste your token here"></textarea>
    </form>
    <a
      href="https://www.deviantart.com/dio-03/art/MEKANO-Retrofix-d-201919932"
      target="_blank"
    >
      <img
        alt="Mekano"
        class="image mb-2"
        src="/src/home/assets/mekano-big-screenRS.jpg"
      />
    </a>
  </div>
</template>

<style scoped>
.splash {
  text-align: center;
}
.image {
  max-width: 100vw;
  width: 600px;
}
</style>

<script>
export default {
  setup() {
    const login = ({ token }) => {
      localStorage.setItem("token", token);

      window.location.reload();
    };

    return { login };
  },
};
</script>

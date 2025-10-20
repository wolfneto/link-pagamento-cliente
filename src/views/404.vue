<template>
  <v-container style="height: 100vh; width: 100vw">
    <div class="text-center">
      <h2>Ops, você não está no lugar certo!</h2>
      <v-img
        class="mx-auto"
        width="500"
        src="@/assets/logo_notfound.png"
      ></v-img>
    </div>
    <Footer></Footer
  ></v-container>
</template>
<script>
export default {
  data: () => ({}),
  created() {
    this.$root.$emit("title", this.$rota.currentRoute.name);
  },
};
</script>
<style scoped>
body {
  height: 100vh;
  width: 100vw;
}
</style>
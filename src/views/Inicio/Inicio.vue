<template>
  <v-container> <h2>Pagina Inicial</h2> </v-container>
</template>
<script>
export default {
  data: () => ({}),
  created() {
    this.$root.$emit("title", this.$rota.currentRoute.name);
  },
};
</script>
<template>
  <v-app>
    <v-main>
      <router-view  />
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    //
  }),
};
</script>
<style>
.grid-item-blue {
  background-color: lightblue;
}

.grid-item-pink {
  background-color: pink;
  height: 100px;
}

.fill-parent-height {
  height: 100%;
}

.top-row{
    min-height: 0;
}
</style>

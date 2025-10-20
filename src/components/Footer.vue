<template>
  <v-footer dark padless>
    <v-card
      color="#2bbacb"
      width="100%"
      flat
      tile
      class="white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon.icon"
          target="_blank"
          :href="icon.url"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text class="white--text">
        <strong
          >Copyright © {{ new Date().getFullYear() }} DentalSolident. Todos
          Direitos Reservados.</strong
        >
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {
        icon: "fab fa-facebook",
        url: "https://www.facebook.com/dentalsolident14/",
      },
      {
        icon: "fab fa-instagram",
        url: "https://www.instagram.com/dental.solident/",
      },
      {
        icon: "fab fa-youtube",
        url: "https://www.youtube.com/channel/UCP0ygOu5qey2YktN_zzyuZg",
      },
    ],
  }),
};
</script>

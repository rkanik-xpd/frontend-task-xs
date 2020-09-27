<template>
  <v-img
    contain
    class="shrink"
    height="48"
    width="128"
    :src="logoSrc"
    alt="XpeedStudio Brand Logo"
  />
</template>

<script>
export default {
  name: "BrandLogo",
  data: () => ({
    logoSrc:
      "https://xpeedstudio.com/wp-content/uploads/2019/06/xpeedstudio_logo_header.png",
  }),
};
</script>
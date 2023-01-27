<template>
  <Navigation />
  <Logo />
  <Welcome />
  <Selection />
  <About />
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Welcome from "@/components/Welcome.vue";
import Selection from "@/components/Selection.vue";
import About from "@/components/About.vue";
import Logo from "@/components/Logo.vue";

export default {
  components: {
    Navigation,
    Welcome,
    Selection,
    About,
    Logo,
  },
};
</script>

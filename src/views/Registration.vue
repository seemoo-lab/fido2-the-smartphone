<template>
  <Navigation />
  <Logo />
  <Registration />
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Registration from "@/components/Registration.vue";
import Logo from "@/components/Logo.vue";

export default {
  components: {
    Navigation,
    Registration,
    Logo,
  },
};
</script>

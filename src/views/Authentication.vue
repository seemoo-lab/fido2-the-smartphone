<template>
  <Navigation />
  <Logo />
  <Login />
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Login from "@/components/Login.vue";
import Logo from "@/components/Logo.vue";

export default {
  components: {
    Navigation,
    Login,
    Logo,
  },
};
</script>

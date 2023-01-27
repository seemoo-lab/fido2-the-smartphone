<template>
  <Navigation authenticated="true" />
  <TopSecret />
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import TopSecret from "@/components/TopSecret.vue";

export default {
  components: {
    Navigation,
    TopSecret,
  },
};
</script>

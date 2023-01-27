<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link v-if="authenticated" to="/">Logout</router-link>
    <span v-else>
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    authenticated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
#nav {
  height: 12vh;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>

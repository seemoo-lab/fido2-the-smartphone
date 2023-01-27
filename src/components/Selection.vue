<template>
  <div class="selection p-fluid">
    <Button class="button" label="Login" @click="login()" />
    <Button class="button" label="Register" @click="register()" />
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  name: "Selection",
  components: {
    Button,
  },
  methods: {
    login() {
      this.$router.push({
        path: "/login",
      });
    },
    register() {
      this.$router.push({
        path: "/register",
      });
    },
  },
};
</script>

<style scoped>
.selection {
  height: 34vh;
  width: 100%;
  padding-top: 4vh;
  display: flex;
  flex-direction: column;
}
.button {
  margin: 5pt 0 5pt 0;
  background-color: #cd6600;
  border-color: #cd6600;
  color: white;
}
</style>

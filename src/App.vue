<template>
  <!--<img alt="Vue logo" src="./assets/logo.png" />-->
  <router-view />
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

a {
  color: #cd6600;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #cd6600;
}
</style>

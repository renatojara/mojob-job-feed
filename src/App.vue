<template>
  <v-app id="app">
    <v-app-bar app id="app-bar">
      <img id="logo" alt="Mojob Logo" src="./assets/mojob_logo_on_light.svg" />
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
#app {
  background: #fafdfd;
}
#app-bar {
  position: absolute;
  height: 66px;
  left: 0px;
  right: 0px;
  top: 0px;
  background: #ffffff;
  box-shadow: none;
}

#logo {
  position: absolute;
  width: 105px;
  height: 56px;
  left: 4px;
  top: 5px;

  filter: drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.5));
}
</style>

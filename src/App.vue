<template>
  <div id="app">
    <transition name='fade'>
    <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
@import '/styles/colors';
body,html{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: linear-gradient($lightBlue 0%, $blue  100%);
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>

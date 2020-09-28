<template>
  <perfect-scrollbar class="route-scrollbar">
    <v-container>
      <transition name="route-transition" mode="out-in">
        <slot></slot>
      </transition>
    </v-container>
  </perfect-scrollbar>
</template>

<style>
.route-scrollbar {
  padding-bottom: 2rem;
  height: calc(100vh - 76px);
}

.route-transition-enter,
.route-transition-leave-to {
  opacity: 0;
  transform: translateY(-24px);
}

.route-transition-enter-active,
.route-transition-leave-active {
  transition: all 250ms ease;
}

.route-transition-enter-to,
.route-transition-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>
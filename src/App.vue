<script setup lang="ts">
import Navbar from "./components/navbar/navbar.vue";
</script>

<template>
  <Navbar />
  <div
    class="container pt-[65px] mt-4 flex justify-center flex-col mx-auto px-[24px]"
  >
    <router-view />
  </div>

  <toast />
</template>

<style scoped></style>

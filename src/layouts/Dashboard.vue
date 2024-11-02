<script setup lang="ts">
import NavButton from "@/components/NavButton.vue";
import Header from "./Header.vue";
</script>

<template>
  <div class="dashboard h-screen flex flex-col">
    <Header />

    <!-- Core section -->
    <div class="core flex-grow flex gap-x-3">
      <div class="navigation flex flex-col pl-5">
        <div class="nav my-2">
          <NavButton text="Demande" />
        </div>
        <div class="nav my-2">
          <NavButton text="Proformat" />
        </div>
        <div class="nav my-2 mt-auto">
          <NavButton text="Deconnexion" icon="pi pi-sign-out" />
        </div>
      </div>

      <div class="view flex-grow bg-gray-50 p-3">Hello</div>
    </div>
  </div>
</template>

<style scoped>
.navigation {
  width: 18%;
}
</style>

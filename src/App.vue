<script setup lang="ts">
import { getForms, queryForms, addForms } from "@/api/prospecting"

import { useRoute, useRouter } from "vue-router"

const root = document.querySelector(":root")
root.setAttribute("data-theme", "light")
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>

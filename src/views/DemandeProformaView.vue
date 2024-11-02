<script setup lang="ts">
import Title from "@/components/Title.vue";
import Container from "@/layouts/Container.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const navigateToDate = (date) => {
  router.push(`/proformat/${date}`);
};
</script>

<template>
  <Title text="Mes proformas" />
  <Container>
    <table class="table-auto w-full">
      <thead class="bg-gray-600 text-white">
        <tr>
          <th scope="col" class="px-4 py-2">Date</th>
          <th scope="col" class="px-4 py-2">Designation</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-gray-100">
          <Button text="Checker stock" @click="$router.push('/stock')" />
        </tr>

        <tr>
          <td
            class="border px-4 py-2 cursor-pointer"
            @click="navigateToDate('2024-11-01')"
          >
            2024-11-01
          </td>
          <td class="border px-4 py-2">Project Kickoff</td>
        </tr>
        <tr class="bg-gray-200">
          <td class="border px-4 py-2">2024-11-05</td>
          <td class="border px-4 py-2">Initial Design Review</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="border px-4 py-2">2024-11-10</td>
          <td class="border px-4 py-2">Development Phase Start</td>
        </tr>
      </tbody>
    </table>
  </Container>
</template>

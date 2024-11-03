<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Title from "@/components/Title.vue";
import Container from "@/layouts/Container.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const proformas = ref([]); // Pour stocker les données récupérées

const API_URL = 'http://localhost:8082/myStation/api'; // Remplacez par l'URL directe

const fetchProformas = async () => {
  try {
    const response = await fetch(`${API_URL}/proformats`); // Utilisez la constante
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des proformas");
    }
    const data = await response.json();
    proformas.value = data; // Stocker les données dans la référence
  } catch (error) {
    console.error("Erreur:", error.message);
  }
};

// Fonction pour regrouper les proformas par dateProformat
const groupedProformas = computed(() => {
  return proformas.value.reduce((acc, proforma) => {
    const date = proforma.dateDemande; // Utilisez 'dateProformat' comme clé
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(proforma.designation); // Ajoute la désignation à la date correspondante
    return acc;
  }, {});
});

const navigateToDate = (dateDemande) => {
  router.push(`/proformat/${dateDemande}`);
};

function formatDateToISO(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Récupérer les proformas lorsque le composant est monté
onMounted(fetchProformas);
</script>

<template>
  <Title text="Mes proformas" />
  <Container>
    <table class="table-auto w-full">
      <thead class="bg-blue-900 text-white">
        <tr>
          <th scope="col" class="px-4 py-2">Date</th>
          <th  scope="col" class="px-4 py-2">Etat finance</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(designations, dateProformat) in groupedProformas" 
          :key="dateProformat" 
          class="cursor-pointer"
          @click="navigateToDate(formatDateToISO(dateProformat))"
        >
          <td class="border px-4 py-2">{{ formatDateToISO(dateProformat) }}</td>
          <td class="border px-4 py-2"> En cours</td>
        </tr>
      </tbody>
    </table>
  </Container>
</template>

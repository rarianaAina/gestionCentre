<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Title from "@/components/Title.vue";
import Container from "@/layouts/Container.vue";

const route = useRoute();
const proformas = ref([]); // Pour stocker les données récupérées
const date = computed(() => route.params.date);

const API_URL = "http://localhost:8082/myStation/api/proformats/date"; // URL de l'API pour les proformas par date

// Fonction pour récupérer les proformas en fonction de la date
const fetchProformasByDate = async () => {
  try {
    const response = await fetch(`${API_URL}/${date.value}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des proformas");
    }
    const data = await response.json();
    proformas.value = data; // Stocker les données dans la référence
  } catch (error) {
    console.error("Erreur:", error.message);
  }
};

// Conversion d'un montant en texte
function numberToLetterMoney(amount) {
  if (amount === 0) return "zéro";
  let words = "";

  // Gérer les milliers
  if (amount >= 1000) {
    words += convertHundreds(Math.floor(amount / 1000)) + " mille ";
    amount %= 1000;
  }

  // Gérer les centaines
  if (amount > 0) {
    words += convertHundreds(amount);
  }

  return words.trim() + " Ariary";
}

function convertHundreds(amount) {
  const units = [
    "",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
  ];
  const tens = [
    "",
    "",
    "vingt",
    "trente",
    "quarante",
    "cinquante",
    "soixante",
    "soixante-dix",
    "quatre-vingt",
    "quatre-vingt-dix",
  ];

  let words = "";

  if (amount >= 100) {
    const hundredsCount = Math.floor(amount / 100);
    words += hundredsCount > 1 ? units[hundredsCount] + " cents " : "cent ";
    amount %= 100;
  }

  if (amount >= 20) {
    words +=
      tens[Math.floor(amount / 10)] + (amount % 10 === 0 ? "" : "-") + " ";
    amount %= 10;
  }

  if (amount > 0) {
    words += units[amount] + " ";
  }

  return words.trim();
}

// Récupérer les proformas lors du montage du composant
onMounted(fetchProformasByDate);
</script>

<template>
  <Title text="Proforma" />
  <Container>
    <div class="container">
      <div class="flex justify-end">
        <div>
          <Title text="Fournisseurs COMPTA" />
          <span
            >Date: <span class="text-xl font-semibold">{{ date }}</span></span
          >
        </div>
      </div>

      <table class="table-auto w-full mt-2">
        <thead class="bg-blue-900 text-white">
          <tr>
            <th scope="col" class="px-4 py-2">Quantité</th>
            <th scope="col" class="px-4 py-2">Désignation</th>
            <th scope="col" class="px-4 py-2">Prix unitaire</th>
            <th scope="col" class="px-4 py-2">Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(proforma, index) in proformas"
            :key="index"
            :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'"
          >
            <td class="border px-4 py-2">{{ proforma.QteDemande }}</td>
            <td class="border px-4 py-2">{{ proforma.Produit }}</td>
            <td class="border px-4 py-2">{{ proforma.PrixProduit }} Ar</td>
            <td class="border px-4 py-2">
              {{ (proforma.QteDemande * proforma.PrixProduit).toFixed(1) }} Ar
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="bg-gray-50 text-black">
            <td colspan="3" class="px-4 py-2 text-right font-bold">Total</td>
            <td class="border px-4 py-2 font-bold">
              {{
                proformas
                  .reduce(
                    (total, item) => total + item.QteDemande * item.PrixProduit,
                    0
                  )
                  .toFixed(1)
              }}
              Ar
            </td>
          </tr>
        </tfoot>
      </table>

      <div
        class="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
      >
        Arrêtée à la somme de:
        <span class="text-xl font-semibold text-gray-800">
          {{
            numberToLetterMoney(
              proformas.reduce((total, item) => total + item.QteDemande * item.PrixProduit, 0)
            )
          }}
        </span>
      </div>
    </div>
  </Container>
</template>

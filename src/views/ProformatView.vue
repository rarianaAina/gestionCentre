<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Title from "@/components/Title.vue";
import Container from "@/layouts/Container.vue";

const route = useRoute();

const date = computed(() => route.params.date);

function numberToLetterMoney(amount) {
  if (amount === 0) return "zéro";

  let words = "";

  // Handle thousands
  if (amount >= 1000) {
    words += convertHundreds(Math.floor(amount / 1000)) + " mille ";
    amount %= 1000;
  }

  // Handle hundreds
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
            <th scope="col" class="px-4 py-2">Designation</th>
            <th scope="col" class="px-4 py-2">Prix unitaire</th>
            <th scope="col" class="px-4 py-2">Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-gray-100">
            <td class="border px-4 py-2">5</td>
            <td class="border px-4 py-2">Produit A</td>
            <td class="border px-4 py-2">10.00 €</td>
            <td class="border px-4 py-2">50.00 €</td>
          </tr>
          <tr class="bg-gray-200">
            <td class="border px-4 py-2">3</td>
            <td class="border px-4 py-2">Produit B</td>
            <td class="border px-4 py-2">20.00 €</td>
            <td class="border px-4 py-2">60.00 €</td>
          </tr>
          <tr class="bg-gray-100">
            <td class="border px-4 py-2">2</td>
            <td class="border px-4 py-2">Produit C</td>
            <td class="border px-4 py-2">15.00 €</td>
            <td class="border px-4 py-2">30.00 €</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="bg-gray-50 text-black">
            <td colspan="3" class="px-4 py-2 text-right font-bold">Total</td>
            <td class="border px-4 py-2 font-bold">140.00 €</td>
          </tr>
        </tfoot>
      </table>

      <div
        class="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
      >
        Arrêtée à la somme de:
        <span class="text-xl font-semibold text-gray-800">
          {{ numberToLetterMoney(229) }}
        </span>
      </div>
    </div>
  </Container>
</template>

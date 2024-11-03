<script setup lang="ts">
import Button from "@/components/Button.vue";
import Title from "@/components/Title.vue";
import Container from "@/layouts/Container.vue";
import numberToLetterMoney from "@/utils/convertion";
</script>

<template>
  <Title text="Proforma" />
  <Container>
    <div class="container">
      <div class="flex justify-end">
        <div>
          <Title text="Fournisseurs COMPTA" />
          <span
            >Date:
            <span class="text-xl font-semibold">{{ "2024-11-20" }}</span></span
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
        <!-- <tbody> -->
        <!--   <tr -->
        <!--     v-for="(proforma, index) in proformas" -->
        <!--     :key="index" -->
        <!--     :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'" -->
        <!--   > -->
        <!--     <td class="border px-4 py-2">{{ proforma.QteDemande }}</td> -->
        <!--     <td class="border px-4 py-2">{{ proforma.Produit }}</td> -->
        <!--     <td class="border px-4 py-2">{{ proforma.PrixProduit }} Ar</td> -->
        <!--     <td class="border px-4 py-2"> -->
        <!--       {{ (proforma.QteDemande * proforma.PrixProduit).toFixed(1) }} Ar -->
        <!--     </td> -->
        <!--   </tr> -->
        <!-- </tbody> -->
        <!-- <tfoot> -->
        <!--   <tr class="bg-gray-50 text-black"> -->
        <!--     <td colspan="3" class="px-4 py-2 text-right font-bold">Total</td> -->
        <!--     <td class="border px-4 py-2 font-bold"> -->
        <!--       {{ -->
        <!--         proformas -->
        <!--           .reduce( -->
        <!--             (total, item) => total + item.QteDemande * item.PrixProduit, -->
        <!--             0, -->
        <!--           ) -->
        <!--           .toFixed(1) -->
        <!--       }} -->
        <!--       Ar -->
        <!--     </td> -->
        <!--   </tr> -->
        <!-- </tfoot> -->
      </table>

      <div
        class="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
      >
        Arrêtée à la somme de:
        <span class="text-xl font-semibold text-gray-800">
          {{
            numberToLetterMoney(
              // proformas.reduce(
              //   (total, item) => total + item.QteDemande * item.PrixProduit,
              //   0,
              // ),
              5000,
            )
          }}
        </span>
      </div>
    </div>
    <div class="flex justify-between px-5 mt-6">
      <div class="max-w-sm mb-8 w-1/2">
        <Button
          text="Retour"
          variant="neutral"
          @click="$router.push('/demande-proforma')"
        />
      </div>
      <div class="max-w-sm mb-8 w-1/2">
        <!-- <Button -->
        <!--   v-if="etatStore.etat === 'Validée'" -->
        <!--   text="Livrer" -->
        <!--   @click="demander" -->
        <!-- /> -->
        <Button text="Livrer" />
      </div>
    </div>
  </Container>
</template>

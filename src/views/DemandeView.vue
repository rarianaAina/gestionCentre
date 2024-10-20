<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { reactive, ref } from "vue";
const items = reactive({
  list: [
    { rubrique: "Item 1", quantite: 10, raison: "Reason 1", etat: "Available" },
    {
      rubrique: "Item 2",
      quantite: 5,
      raison: "Reason 2",
      etat: "Out of Stock",
    },
    { rubrique: "Item 3", quantite: 20, raison: "Reason 3", etat: "Available" },
  ],
});

const initialForm = {
  rubrique: "",
  quantite: 0,
  raison: "",
  departement: "",
};

const form = reactive({
  ...initialForm,
});

const handleSubmit = () => {
  const newDemand = {
    rubrique: form.rubrique,
    quantite: form.quantite,
    raison: form.raison,
    departement: form.departement,
  };

  console.log("Form submitted:", newDemand);
  closeModal(); // Close modal after submission
  Object.assign(form, initialForm);
};

const isModalOpen = ref(false); // State to control modal visibility

const openModal = () => {
  isModalOpen.value = true; // Open the modal
};

const closeModal = () => {
  isModalOpen.value = false; // Close the modal
};
</script>
<template>
  <div class="container m-auto max-w-4xl overflow-x-auto mt-8">
    <div class="max-w-sm mb-8">
      <Button text="Faire une demande" @click="openModal" />
    </div>
    <table class="min-w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 px-4 py-2">Rubrique</th>
          <th class="border border-gray-300 px-4 py-2">Quantité</th>
          <th class="border border-gray-300 px-4 py-2">Raison</th>
          <th class="border border-gray-300 px-4 py-2">État</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items.list" :key="index">
          <td class="border border-gray-300 px-4 py-2">{{ item.rubrique }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.quantite }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.raison }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.etat }}</td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 class="text-xl font-bold mb-4">Faire une demande</h2>
        <Input
          v-model="form.rubrique"
          label="Rubrique"
          placeholder="Entrer rubrique"
        />
        <Input
          v-model="form.quantite"
          label="Quantité"
          type="number"
          placeholder="Entrer quantité"
        />
        <Input
          v-model="form.raison"
          label="Raison"
          placeholder="Entrer raison"
        />
        <Input
          v-model="form.departement"
          label="Choix de Département"
          placeholder="Entrer departement"
        />

        <div class="flex gap-5 mt-4">
          <Button text="Annuler" @click="closeModal" />
          <Button text="Ajouter" @click="handleSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

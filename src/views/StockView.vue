<script setup>
import { reactive, onMounted } from "vue";
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/userStore";

// Importation du store utilisateur
const userStore = useUserStore();
console.log(userStore.role);

// Déclaration de stocks comme une variable réactive
const stock = reactive({
  list: [],
});

// Fonction pour récupérer les stocks via l'API
const fetchStocks = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stocks`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des stocks");
    }
    const data = await response.json();
    stock.list = data; // Assigner les données récupérées à stock.list
  } catch (error) {
    console.error("Erreur:", error.message);
  }
};

// Appel de la fonction fetchStocks lors du montage du composant
onMounted(() => {
  fetchStocks();
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Liste des stocks</h1>
    <Button text="Mes Demandes" @click="$router.push('/demande')" />
    
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nom du produit</th>
          <th scope="col">Description</th>
          <th scope="col">Quantité</th>
        </tr>
      </thead>
      <tbody>
        <!-- Boucle sur la liste des stocks -->
        <tr v-for="(item, index) in stock.list" :key="index">
          <td>{{ item.NOM_PRODUIT }}</td>
          <td>{{ item.QTE }}</td>
          <td>{{ item.DESCRIPTION }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";


const router = useRouter();
const userStore = useUserStore();
console.log(userStore.idEmployee);

// Réactive liste des items récupérés via l'API
const items = reactive({
  list: [],
});

// Déclaration de departments comme une variable réactive
const departments = reactive({
  list: [],
});

// Fonction pour récupérer les données depuis l'API
const fetchDemandes = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/demandes`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();
    items.list = data; // Assigner les données récupérées à items.list
  } catch (error) {
    console.error("Erreur:", error.message);
  }
};

// Fonction pour récupérer les départements depuis l'API
const fetchDepartments = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/departements`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des départements");
    }
    const data = await response.json();
    departments.list = data; // Assigner les données récupérées à departments.list
  } catch (error) {
    console.error("Erreur:", error.message);
  }
};

// Récupérer les données lorsque le composant est monté
onMounted(() => {
  fetchDemandes();
  fetchDepartments();
});


const initialForm = {
  rubrique: "",
  quantite: 0,
  raison: "",
  departement: "",
  questions: {
    q1: false,
    q2: false,
    q3: false,
    q4: false,
  },
};


const form = reactive({
  ...initialForm,
});

const handleSubmit = async () => {
  if (!form.questions.q1 || !form.questions.q2 || !form.questions.q3 || !form.questions.q4) {
    alert("Veuillez répondre à toutes les questions."); // Alerte si une question est manquante
    return; // Empêche la soumission
  }
  const newDemand = {
    demandes: [
      {
        idEmployee: userStore.id, // Assurez-vous que vous avez l'ID de l'employé ici
        rubriques: form.rubrique,
        qte: form.quantite,
        raison: form.raison,
        etat: '0', // Ou toute autre valeur par défaut
        departement: form.departement
        
      }
    ]
  };
  console.log('New Demand:', newDemand);
  console.log(userStore.idEmployee);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/demandes/inserer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDemand),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'insertion des demandes');
    }

    const result = await response.json();
    console.log(result.message);
    closeModal(); // Fermer le modal après l'ajout
    Object.assign(form, initialForm); // Réinitialiser le formulaire
    // Vous pouvez également recharger les demandes ici si nécessaire
  } catch (error) {
    console.error('Erreur:', error.message);
  }
};

const isModalOpen = ref(false); // State to control modal visibility

const openModal = () => {
  isModalOpen.value = true; // Open the modal
};

const closeModal = () => {
  isModalOpen.value = false; // Close the modal
};

const mapEtatToText = (etat) => {
  switch (etat) {
    case "0":
    case "1":
    case "2":
    case "3":
      return "En cours";
    case "-1":
      return "Refusée";
    case "4":
      return "Validée";
    default:
      return "Inconnu"; // Pour gérer les états non définis
  }
};
const handleLogout = () => {
  userStore.logout(); // Appeler la méthode de déconnexion dans le store
  router.push("/signin"); // Rediriger vers la page de connexion
};




</script>

<template>

    Test fournisseurs
</template>
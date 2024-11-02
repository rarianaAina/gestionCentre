<script setup>
import { reactive } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import Title from "@/components/Title.vue";

const uri = `${import.meta.env.VITE_API_URL}/auth/login`;
console.log(uri);

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
  user: "",
  password: "",
});

const handleSubmitAccueil = async () => {
  router.push("/");
};

const handleSubmit = async () => {
  const person = {
    user: form.user,
    password: form.password,
  };

  try {
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: person.user,
        password: person.password,
      }),
      credentials: "include", // Inclut les cookies de session
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Login failed");
    }

    const data = await response.json();
    userStore.login(data.role); // Connexion de l'utilisateur avec son rôle

    // Vérifie le rôle et redirige vers la route appropriée
    if (data.role === "dep_achat") {
      router.push("/demande");
    } else if (data.role === "employee") {
      router.push("/demandeEmployee");
    } else if (data.role === "finance") {
      router.push("/demandeFinance"); // Valeur par défaut ou autre rôle
    } else if (data.role === "Chef_de_dep") {
      router.push("/demandeChefDep");
    } else if (Date.role === "fournisseur") {
      router.push("/proformatFournisseur");
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <!-- Form Card -->
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <!-- Title -->
      <div class="text-center mb-6">
        <Title text="Connexion" class="text-2xl font-semibold text-gray-800" />
      </div>

      <!-- Form Fields -->
      <div class="space-y-2">
        <Input
          label="Utilisateur"
          type="text"
          placeholder="Entrer le nom"
          v-model="form.user"
          class="w-full"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Entrer le mot de passe"
          v-model="form.password"
          class="w-full"
        />
      </div>

      <!-- Submit Button -->
      <div class="mt-6 text-center">
        <Button text="Se connecter" @click="handleSubmit" class="w-full" />
      </div>
    </div>
  </div>
</template>

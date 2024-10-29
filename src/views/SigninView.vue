<script setup>
import { reactive } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const uri = `${import.meta.env.VITE_API_URL}/auth/login`;
console.log(uri)

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
  user: "",
  password: "",
});

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
      credentials: 'include' // Inclut les cookies de session
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Login failed");
    }

    const data = await response.json();
    userStore.login(data.role); // Connexion de l'utilisateur avec son rôle

    // Vérifie le rôle et redirige vers la route appropriée
    if (data.role === 'dep_achat') {
      router.push("/demande");
    } else if (data.role === 'employee') {
      router.push("/demandeEmployee");
    } else if(data.role === 'finance'){
      router.push("/demandeFinance"); // Valeur par défaut ou autre rôle
    } else if(data.role === 'Chef_de_dep') {
      router.push('/demandeChefDep');
    }
  } catch (error) {
    console.log(error);
    return;
  }
};


</script>

<template>
  <div>
    <h1 class="text-4xl mb-3">Connexion</h1>
  </div>

  <div class="container m-auto w-96 p-8">
    <div class="mb-2">
      <Input
        label="Utilisateur"
        type="text"
        placeholder="Entrer le nom"
        v-model="form.user"
      />
    </div>
    <div class="mb-2">
      <Input
        label="Password"
        type="password"
        placeholder="Entre le mot de passe"
        v-model="form.password"
      />
    </div>
    <div class="mt-4">
      <Button text="Se connecter" @click="handleSubmit" />
    </div>
  </div>
</template>

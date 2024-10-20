<script setup>
import { reactive } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const uri = `${import.meta.env.VITE_API_URL}/auth/login`;

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
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Login failed");
    }

    const data = await response.json();
    userStore.login(data.role);
    router.push("/demande");
  } catch (error) {
    console.log(error);
    return;
  }
};
</script>

<template>
  <div class="container m-auto max-w-2xl p-8">
    <div class="mb-4">
      <Input
        label="Utilisateur"
        type="text"
        placeholder="Entrer le nom"
        v-model="form.user"
      />
    </div>
    <div class="mb-4">
      <Input
        label="Password"
        type="password"
        placeholder="Entre le mot de passe"
        v-model="form.password"
      />
    </div>
    <div>
      <Button text="Se connecter" @click="handleSubmit" />
    </div>
  </div>
</template>

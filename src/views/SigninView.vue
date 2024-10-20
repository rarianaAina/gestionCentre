<script setup>
import { reactive } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";

const form = reactive({
  user: "",
  password: "",
});

const handleSubmit = () => {
  const person = {
    user: form.user,
    password: form.password,
  };

  console.log(person);
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

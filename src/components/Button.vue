<script setup>
defineProps({
  text: {
    type: String,
    default: "Boutton",
  },
});
</script>
<template>
  <button
    class="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
    type="submit"
  >
    {{ text }}
  </button>
</template>

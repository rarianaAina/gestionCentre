<script setup>
defineProps({
  text: {
    type: String,
    default: "Boutton", // Default button text
  },
  bgColor: {
    type: String,
    default: "transparent", // Default background color
  },
  hoverColor: {
    type: String,
    default: "bg-blue-800", // Default hover color
  },
});
</script>
<template>
  <button
    :class="`text-black ${bgColor} hover:${hoverColor} hover:text-white py-3 px-5 rounded-md`"
  >
    {{ text }}
  </button>
</template>

<template>
  <iframe
    class="w-60 sm:w-auto mx-auto"
    frameborder="no"
    border="0"
    marginwidth="0"
    marginheight="0"
    height="86"
    :src="src"
  ></iframe>
</template>

<script>
export default {
  props: ["src"]
};
</script>

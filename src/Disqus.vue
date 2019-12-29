<template>
  <div class="box mt-20 p-4 md:p-6 bg-gray-lighter opacity-85 rounded-lg" v-if="loaded">
    <div id="disqus_thread" ref="disqus"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios
      .get("https://disqus.com/next/config.json")
      .then(response => (this.loaded = response.status == 200));
  },
  data() {
    return {
      loaded: false
    };
  }
};
</script>

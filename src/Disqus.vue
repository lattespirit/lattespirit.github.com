<template>
  <div>
    <div class="box mt-20 p-4 md:p-6 bg-gray-lighter opacity-85 rounded-lg" v-if="loaded">
      <div id="disqus_thread" ref="disqus"></div>
    </div>
    <p
      class="flex justify-center items-center box my-6 md:my-8 py-1 py-2 border-l-4 border-purple-light bg-gray-lighter text-purple-light text-xs md:text-base text-center rounded"
      v-if="! loaded"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4 sm:w-6 sm:h-6 mx-2 sm:mx-4 feather feather-info"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <span>{{ message }}</span>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios
      .get("https://disqus.com/next/config.json")
      .then(response => (this.loaded = response.status == 200))
      .catch(
        error => (this.message = "朋友，加载 Disqus 评论框就差那一步了 :)")
      );
  },
  data() {
    return {
      loaded: false,
      message: "Disqus 评论框加载中。。。"
    };
  }
};
</script>

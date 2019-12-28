<template>
  <div v-if="opened" class="absolute inset-0 w-full h-full">
    <div class="relative mt-6 sm:mt-8 lg:mt-20">
      <div class="absolute box inset-x-0 z-10">
        <div class="flex items-center">
          <input
            type="text"
            name="search"
            class="w-full px-4 py-1 sm:py-2 text-sm sm:text-base rounded-full outline-none mr-2"
            placeholder="Search..."
            v-model="input"
            ref="input"
          />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6 sm:w-8 sm:h-8 stroke-current text-white feather feather-x-circle"
            @click="opened = false"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>

        </div>

        <div v-if="keyword.length > 0" class="w-full bg-white rounded-lg mt-4 sm:mt-8 px-4 overflow-y-auto">
          <div
            class="flex justify-between items-center mx-2 sm:mx-4 my-2 py-2 border-b last:border-b-0 border-gray-light"
            v-for="post in posts"
            :key="post.url"
          >
            <div class="w-40 sm:w-auto">
              <a
                class="text-sm sm:text-base text-left font-bold block"
                :href="post.url"
              >{{ post.title }}</a>
            </div>
            <div>
              <p class="text-xs">{{ post.date }}</p>
            </div>
          </div>
          <div v-if="posts.length == 0" class="rounded-lg my-6 text-sm sm:text-base text-center">
            <p>
              匆匆的<span class="font-bold text-purple-dark">搜索结果</span>转眼已消逝
            </p>
            <p class="mt-4">有几多青春美丽</p>
          </div>
          <hr class="mt-8 text-purple-dark" />
          <p class="my-4 text-sm text-center">
            Search by
            <a
              class="text-purple-dark font-bold"
              href="https://fusejs.io"
              target="_blank"
            >@fuse.js</a>
          </p>
        </div>
      </div>
    </div>
    <button
      class="fixed inset-0 w-full h-full bg-black opacity-50 outline-none cursor-default"
      @click="opened = false"
    ></button>
  </div>
</template>

<script>
import axios from "axios";
import Fuse from "fuse.js";

export default {
  name: "Search",
  created() {
    this.handleEscape();

    this.fetchJson();
  },
  updated() {
    if (this.opened) {
      this.$refs.input.focus();
    }
  },
  computed: {
    keyword() {
      return this.input.toLowerCase();
    },
    posts() {
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 1000,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["title", "content"]
      };

      if (this.articles) {
        return new Fuse(this.articles, options).search(this.keyword);
      }

      return [];
    }
  },
  data() {
    return {
      input: "",
      opened: false,
      articles: null
    };
  },
  methods: {
    handleEscape() {
      const handleEscape = e => {
        if (e.key === "Esc" || e.key === "Escape") {
          this.opened = false;
        }

        if (e.key === "s") {
          this.opened = true;
        }
      };

      document.addEventListener("keyup", handleEscape);

      this.$once("hook:beforeDestroy", () => {
        document.removeEventListener("keyup", handleEscape);
      });
    },
    fetchJson() {
      axios
        .get("/search.json")
        .then(response => (this.articles = response.data.posts));
    }
  }
};
</script>

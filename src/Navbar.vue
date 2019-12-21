<template>
  <header class="flex justify-between items-center box py-6">
    <a
      class="text-white inline-block text-xl x:text-2xl font-extrabold"
      href="/"
      >Lattespirit</a
    >

    <div class="flex justify-center items-center md:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="text-white w-6 h-6 feather feather-menu"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        @click="isNavBarOpened = true"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </div>

    <div class="hidden md:block self-end">
      <a class="text-white inline-block mr-6" href="/">Home</a>
      <a class="text-white inline-block mr-6" href="/archives">Archives</a>
      <a class="text-white inline-block mr-6" href="/testimonials"
        >Testimonials</a
      >
      <a class="text-white inline-block mr-6" href="/about">About</a>
    </div>

    <div
      class="fixed w-full h-full max-h-full inset-0 bg-purple-dark z-10"
      v-if="isNavBarOpened"
    >
      <div class="flex justify-between items-center box py-6">
        <a
          class="invisible text-white inline-block text-xl x:text-2xl font-extrabold"
          href="/"
          >Lattespirit</a
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-6 h-6 text-white feather feather-x"
          @click="isNavBarOpened = false"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
      <div class="w-20 mx-auto text-center">
        <a href="/" class="block text-white py-4">Home</a>
        <a href="/archives" class="block text-white py-4">Archives</a>
        <a href="/testimonials" class="block text-white py-4">Testimonials</a>
        <a href="/about" class="block text-white py-4">About</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isNavBarOpened: false
    };
  }
};
</script>

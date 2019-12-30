<template>
  <div ref="carousel">
    <slot></slot>
  </div>
</template>

<script>
import Flickity from "flickity";
import "flickity-imagesloaded";
import "flickity/dist/flickity.min.css";

export default {
  mounted() {
    new Flickity(this.$refs.carousel, {
      autoPlay: true,
      pageDots: false,
      imagesLoaded: true,
    });
  },
};
</script>

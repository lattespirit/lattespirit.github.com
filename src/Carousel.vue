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
  props: ['imaegs'],
  mounted() {
    this.flkty = new Flickity(this.$refs.carousel, {
      cellAlign: "left",
      contain: true,
      pageDots: false,
      imagesLoaded: true
    });
  },
  data() {
    return {
      flkty: null
    };
  }
};
</script>

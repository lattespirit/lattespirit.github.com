<script>
import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(Physics2DPlugin);

export default {
  name: "Fireworks",
  render(createElement) {
    let children = [];
    for (var i = 0; i < 50; i++) {
      children.push(
        createElement("div", {
          class:
            "w-1 h-1 rounded-full absolute " +
            "bg-" +
            this.colors[Math.floor(Math.random() * this.colors.length)] +
            "-" +
            this.levels[Math.floor(Math.random() * this.levels.length)]
        })
      );
    }
    return createElement(
      "div",
      { class: "relative w-2 h-2", ref: "container" },
      children
    );
  },
  mounted() {
    for (let flame of this.$refs.container.children) {
      gsap.to(flame, {
        duration: 1.5,
        repeat: -1,
        physics2D: {
          velocity: Math.random() * 100 + 50,
          angle: Math.floor(Math.random() * 360),
          gravity: 300
        },
        opacity: 0
      });
    }
  },
  data() {
    return {
      colors: ["red", "orange", "yellow", "green", "purple", "pink"],
      levels: ["100", "200", "300", "400", "500", "600", "700", "800"]
    };
  }
};
</script>

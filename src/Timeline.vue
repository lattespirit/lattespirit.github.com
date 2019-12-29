<template>
  <div class="w-76 md:w-100 lg:w-200 mx-auto x:w-auto md:mx-auto x:mx-6 my-16">
    <p class="text-white text-center text-xl lg:text-3xl font-bold">这些年</p>
    <div class="hidden lg:flex justify-between items-center mt-16">
      <div class="flex flex-col w-80">
        <p class="text-white text-left text-3xl font-bold">{{ selected.date }}</p>
        <div
          class="w-full flex-grow bg-gray-lighter lg:bg-transparent opacity-85 rounded-lg text-gray-darkest lg:text-white text-sm lg:text-base px-4 py-2 lg:p-0 lg:mt-4"
        >
          <p class="text-left font-bold" v-html="selected.content"></p>
        </div>
      </div>
      <div class="flex w-100 h-80">
        <div class="relative w-80" v-if="selected.date == '2012-07-25'">
          <img
            class="absolute bottom-0 rounded object-contain"
            :src="this.site + '/assets/about/v1.png'"
            alt="v1"
            style="animation: v1 2s linear 1s infinite alternate both;"
          />
          <div>
            <Fireworks />
          </div>
        </div>
        <div class="relative w-80" v-else-if="selected.date == '2014-01-28'">
          <img
            class="absolute bottom-0 rounded"
            :src="this.site + '/assets/about/v2.png'"
            alt="v1"
            style="animation: v1 2s linear 1s infinite alternate both;"
          />
        </div>
        <div class="flex flex-col relative w-50 red" v-else-if="selected.date == '2019-12-29'">
          <Fireworks />
          <img
            class="absolute bottom-0 rounded"
            :src="this.site + '/assets/about/v3-typography.png'"
            alt="v3-typography"
            style="animation: typography 2s linear 1s infinite alternate both;"
          />
          <img
            class="absolute right-0 bottom-0 rounded"
            :src="this.site + '/assets/about/v3-figma.png'"
            alt="v3-figma"
            style="animation: figma 2s linear 0s infinite alternate both;"
          />
          <Fireworks style="transform: translate(300px)" />
        </div>
        <div v-else class="flex justify-center items-center w-full h-full">
          <img
            class="w-60"
            :src="selected.src"
            style="animation: general 1s linear 0s infinite alternate both;"
          />
        </div>
      </div>
    </div>

    <div class="lg:flex lg:justify-between text-white">
      <div class="flex mt-4" v-for="event in events" :key="event.date">
        <div class="lg:hidden flex w-full">
          <span class="w-28 text-white text-xs text-left x:mr-4">{{ event.date }}</span>
          <div
            class="w-full flex-grow bg-gray-lighter opacity-85 rounded-lg text-xs text-left text-gray-darkest px-4 py-2"
            v-html="event.content"
          ></div>
        </div>
        <div
          class="hidden lg:flex flex-col justify-center items-center w-32 mt-8 py-4 rounded-lg cursor-default font-bold"
          :class="{ 'text-purple-light bg-gray-light': event.selected, 'text-white bg-purple-light': ! event.selected }"
          @mouseover="select(event)"
        >
          <span class="block text-5xl">{{ event.day }}</span>
          <span class="block text-lg">{{ event.year }}-{{ event.month }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fireworks from "./Fireworks.vue";

export default {
  components: { Fireworks },
  props: {
    site: {
      type: String,
      default: "https://www.lattespirit.com"
    }
  },
  methods: {
    select(hovered) {
      this.events.forEach(
        event => (event.selected = hovered.date === event.date)
      );
    }
  },
  computed: {
    selected() {
      return this.events
        .filter(event => event.selected)
        .map(event => {
          event.src = this.site + "/" + event.asset;
          return event;
        })[0];
    }
  },
  data() {
    return {
      events: [
        {
          date: "2012-07-25",
          year: "2012",
          month: "07",
          day: "25",
          content:
            "前身域名 lattespirit.com.cn，一年之后转成 <span class='text-pink-dark font-bold underline'>lattespirit.com</span>，博客第一次由 WordPress 驱动上线",
          selected: true
        },
        {
          date: "2014-01-28",
          year: "2014",
          month: "01",
          day: "28",
          content:
            "博客迁至 Github ，由 Jekyll 驱动，使用 Bootstrap v2 设计极简风格的界面",
          selected: false,
          asset: "/assets/about/Octocat.png"
        },
        {
          date: "2015-10-20",
          year: "2015",
          month: "10",
          day: "20",
          content: "将第三方评论框由多说迁移至 Disqus",
          selected: false,
          asset: "/assets/about/disqus.png"
        },
        {
          date: "2017-02-04",
          year: "2017",
          month: "02",
          day: "04",
          content:
            "博客前端框架 Bootstrap 版本升级至 v3，优化导航栏区分移动端和 PC 端，并增加整站搜索功能，按下 <span class='px-1 bg-pink-dark text-white rounded'>s</span> 键调出搜索框",
          selected: false,
          asset: "/assets/about/bootstrap.svg"
        },
        {
          date: "2019-12-29",
          year: "2019",
          month: "12",
          day: "29",
          content: "重构整站 UI，v3.0 上线，增加 <a class='text-pink-dark font-bold underline' href='/testimonials'>Testimonials</a>, <a class='text-pink-dark font-bold underline' href='/uses' >Uses</a> 和 <a class='text-pink-dark font-bold underline' href='/typography'>Typography</a>(可通过右键点击头部 Logo 进入) 页面",
          selected: false,
          asset: "/assets/about/v3.png"
        }
      ]
    };
  }
};
</script>

<style>
@keyframes general {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-20px);
  }
}

@keyframes v1 {
  0% {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    transform: translate(80px, -70px) rotate(20deg) skew(20deg);
  }
  100% {
    box-shadow: 0 50px 5px rgba(0, 0, 0, 0.1);
    transform: translate(80px, -90px) rotate(20deg) skew(20deg);
  }
}

@keyframes figma {
  0% {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    transform: translate(80px, -30px) rotate(20deg) skew(20deg);
  }
  100% {
    box-shadow: 0 50px 5px rgba(0, 0, 0, 0.1);
    transform: translate(80px, -60px) rotate(20deg) skew(20deg);
  }
}

@keyframes typography {
  0% {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    transform: translate(160px, -80px) rotate(20deg) skew(20deg);
  }
  100% {
    box-shadow: 0 50px 5px rgba(0, 0, 0, 0.1);
    transform: translate(160px, -110px) rotate(20deg) skew(20deg);
  }
}
</style>

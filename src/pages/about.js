import React from "react";
import Head from "../components/Head";
import Layout from "../components/Layout";

export default () => (
  <Layout>
    <Head title="About" />
    <div className="w-64 mx-auto x:w-auto x:mx-10 mt-10 lg:flex lg:flex-row-reverse lg:w-180 lg:mx-auto">
      <img
        className="w-20 h-20 lg:w-40 lg:h-40 mx-auto rounded-full object-cover object-center shadow-2xl lg:mr-0"
        src="/lattespirit.jpg"
        alt="lattespirit"
      />
      <div className="mt-4 md:w-80 mx-auto lg:w-100">
        <h1 className="text-center text-white lg:text-left lg:text-3xl font-bold">
          Jeffrey Yeung
        </h1>
        <p className="text-center text-gray text-xs lg:text-left lg:text-sm mt-2">
          Developer, Fake Designer
        </p>
        <p className="text-white text-sm mt-4">
          头像来源于{" "}
          <a
            className="text-pink-dark underline"
            href="https://http.cat"
            target="_blank"
            rel="noopener noreferrer"
          >
            HTTP Cats
          </a>{" "}
          代表{" "}
          <a
            className="text-pink-dark underline"
            href="https://http.cat/307"
            target="_blank"
            rel="noopener noreferrer"
          >
            307
          </a>{" "}
          状态码的猫，当时学到该状态码时遇到的，一用就用了好久，后来才知道她是
          <a
            className="text-pink-dark underline"
            href="https://zh.wikipedia.org/wiki/%E5%B0%8F%E7%8E%89_(%E8%B2%93)"
            target="_blank"
            rel="noopener noreferrer"
          >
            站长小玉
          </a>
          ，现已在喵星。
        </p>
      </div>
    </div>

    <div className="mx-4 mt-8 md:w-100 md:mx-auto mt-20 lg:mt-40 lg:flex lg:w-200 lg:mx-auto lg:flex lg:justify-between">
      <div className="flex justify-center items-center lg:w-100 lg:h-60 lg:self-start block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 lg:w-36 lg:h-36 text-white feather feather-coffee"
        >
          <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
        </svg>
      </div>
      <div className="w-64 mx-auto x:w-72 x:mx-10 sm:w-auto lg:mx-0 lg:w-full lg:h-60 lg:flex lg:flex-col lg:justify-center lg:items-end">
        <div className="lg:w-80">
          <p className="text-white text-xl lg:text-2xl text-center mt-6 lg:mt-0 font-bold">
            关于 Lattespirit
          </p>
          <p className="text-gray-light text-sm lg:text-base mt-4">
            <span className="text-pink-dark">拿铁精神</span>
            的意思，拥有拿铁精神的人，性情随和，热爱生活，不需要丰富的物质，追求自由和内心的满足，这是我对{" "}
            <span className="text-pink-dark">lattespirit</span>{" "}
            的理解，也希望这样生活。本博只用于个人对生活的一些记录，并不是介绍拿铁或者讲述如何泡咖啡，只是单纯地被这样的精神吸引。
          </p>
          <p className="text-gray-light text-sm lg:text-base mt-4">
            今时今日，拿铁已经多了一些解读，即撸铁健身。人近中年，应该更加注重自己的身体，健身也成为了生活的一部分。
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

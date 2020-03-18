import React from "react";
import Head from "../components/Head";
import uses from "../content/uses.yaml";
import Layout from "../components/Layout";

export default () => (
  <Layout>
    <Head title="Uses" />
    <div className="box mt-4">
      <div className="p-4 sm:p-6 md:px-12 bg-gray-lighter opacity-85 rounded-lg">
        <p className="text-xl lg:text-2xl font-bold text-center">装备</p>
        <p className="text-sm lg:text-lg my-2 lg:my-8 mx-2 lg:text-center">
          欢迎来到我的使用装备页面，这里记录了我日常中用到的硬件与软件。
        </p>

        {uses.areas.map(area => {
          return (
            <div className="my-4" key={area.name}>
              <p className="text-lg font-bold py-2 border-b-2 border-purple-light">
                {area.name}
              </p>
              {area.items.map(item => {
                const itemClass =
                  item.description && item.link
                    ? "text-purple-light text-sm md:text-lg font-bold"
                    : "text-purple-light text-sm md:text-lg";
                const itemTitle = item.link ? (
                  <a class="text-purple-light" href={item.link}>
                    {item.title}
                  </a>
                ) : (
                  item.title
                );
                return (
                  <div
                    className="flex justify-between items-center py-2 md:py-3"
                    key={item.title}
                  >
                    <div className="flex-1">
                      <p className={itemClass}>{itemTitle}</p>
                      {item.description && (
                        <p className="text-xs md:text-base text-gray-darkest">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.image && (
                      <img
                        className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-center bg-cover ml-2 lg:ml-8"
                        src={"/images/uses/" + item.image}
                        alt={item.image}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  </Layout>
);

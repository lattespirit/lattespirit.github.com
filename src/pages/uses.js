/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import Head from '../components/Head';

const Uses = ({ data }) => {
  const { edges } = data.allUsesJson;
  return (
    <>
      <Head title="Uses" />
      <div className="box mt-4">
        <div className="p-4 sm:p-6 md:px-12 bg-gray-lighter opacity-85 rounded-lg">
          <p className="text-xl lg:text-2xl font-bold text-center">装备</p>
          <p className="text-sm lg:text-lg my-2 lg:my-8 mx-2 lg:text-center">
            欢迎来到我的使用装备页面，这里记录了我日常中用到的硬件与软件。
          </p>

          {edges.map((area) => (
            <div className="my-4" key={area.node.name}>
              <p className="text-lg font-bold py-2 border-b-2 border-purple-light">
                {area.node.name}
              </p>
              {area.node.items.map((item) => {
                const itemClass = item.description && item.link
                  ? 'text-purple-light text-sm md:text-lg font-bold'
                  : 'text-purple-light text-sm md:text-lg';
                const itemTitle = item.link ? (
                  <a className="text-purple-light" href={item.link}>
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
                    {item.image.path
                        && item.image.path.extension !== 'svg' && (
                          <GatsbyImage
                            image={item.image.path.childImageSharp.gatsbyImageData}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-center bg-cover ml-2 lg:ml-auto" />
                    )}
                    {item.image.path
                        && item.image.path.extension === 'svg' && (
                          <img
                            className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-center object-cover ml-2 lg:ml-auto"
                            src={item.image.path.publicURL}
                          />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          <span className="text-sm lg:text-base text-purple-dark">
            最后更新于:
            {' '}
          </span>
          <span className="w-48 px-2 py-1 rounded-full bg-purple-light font-bold text-gray-lightest text-xs lg:text-sm">
            2023-05-09
          </span>
        </div>
      </div>
    </>
  );
};

export const UsesQuery = graphql`query UsesQuery {
  allUsesJson {
    edges {
      node {
        items {
          image {
            path {
              childImageSharp {
                gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
              }
              extension
              publicURL
            }
          }
          description
          link
          title
        }
        name
      }
    }
  }
}`;

export default Uses;

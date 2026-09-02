import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import SiteHead from '../components/Head';

const renderImage = (image, title) => {
  if (!image) return null;

  if (image.extension === 'svg') {
    return (
      <img
        className="h-full w-full object-contain p-1.5"
        src={image.publicURL}
        alt={title}
        loading="lazy"
      />
    );
  }

  if (image.childImageSharp?.gatsbyImageData) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        className="h-full w-full"
        objectFit="contain"
        alt={title}
      />
    );
  }

  return null;
};

const Uses = ({ data }) => {
  const { edges } = data.allUsesJson;

  return (
    <>
      <div className="box mt-4">
        <div className="soft-panel p-4 sm:p-6 md:px-10 bg-gray-lighter rounded-2xl">
          <header className="text-center">
            <p className="text-xl lg:text-2xl font-bold tracking-tight text-purple-dark">
              装备
            </p>
            <p className="mt-1 sm:mt-2 text-sm lg:text-lg mx-2 text-gray-darkest">
              欢迎来到使用装备页面，这里记录了我日常中用到的硬件与软件。
            </p>
          </header>

          {edges.map((area) => (
            <section className="mt-6 md:mt-8" key={area.node.name}>
              <p className="flex items-center gap-2 text-lg font-semibold tracking-tight text-purple-dark">
                <span className="h-5 w-1 rounded-full bg-pink-dark" aria-hidden />
                {area.node.name}
              </p>
              <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 items-start gap-2.5 md:gap-3">
                {area.node.items.map((item) => {
                  const isRetired = Boolean(item.retired);
                  const itemTitle = item.link ? (
                    <a
                      className="text-purple-light hover:text-pink-dark transition-colors duration-200"
                      href={item.link}
                      rel="noreferrer"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="text-purple-light">{item.title}</span>
                  );

                  return (
                    <li
                      key={item.title}
                      className={`gear-card rounded-xl p-2.5 md:p-3 ${
                        isRetired ? 'gear-retired' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        {item.image && (
                          <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden">
                            {renderImage(item.image, item.title)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm md:text-base font-bold leading-snug">
                            {itemTitle}
                          </p>
                          {item.description && (
                            <p className="mt-0.5 text-xs md:text-sm text-gray-darkest leading-snug">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <footer className="mt-10 flex items-center justify-center gap-2 border-t border-purple-light/15 pt-4">
            <span className="text-sm lg:text-base text-gray-darker">
              最后更新于
            </span>
            <span className="text-sm lg:text-base font-semibold text-purple-dark tabular-nums">
              2026-09-02
            </span>
          </footer>
        </div>
      </div>
    </>
  );
};

export const Head = () => <SiteHead title="Uses" />;

export const UsesQuery = graphql`query UsesQuery {
  allUsesJson {
    edges {
      node {
        items {
          image {
            childImageSharp {
              gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
            }
            extension
            publicURL
          }
          description
          link
          title
          retired
        }
        name
      }
    }
  }
}`;

export default Uses;

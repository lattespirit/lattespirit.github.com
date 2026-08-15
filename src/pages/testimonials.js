import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import SiteHead from '../components/Head';

const Testimonials = () => {
  const data = useStaticQuery(graphql`
    query TestimonialQuery {
      file(relativePath: {eq: "testimonials/LanternD.png"}) {
        childImageSharp {
          gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
        }
      }
    }
  `);

  return (
    <>
      <p className="text-white text-center text-2xl md:text-3xl font-bold mt-4 md:mt-8 tracking-tight">
        What People Said...
      </p>
      <div className="w-68 md:w-96 mx-auto mt-8 rounded-2xl bg-gray-lighter/90 shadow-xl shadow-purple-dark/30 p-6 md:p-10">
        <svg
          width="34"
          height="25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1.444 24.146v-4.289c.639-.678 4.647-2.208 4.667-4.288.01-1.109-.225-3.49-4.667-3.51L2.611 1.144h10.5C12.81 19.627 9.885 23.845 1.444 24.146zM20.889 24.146v-4.289c.638-.678 4.647-2.208 4.667-4.288.01-1.109-.226-3.49-4.667-3.51l1.167-10.916h10.5c-.303 18.484-3.227 22.702-11.667 23.003z"
            fill="#4F239F"
            stroke="#4F239F"
            strokeWidth="1.56"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-left text-sm md:text-lg mt-6 md:mt-8 text-gray-darkest leading-relaxed">
          This static website template by Lattespirit is just FANTASTIC! The
          responsive design hosts all the devices, either PC or tablet, or
          phones, like a charm, which delivers my/your/the blog content in a
          seamless and consistent way. I&apos;m really into the corner-rounded and
          flat element design. I believe that this modern template will bring a
          fresh, harmonious, and impressive feeling to your readers or customers
          as well.
        </p>
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-default/60">
          <a
            href="https://dlyang.me"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <GatsbyImage
              image={data.file.childImageSharp.gatsbyImageData}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-center bg-cover bg-purple-dark" />
          </a>
          <div>
            <p className="text-sm md:text-lg font-semibold text-purple-dark">
              <a
                className="text-purple-dark no-underline hover:text-pink-dark transition-colors duration-200"
                href="https://dlyang.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                LanternD
              </a>
            </p>
            <p className="text-xs md:text-sm text-gray-darker mt-1">
              Blog Enthusiast / DIYer / Cat Lover
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export const Head = () => <SiteHead title="Testimonials" />;

export default Testimonials;

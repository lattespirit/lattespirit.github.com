import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import Head from '../components/Head';
import Layout from '../components/Layout';

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
    <Layout>
      <Head title="Testimonials" />
      <p className="text-white text-center text-2xl md:text-3xl font-bold mt-4 md:mt-8">
        What People Said...
      </p>
      <div className="bg-gray w-52 h-4 md:w-80 mx-auto mt-8 md:mt-12 rounded-t-lg" />
      <div className="bg-gray-light w-60 h-4 md:w-88 mx-auto rounded-t-lg" />
      <div className="relative bg-gray-lighter w-68 md:w-96 mx-auto pt-8 pb-32 md:pb-40 rounded-lg mb-20 sm:mb-0">
        <div className="flex justify-center">
          <svg
            width="34"
            height="25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.444 24.146v-4.289c.639-.678 4.647-2.208 4.667-4.288.01-1.109-.225-3.49-4.667-3.51L2.611 1.144h10.5C12.81 19.627 9.885 23.845 1.444 24.146zM20.889 24.146v-4.289c.638-.678 4.647-2.208 4.667-4.288.01-1.109-.226-3.49-4.667-3.51l1.167-10.916h10.5c-.303 18.484-3.227 22.702-11.667 23.003z"
              fill="#4F239F"
              stroke="#4F239F"
              strokeWidth="1.56"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-left text-sm md:text-lg mx-6 md:mx-10 mt-6 md:mt-10 text-gray-darkest">
          This static website template by Lattespirit is just FANTASTIC! The
          responsive design hosts all the devices, either PC or tablet, or
          phones, like a charm, which delivers my/your/the blog content in a
          seamless and consistent way. I'm really into the corner-rounded and
          flat element design. I believe that this modern template will bring a
          fresh, harmonious, and impressive feeling to your readers or customers
          as well.
        </p>
        <div className="absolute inset-x-0 -bottom-8">
          <div className="flex flex-col justify-center rounded-lg text-center">
            <p className="text-sm md:text-xl font-semibold">
              <a
                className="text-black no-underline"
                href="https://dlyang.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                LanternD
              </a>
            </p>
            <p className="text-xs md:text-base text-gray-darker my-2">
              Blog Enthusiast / DIYer / Cat Lover
            </p>
          </div>

          <div className="flex justify-center rounded-lg">
            <a
              href="https://dlyang.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GatsbyImage
                image={data.file.childImageSharp.gatsbyImageData}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-center bg-cover bg-purple-dark" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Testimonials;

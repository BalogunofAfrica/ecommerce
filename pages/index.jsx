import { FooterBanner, HeroBanner, Product } from "../components";
import React from "react";
import { client } from "../lib/client";

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length ? bannerData[0] : undefined} />
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner
        footerBanner={bannerData.length ? bannerData[0] : undefined}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const productQuery = `*[_type=="product"]`;
  const products = await client.fetch(productQuery);
  const bannerQuery = `*[_type=="banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};

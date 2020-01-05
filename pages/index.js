import React, { useEffect } from "react";
import axios from "axios";

const Home = ({ products }) => {
  console.log(products);
  // useEffect(() => {
  //   getProducts();
  // }, []);

  // async function getProducts() {
  //   const url = "http://localhost:3000/api/products";
  //   const res = await axios.get(url);
  //   console.log(res.data);
  // }
  return <>home</>;
};

Home.getInitialProps = async () => {
  // fetch data on server
  // return response data as an object
  // note: this object will be merged with existing props
  const url = "http://localhost:3000/api/products";
  const res = await axios.get(url);
  return { products: res.data };
};

export default Home;

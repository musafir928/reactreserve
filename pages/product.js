import axios from "axios";
import ProductSummary from "../components/Product/ProductSummary";
import ProductAttributes from "../components/Product/ProductAttributes";
import baseUrl from "../utils/baseUrl";

function Product({ product }) {
  return (
    <>
      <ProductSummary {...product} />
      <ProductAttributes {...product} />
    </>
  );
}

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/product`;
  // next line: to make query string without adding ? mark and params to the url
  const payload = { params: { _id } };
  const res = await axios.get(url, payload);
  return { product: res.data };
};

export default Product;

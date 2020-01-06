import axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";

const Home = ({ products }) => {
  return <ProductList products={products} />;
};

Home.getInitialProps = async () => {
  // fetch data on server
  // return response data as an object
  // note: this object will be merged with existing props
  const url = `${baseUrl}/api/products`;
  const res = await axios.get(url);
  return { products: res.data };
};

export default Home;

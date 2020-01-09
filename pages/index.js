import axios from "axios";
import ProductList from "../components/Index/ProductList";
import ProductPagination from "../components/Index/ProductPagination";
import baseUrl from "../utils/baseUrl";

const Home = ({ products, totalPages }) => {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
};

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 9;
  const payload = { params: { page, size } };
  // fetch data on server
  // return response data as an object
  // note: this object will be merged with existing props
  const url = `${baseUrl}/api/products`;
  const res = await axios.get(url, payload);
  return res.data;
};

export default Home;

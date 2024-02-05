import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProductsList } from "../../api/products";
import useHttp from "../../hooks/use-http";
import Pagination from "../UI/Pagination";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const location = useLocation();
  const { sendRequest, data } = useHttp(getProductsList);

  let products = [];
  if (data) {
    products = data.data;
    console.log(products);
  }

  useEffect(() => {
    if (location.search) {
      sendRequest(`${location.search}&limit=8&page=1`);
    } else {
      sendRequest("?limit=8&page=1");
    }
  }, [sendRequest, location]);

  return (
    <div className="bg-white">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <Pagination />
      </div>
    </div>
  );
};

export default ProductsList;

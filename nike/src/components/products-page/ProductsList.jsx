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
  let pagination = {};
  let count = 1;

  if (data) {
    products = data.data;
    pagination = data.pagination;
    count = data.count;
  }

  useEffect(() => {
    let searchParams = new URLSearchParams(location.search);

    // Check if 'limit' and 'page' parameters exist, add them if they don't
    if (!searchParams.has("limit")) {
      searchParams.set("limit", "8");
    }
    if (!searchParams.has("page")) {
      searchParams.set("page", "1");
    }

    const newSearchString = `?${searchParams.toString()}`;

    sendRequest(newSearchString);
  }, [sendRequest, location]);

  return (
    <div className="bg-white">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <Pagination pagination={pagination} count={count} />
      </div>
    </div>
  );
};

export default ProductsList;

import { useNavigate } from "react-router-dom";
import { shoe4, shoe5, shoe6, shoe7 } from "../../assets/images";

const imageSrcs = [shoe4, shoe5, shoe6, shoe7];

const ProductCard = (product) => {
  const { images, href, colors, price, name, _id: id } = product;

  let imageSrc =
    images.length === 0
      ? imageSrcs[Math.floor(Math.random() * imageSrcs.length)]
      : images[0];

  const navigate = useNavigate();

  const onProductClick = () => {
    navigate(`/products/${id}`, { state: { data: product } });
  };
  return (
    <div
      className="group relative hover:cursor-pointer"
      onClick={onProductClick}
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={imageSrc}
          alt="product image"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </a>
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{colors}</p> */}
          <div className="flex space-x-1">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`w-4 h-4 border rounded-full bg.${color}`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
        <p className="text-sm font-medium text-gray-900">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

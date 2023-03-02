import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
const ProductCard = ({product,qrCode}) => {
  return (
    <>
      <div class="card mx-auto mt-6">
        <figure>
          <img
            src={product.imageUrl}
            alt={product.name}
          />
        </figure>
        <section class="details">
          <div class="min-details">
            <h1>
              {product.name}<span>{product.category}</span>
            </h1>
            <h1 class="price font-bold">{product.price} ETH</h1>
          </div>

          <div class="options">
            <div class="options-size">
              {/* <h1>sizes</h1>
              <h1>sizes</h1>
              <ul>
                <li>xs</li>
                <li>s</li>
                <li>m</li>
                <li>l</li>
                <li>xl</li>
              </ul> */}
              {qrCode}
             
            </div>

            <div class="options-colors">
              <h1>colors</h1>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          <button
            className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs text-center
                leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
                focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
                active:shadow-lg transition duration-150 ease-in-out"
          >
            <Link to={`/shopping/${product.id}`}>Buy Now</Link>
          </button>
        </section>
      </div>
    </>
  );
};

export default ProductCard;

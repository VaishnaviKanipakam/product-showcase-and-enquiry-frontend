import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductDetailedPageItem from "../ProductDetailedPageItem";

import "./index.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [getProductData, setGetProductData] = useState([]);

  const getSingleProductData = async () => {
    const url = `https://product-showcase-and-enquiry-backend.onrender.com/product?product_id=${id}`;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      const updatedData = data.map((eachProduct) => ({
        productId: eachProduct.product_id,
        productCategory: eachProduct.category,
        productLongDescription: eachProduct.long_desc,
        productImage: eachProduct.image_url,
        productName: eachProduct.name,
        productPrice: eachProduct.price,
        productSize: eachProduct.size,
        productStock: eachProduct.stock,
      }));
      setGetProductData(updatedData);
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, []);

  return (
    <div className="product-detail-page-container">
      <h1 className="text-[30px] font-bold text-[#000000] mt-8 mb-8">
        Product Details
      </h1>
      {getProductData.map((product) => (
        <ProductDetailedPageItem
          key={product.productId}
          productDetails={product}
        />
      ))}
    </div>
  );
};

export default ProductDetailPage;

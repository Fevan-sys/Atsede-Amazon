// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import ProductCard from './ProductCard';
// import classes from './Product.module.css'

// function Product() {
//     const [products, setProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

// useEffect(() => {
//     axios.get('https://fakestoreapi.com/products')
//     .then((res) =>{
//         setProducts(res.data)
//         isLoading(false)

//     }).catch((err) => {
//         console.log(err)
//         isLoading(false)
//     })
// }, []);
    
//     return (
//         <>
//         {
//         isLoading?(<Loader/>) : (<section className ={classes.products_container}>
    
//     {
//     products?.map((singleproduct) => {
//          return   <ProductCard renderAdd={true} product = {singleproduct} key={singleproduct.id}/>
// })
//     }
//    </section>)
// }
// </>
//     )}
// export default Product

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        // Use error response message if available
        setError(
          err.response
            ? err.response.data.message
            : "Failed to fetch products. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  // Error handling
  if (error) {
    return <div className={classes.error}>{error}</div>;
  }

  // Empty product list handling
  if (products.length === 0) {
    return <div className={classes.noProducts}>No products available.</div>;
  }

  return (
    <section className={classes.products_container}>
      {products.map((singleProduct) => (
        <ProductCard
          renderAdd={true}
          product={singleProduct}
          key={singleProduct.id}
        />
      ))}
    </section>
  );
}

export default Product;


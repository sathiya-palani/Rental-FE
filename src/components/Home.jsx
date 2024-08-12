import React, { Fragment, useEffect } from "react";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productsState
  );

  // useSelector ((state) =>state.productsState)

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts);
  }, [error,dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&  
                products.map((product) => <Product product={product} />)}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

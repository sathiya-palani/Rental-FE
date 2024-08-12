
import  { Fragment, useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getProduct } from '../../actions/productAction';
import Loader from '../layouts/Loader';
import { Carousel } from 'react-bootstrap';
import { addCartItem } from '../../actions/cartActions';


const ProductDetail = () => {

   const {product , loading} = useSelector((state) => state.productState);

  const dispatch = useDispatch();
  const {id} = useParams()

   useEffect (() => {
    console.log(product);
    dispatch(getProduct(id))
   }, [dispatch, id ])

 
  return (
    <Fragment >
      {loading ? <Loader /> : 
            <Fragment> 
    <div className="container container-fluid">
    <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <Carousel pause="hover">
                            {product.images && product.images.length > 0 && product.images.map(image =>
                                <Carousel.Item key={image._id}>
                                    <img className="d-block w-100"  src={image.image} alt={product.name} height="500" width="500" />
                                </Carousel.Item>
                            )}
                        </Carousel>
          
        </div>

        <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id ="product_id">Product # {product._id}</p>
            <hr/>
            <h4 className="mt-2">Specification</h4>
            <p id="product_id">{product.specification}</p>

            <hr/>

            
         <h3>Rental Rate </h3>   <p id="product_price">{product.rentalRatePerMonth}/month</p>

           
             <button type="button" id="cart_btn"
             onClick={() =>dispatch(addCartItem(product._id))}
              className="btn btn-primary d-inline ml-4">Add to Booking</button>

            <hr/>

            <p>Available  <span id="stock_status">avialable</span></p>

            <hr/>

            <p>Availability Date <span id="stock_status">{product.availabilityDate}</span></p>

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr/>
            <p id="product_seller mb-3">Location:<strong>{product.location}</strong></p>
           
            
           
        </div>

    </div>

</div>
</Fragment> }

    </Fragment>
   
  )
}

export default ProductDetail;
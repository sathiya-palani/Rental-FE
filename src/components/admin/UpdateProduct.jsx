


import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../actions/productAction";
import { clearProductUpdated } from "../../slices/productSlice";
import { clearError } from "../../slices/productsSlice";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

export  default function UpdateProduct () {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [rentalRate, setRentalRate] = useState("");
    const[location, setLocation] =  useState("");
    const[specification, setSpecification] =  useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);
    const [description, setDescription] = useState("");
    const [available, setAvailable] = useState("");
    const [availableDate, setAvailableDate] = useState("");
    const {id:productId} = useParams();
  
    
    const { loading, isProductUpdated, error, product } = useSelector( state => state.productState)

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
         'Furniture Items',
         'Bike',
         'car',
         'Vehicle',
        'Sports Items',
         'Musical   '
       
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState == 2 ) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file)


        })

    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name' , name);
        formData.append('category' , category);
        formData.append('rentalRate' , rentalRate);
        formData.append('location' , location);
        formData.append('specification' , specification);
        formData.append('description' , description);
        formData.append('available' , available);
        formData.append('availableDate' , availableDate);
        
        images.forEach (image => {
            formData.append('images', image)
        })
        formData.append('imagesCleared' , imagesCleared);
        dispatch(updateProduct(productId,formData))
    }

    const clearImagesHandler = () => {
      setImages([]);
      setImagesPreview([]);
      setImagesCleared(true);
  }



    useEffect(() => {
        if(isProductUpdated) {
            toast('Product Updated Succesfully!',{
                type: 'success',
                // position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductUpdated())
            })
            setImages([])
            return;
        }

        if(error)  {
            toast(error, {
                // position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        dispatch(getProduct(productId))
    }, [isProductUpdated, error, dispatch])


    useEffect(() => {
      if(product._id) {
          setName(product.name);
          setCategory(product.category);
          setRentalRate(product.rentalRate);
          setLocation(product.location);
          setSpecification(product.specification);
          setDescription(product.description);
          setAvailable(product.available);
          setAvailableDate(product.availableDate);
         
          
          let images = [];
          product.images.forEach( image => {
              images.push(image.image)
          });
          setImagesPreview(images)
      }
  },[product])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5"> 
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">New Product</h1>

                            <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select   value={category}onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                                    <option value="category">Select</option>
                                    {categories.map( category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">RentalRate/month</label>
                                <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                onChange={e => setRentalRate(e.target.value)}
                                value={rentalRate}
                                />
                            </div>


                           < div className="form-group">
                                <label htmlFor="location_field">Location</label>
                                <textarea 
                                    className="form-control"
                                    id="location_field" 
                                  
                                    onChange={e => setLocation(e.target.value)}
                                    value={location}
                                  ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="specification_field">Specification</label>
                                <textarea 
                                    className="form-control"
                                    id="specification_field" 
                                    onChange={e => setSpecification(e.target.value)}
                                    value={specification}
                                  ></textarea>
                            </div>



                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea 
                                    className="form-control"
                                    id="description_field" 
                                    rows="8"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                  ></textarea>
                            </div>

                            
                            <div className="form-group">
                                <label htmlFor="available_field">Available</label>
                                <input
                                type="text"
                                id="available_field"
                                className="form-control"
                                onChange={e => setAvailable(e.target.value)}
                                value={available}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="availableDate_field">Available Date</label>
                                <input
                                type="date"
                                id="availableDate_field"
                                className="form-control"
                                onChange={e => setAvailableDate(e.target.value)}
                                value={availableDate}
                                />
                            </div>
                            
                            <div className='form-group'>
                                <label>Images</label>
                                
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            multiple
                                            onChange={onImagesChange}
                                        
                                        />

                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    { imagesPreview.length > 0 &&  <span className="mr-2" onClick={clearImagesHandler} style={{cursor: "pointer"}}> <FaTrashAlt /> </span>}
                                    {imagesPreview.map(image => (
                                        <img
                                            className="mt-3 mr-2"
                                            key={image}
                                            src={image}
                                            alt={`Image Preview`}
                                            width="55"
                                            height="52"
                                        />
                                    ))}
                            </div>

                
                            <button
                            id="login_button"
                            type="submit"
                            disabled={loading}
                            className="btn btn-block py-3"
                            >
                            UPDATE
                            </button>

                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
        
    )
}
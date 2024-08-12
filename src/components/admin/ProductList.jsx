
import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteProduct, getAdminProducts } from "../../actions/productAction"
import { clearError} from "../../slices/productsSlice";
import {clearProductDeleted} from '../../slices/productSlice'
import Loader from '../layouts/Loader';
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import Sidebar from "./Sidebar";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function ProductList() {
    const { products = [], loading = true, error }  = useSelector(state => state.productsState)
    const { isProductDeleted, error:productError }  = useSelector(state => state.productState)
    const dispatch = useDispatch();

    const setProducts = () => {
        const data = {
            columns : [
                { 
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'RentalRate',
                    field: 'rentalRate',
                    sort: 'asc'
                },
        
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        products.forEach( product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price : `$${product.rentalRatePerMonth}`,
              
                actions: (
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary"> <FaRegEdit /> </Link>
                        <Button onClick={e => deleteHandler(e, product._id)} className="btn btn-danger py-1 px-2 ml-2">
                        <MdDelete />
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if(error || productError) {
            toast(error || productError, {
               
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isProductDeleted) {
            toast('Product Deleted Succesfully!',{
                type: 'success',
               
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        dispatch(getAdminProducts)
    },[dispatch, error, isProductDeleted])


    return (
        <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Product List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setProducts()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                }
            </Fragment>
        </div>
    </div>
    )
}
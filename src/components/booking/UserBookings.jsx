
import { Fragment, useEffect} from 'react'

import {MDBDataTable} from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux';
import { userBookings as userBookingsAction } from '../../actions/bookingActions';
import { Link } from 'react-router-dom';

export default function UserBookings () {
    const { userBookings = []} = useSelector(state => state.bookingState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userBookingsAction)
    },[])

    const setBookings = () => {
        const data = {
            columns: [
                {
                    label: "Booking ID",
                    field: 'id',
                    sort: "asc"
                },
                {
                    label: "Number of Items",
                    field: 'numOfItems',
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: 'amount',
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: 'actions',
                    sort: "asc"
                }
            ],
            rows:[]
        }

        userBookings.forEach(userBooking => {
            data.rows.push({
                id:  userBooking._id,
                numOfItems: userBooking.bookingItems.length,
                amount: `$${userBooking.totalPrice}`,
                status: userBooking.bookingStatus && userBooking.bookingStatus.includes('Delivered') ?
                (<p style={{color: 'green'}}> {userBooking.bookingStatus} </p>):
                (<p style={{color: 'red'}}> {userBooking.bookingStatus} </p>),
                actions: <Link to={`/booking/${userBooking._id}`} className="btn btn-primary" >
                    <i className='fa fa-eye'></i>
                </Link>
            })
        })


        return  data;
    }


    return (
        <Fragment>
           
            <h1 className='mt-5'>My bookings</h1> 
            <MDBDataTable
                className='px-3'
                bbookinged
                striped
                hover
                data={setBookings()}
            />
        </Fragment>
    )
}
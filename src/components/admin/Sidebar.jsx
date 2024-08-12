
import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FiShoppingBag } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { SlBasket } from "react-icons/sl";
import { FaUserShield } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";

export default function Sidebar () {

    const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                <li>
                    <Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                </li>
        
                <li>
                    <NavDropdown title={
                        <i className='fa fa-product-hunt'> Product</i>
                    }>
                        <NavDropdown.Item  onClick={() => navigate('/admin/products')} > <FiShoppingBag /> All</NavDropdown.Item>
                        <NavDropdown.Item  onClick={() => navigate('/admin/products/create')} > <FaPlus /> Create</NavDropdown.Item>
                    </NavDropdown>
                </li>

                {/* <li>
                    <Link to="/admin/orders"> <SlBasket /> Orders</Link>
                </li>

                <li>
                    <Link to="/admin/users">  <FaUserShield /> Users</Link>
                </li> */}

               
            </ul>
            </nav>
        </div>
    )
}
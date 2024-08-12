import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    const [keyword, setKeyword] = useState("")

    
    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}`)
    }

    // const clearKeyword = () =>{
    //     setKeyword("");
    // }

    // useEffect(() => {
    //     if(location.pathname === '/') {
    //         clearKeyword();
    //     }
    // },[location])


  return (
    <form onSubmit={searchHandler} >
    <div className="input-group">
       
   <input
     type="text"
     id="search_field"
     className="form-control"
     placeholder="Enter Product Name ..."
     onChange={(e)=>{ setKeyword(e.target.value) }}
     value={keyword}
   />
   <div className="input-group-append">
     <button id="search_btn" className="btn">
     <FaSearch />
     </button>
   </div>
 </div>
 </form>

  )
}

export default Search
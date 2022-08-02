import '../Sidebar/index.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearchengin } from '@fortawesome/free-brands-svg-icons';


import {useState, useContext} from "react";

import {useNavigate,createSearchParams} from 'react-router-dom';

import { AuthContext } from "../../context/auth";
const Sidebar = () => {

    const [searchQuery, setQuery] = useState("");

    const changeHandler = (e) => {
        setQuery({
            ...searchQuery,
            [e.target.name] : e.target.value
        })
    }
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault();
        context.queryText(searchQuery.text, navigate,createSearchParams)
        
    }
    console.log(searchQuery)
    return (
        <div>
            <div className="sidebar py-5">
               <form onSubmit={submitHandler}>
                 <div className='position-relative'>
                    <input 
                      className="searchInput" 
                      name="text" 
                      type="search" 
                      onChange={changeHandler}  />
                    <button className='searchbtn' type="submit">
                        <FontAwesomeIcon icon={faSearchengin}/>
                    </button>
                 </div>
               </form>
            </div>
        </div>
    );
}

export default Sidebar;
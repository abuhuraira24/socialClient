import {useState, useContext} from "react";

import {useNavigate,createSearchParams} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

import { AuthContext } from "../../context/auth";

const Hero = () => {

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

    return (
        <div className="hero">
            
            <div className='heroTitle'>
                <h1 className='text-white heroTitle text-center'>Find Your Favorite Author</h1>
            </div>
            <div className="searchbar">
               <form onSubmit={submitHandler}>
               <input 
                  type="search" 
                  onChange={changeHandler}
                  name="text"
                  />
                <button type="submit">
                 <FontAwesomeIcon icon={faSearchengin} />
                </button>
               </form>
                
            </div>
        </div>
    );
}

export default Hero;
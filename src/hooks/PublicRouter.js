
import {useContext} from "react"
import {Navigate} from "react-router-dom"
import {AuthContext} from "../context/auth"

const PublicRouter = ({children, ...props}) => {

    const {user} = useContext(AuthContext)
   
    
    const dir = props.rediredct;
    
    return user ? <Navigate to={dir}/> : children
}

export default PublicRouter;
import { useEffect,useCallback, useState } from "react"


const Responsive = (small) => {

    const [width, setWidth] = useState(true);

    const res = () => {
         if(window.innerWidth > small){
            setWidth(false)
         }else{
            setWidth(true)
         } 
       }

    window.addEventListener('resize',res)
   
    return width
}


export default Responsive;
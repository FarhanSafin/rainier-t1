import { useEffect, useState } from "react";


const useInformations = () => {

    const [informations, setInformations] = useState([]);

    useEffect(()=>{
        fetch('https://fec-inventory-api.herokuapp.com/inventory-info')
        .then(res => res.json())
        .then(data => setInformations(data));
    }, []);


    return [informations, setInformations];

    }

export default useInformations;
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch('https://fec-inventory-api.herokuapp.com/product-info')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    const [informations, setInformations] = useState([]);

    useEffect(()=>{
        fetch('https://fec-inventory-api.herokuapp.com/inventory-info')
        .then(res => res.json())
        .then(data => setInformations(data));
    }, []);


    if(informations.length === 0)
    {
        return <Loading></Loading>
    }

    else
    { 
        const mappedObject = [];
        products.forEach(item => 
        {
            const {id, name} = item;
            const priceObject = informations.filter(x => x.product_id === id);
            const price =  priceObject[0].unit_price;
            mappedObject.push({
              id,
              name,
              price
            });
        });

        return (
            <div className='container mx-auto flex mt-10'>
            <div className='grid grid-cols-2 gap-4'>
                {
                    mappedObject.map(mapped => 
                    <div key={mapped.id} className="card w-96 bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Name: {mapped.name}</h2>
                            <p>Price: {mapped.price}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className='mx-20'>
                <h2>This is Cart</h2>
            </div>
            </div>
        );
    }
}
export default Home;
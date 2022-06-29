import React from 'react';
import { useQuery } from 'react-query';

const Home = () => {


    const {data: products, isLoading} = useQuery('products', async () => await fetch('https://fec-inventory-api.herokuapp.com/product-info', {
        method: 'GET',
    }).then(res=>res.json()));


    const {data: informations, isLoadingInf} = useQuery('informations', async () => await fetch('https://fec-inventory-api.herokuapp.com/inventory-info', {
        method: 'GET',
    }).then(res=>res.json()));


    if(isLoading){
        return <h2>LOAD</h2>
    }
    else if (isLoadingInf){
        return <h2>LOADING</h2>
    }
    else{
        const mappedObject = [];
        products.forEach(item => {
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
            <div className='flex'>
            <div className='grid grid-cols-2 gap-4'>
                {
                    mappedObject.map(mapped => <div key={mapped.id} className="card w-96 bg-base-100 shadow-xl">
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
            <div>
                <h2>This is Cart</h2>
            </div>
            </div>
        );
    }
    }
export default Home;
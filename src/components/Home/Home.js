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


    const [selectedProducts, setSelectedProducts] = useState([])

    const handleClick = (mapped) => {
        const newProduct = [...selectedProducts, mapped];
        setSelectedProducts(newProduct);
        
    }

    const handleCartClick = (id) => 
    {
        setSelectedProducts(selectedProducts.filter(item => item.id !== id));
    }


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

            {/* ALL PRODUCT SHOWING SECTION */}

            <div className='grid grid-cols-2 gap-4'>

                {
                    mappedObject.map(mapped => 
                    <div key={mapped.id} className="card w-96 bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Name: {mapped.name}</h2>
                            <p>Price: {mapped.price}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleClick(mapped)} className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>)
                }

            </div>

           {/*  CART SECTION */}

            <div className='mx-20'>
                <h2>This is Cart</h2>
                <h2>Product Selected {selectedProducts.length}</h2>
                <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            selectedProducts.map((selectedProduct, index)=>
                            <tr key={selectedProduct.id}>
                                <th>{index + 1}</th>
                                <td>{selectedProduct.name}</td>
                                <td>{selectedProduct.price}</td>
                                <td><button onClick={() => handleCartClick(selectedProduct.id)} className="btn btn-xs">X</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
                </div>
            </div>
            </div>
        );
    }
}
export default Home;
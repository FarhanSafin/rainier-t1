import React, { useState } from 'react';
import useInformations from '../hooks/useInformations';
import useProducts from '../hooks/useProducts';
import Loading from '../Loading/Loading';

const Home = () => {

    let mappedObject = [];
    const [products] = useProducts();

    const [informations] = useInformations();

    const [selectedProducts, setSelectedProducts] = useState([])

    const handleClick = (mapped) => 
    {
        const id = mapped.id;
        for (const x of selectedProducts) 
        { 
            let got = x.id;
            if(got.includes(id)){
                return alert("Already added to cart");
            }
        }

        mapped.quantity = mapped.quantity + 1;
        const newProduct = [...selectedProducts, mapped];
        setSelectedProducts(newProduct);
    }


    const handleCartDeleteClick = (id) => 
    {
        setSelectedProducts(selectedProducts.filter(item => item.id !== id));
    }

    let total = 0;

    for(const product of selectedProducts){
        total = total + product.price
    }

    if(informations.length === 0)
    {
        return <Loading></Loading>
    }

    else
    { 
        products.forEach(item => 
        {
            let quantity = 0;
            const {id, name} = item;
            const priceObject = informations.filter(x => x.product_id === id);
            const price =  priceObject[0].unit_price;
            mappedObject.push({
              id,
              name,
              quantity,
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
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            selectedProducts.map((selectedProduct, index)=>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{selectedProduct.name}</td>
                                <td>{selectedProduct.price}</td>
                                <td>{selectedProduct.quantity}</td>
                                <td><button onClick={() => handleCartDeleteClick(selectedProduct.id)} className="btn btn-xs">X</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
                <div className="divider"></div> 
                <div className='flex'>
                    <h2>Total:</h2>
                    <h2 className='font-bold mx-2'>{total}</h2>
                </div>
                </div>
            </div>
            </div>
        );
    }
}
export default Home;
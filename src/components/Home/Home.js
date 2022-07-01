import React, { useState } from 'react';
import useInformations from '../hooks/useInformations';
import useProducts from '../hooks/useProducts';
import Loading from '../Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    /* Fetching data from hooks */
    const [products] = useProducts();

    const [informations] = useInformations();

    /* Init state of the product added to createRef.(Holds which product is added to cart) */
    const [selectedProducts, setSelectedProducts] = useState([]);

    /* Add to Cart button when clicked */
    const handleClick = (mapped) => 
    {
        const id = mapped.id;

        /* Searching if the product which is clicked is already added to cart or not */
        for (const x of selectedProducts) /* iterating the array of cart products */
        { 
            let found = x.id; /* getting the id of single product after iteration */

            /* checking the individual product is found or not in the cart array */
            if(found.includes(id)){
                return toast.warn('Item already added to cart!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }

        /* If not found => increasing the quantity and then adding to the cart array/state */
        mapped.quantity = mapped.quantity + 1;
        const newProduct = [...selectedProducts, mapped];
        setSelectedProducts(newProduct);
    }



    /* When the delete from cart button is clicked */
    const handleCartDeleteClick = (id) => 
    {
        setSelectedProducts(selectedProducts.filter(item => item.id !== id)); /* checking the clicked item id and then filtering and then showing the rest items */
    }

    /* Calculating total price of the product added to the cart */
    let total = 0;

    /* Iterating the cart/selected product array/state and then adding the price */
    for(const product of selectedProducts){
        total = total + product.price
    }

    /* If still the data is not fetched or received from the api */
    if(informations.length === 0)
    {
        return <Loading></Loading>
    }

    /* If data is received from the api */
    else
    { 
        /* Creating new object */
        let mappedObject = [];
        
/*         Taking each product's name and id from the product api and filtering them using the id and taking just the price information and combining them and pushing them in new object/array */

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

            <div className='grid grid-cols-2 gap-10'>

                {/* mapping all the product and rendering them on ui */}
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

            <div className='ml-10'>
                <h2 className='text-center font-bold text-2xl mb-5'>Product Selected {selectedProducts.length}</h2>
                <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* Mapping all the product inserted in the cart/selectedproduct array/state */}
                        {
                            selectedProducts.map((selectedProduct, index)=>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{selectedProduct.name}</td>
                                <td>{selectedProduct.price}</td>
                                <td>
                                    <div class="dropdown">
                                        <label tabindex="0" class="btn m-1">{selectedProduct.quantity}</label>
                                        <ul tabindex="0" class="dropdown-content menu p-1 shadow bg-base-300 rounded-box w-20">
                                            <button>1</button>
                                            <button>2</button>
                                            <button>3</button>
                                            <button>4</button>
                                            <button>5</button>
                                        </ul>
                                    </div>
                                </td>
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
            <ToastContainer />
            </div>
        );
    }
}
export default Home;
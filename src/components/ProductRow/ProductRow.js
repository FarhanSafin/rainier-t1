import React from 'react';

const ProductRow = ({selectedProduct, index}) => {
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{selectedProduct.name}</td>
            <td>{selectedProduct.price}</td>
            <td><button className="btn btn-xs">X</button></td>
        </tr>
    );
};

export default ProductRow;
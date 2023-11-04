import Product from "./product";



function ProductList({ products, getAllProducts }) {
    return (
        <>
            <div>
                <Product products={products} getAllProducts={getAllProducts}/>
            </div>
        </>
    )
}
export default ProductList;
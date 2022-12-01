import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://localhost:44374/api/Product')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <>
            <ProductList products={products} />
        </>
    )
}
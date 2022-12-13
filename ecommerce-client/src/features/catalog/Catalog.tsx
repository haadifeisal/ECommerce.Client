import { useState, useEffect } from "react";
import api from "../../app/api/api";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.Catalog.list().then(products => setProducts(products));
    }, []);

    return (
        <>
            <ProductList products={products} />
        </>
    )
}
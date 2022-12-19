import { useState, useEffect } from "react";
import api from "../../app/api/api";
import Loading from "../../app/layout/Loading";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.Catalog.list()
        .then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, []);

    if(loading) return <Loading message='Loading products ...'></Loading>

    return (
        <>
            <ProductList products={products} />
        </>
    )
}
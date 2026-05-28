import ProductCard from './ProductCard';

const ProductsSections = ({ products }: { products: any[] }) => {
    return (
        <>
            <section className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                {products.map((item: any) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </section>
        </>
    );
};

export default ProductsSections;

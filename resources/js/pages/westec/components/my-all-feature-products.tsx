import { Link } from "@inertiajs/react";

const products = [
    {
        id: 1,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id: 2,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id: 3,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id: 4,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id: 5,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id: 6,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id: 7,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id: 8,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id: 9,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id:11,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id: 12,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    },
    {
        id: 10,
        name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
        price: "$100",
        image: "assets/demo-images/90.png"
    }
];

const MyAllFeatureProducts = ({ id }: {id:string}) => {
    return (
        <div className="grid grid-cols-5 gap-4">
            {products.map((product) => (
                <Link href={`/detail/${id}`} key={product.id} className="w-full max-w-xs rounded-lg border border-gray-400 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div>
                        <img className="rounded-t-lg aspect-square object-cover" src={product.image} alt={product.name} />
                    </div>
                    <div className="px-5 py-5">
                            <h5 className="text-base line-clamp-2 font-noto-san-regular tracking-tight text-gray-900 dark:text-white">
                                {product.name}
                            </h5>
                        <div className="flex text-base items-center justify-between font-proxima-nova-regular text-color">
                            Price: <span className="dark:text-white">{product.price}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MyAllFeatureProducts;

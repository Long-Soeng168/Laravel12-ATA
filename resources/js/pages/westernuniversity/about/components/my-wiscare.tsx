const items = [
    { title: 'Wisdom', description: 'Have a good sense of judgment', sort:'' , image: 'assets/demo-images/photo2.png' },
    { title: 'Integrity', description: 'Do what is right ', sort:'"Good attitude and behavior"' , image: 'assets/demo-images/photo2.png' },
    { title: 'Support', description: 'Keep the employees, students, and families that we serve at the forefront of our work.', sort:'' , image: 'assets/demo-images/photo2.png' },
    { title: 'Collaboration', description: 'Work as one team ', sort:'"Success in one team".' , image: 'assets/demo-images/photo2.png' },
    { title: 'Accountability', description: 'Own one`s actions.', sort:'"Responsible for one"s actions"' , image: 'assets/demo-images/photo2.png' },
    { title: 'Respect', description: 'Value every voice ', sort:'"Respect each other".' , image: 'assets/demo-images/photo2.png' },
    { title: 'Excellence', description: 'Fully explore details of the management process in order to build the highest reliability and accountability in educational services.', sort:'' , image: 'assets/demo-images/photo2.png' },
];

const MyWiscare = ({valuesWiscare}) => (
    <div className="flex items-center justify-center pt-12 pb-16 md:pt-16">
        <div className="mx-auto w-full max-w-screen-2xl px-6 xl:px-20">
            <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-blue-900 md:text-4xl">{valuesWiscare.title}</h2>
            <div className="mt-14 grid place-items-center gap-8 sm:grid-cols-2 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
                {valuesWiscare?.children?.map((item, index) => {
                    const isLastItem = index === items.length - 1;
                    const isLonelyLastItem = items.length % 3 === 1 && isLastItem;

                    return (
                        <div
                            key={item.id}
                            className={`flex flex-col items-center text-center  ${
                                isLonelyLastItem ? 'lg:col-span-3 w-full max-w-3xl mx-auto' : ''
                            }`}
                        >
                            <div className="text-primary flex w-36 items-center justify-center">
                                {
                                    item?.images?.map((image)=>(
                                        <img key={image.id} src={`/assets/images/pages/thumb/${image.image}`} alt={item.title} />
                                    ))
                                }
                            </div>
                            <h3 className="my-4 text-2xl text-red-700">{item.title}</h3>
                            <p className=" text-base text-blue-900 whitespace-pre-line">{item.short_description}</p>
                            <p className=" text-base text-blue-900 whitespace-pre-line">{item.long_description}</p>

                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

export default MyWiscare;

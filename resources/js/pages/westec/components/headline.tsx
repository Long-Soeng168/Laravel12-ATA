const Headline = ({ title }: { title: string }) => {
    return (
        <>
            <h1 className="inline-block px-4 md:px-16 border-[#273892] text-2xl font-semibold text-[#273892] 2xl:text-4xl py-10">{title}</h1>
        </>
    );
};

export default Headline;

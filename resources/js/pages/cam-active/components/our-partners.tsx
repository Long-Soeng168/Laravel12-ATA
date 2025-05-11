import SectionHeader from './section-header';

const OurPartners = () => {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-7xl text-center">
                <SectionHeader label="Our Partners" title="Collaborating for Educational Advancement" />
                <div className="mt-10 grid grid-cols-2 gap-6 px-6 md:grid-cols-3 lg:grid-cols-5">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-center rounded border border-dashed py-4 sm:p-10">
                            <img src="/assets/icons/image-icon.png" alt={`Partner ${i + 1}`} className="h-16 object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurPartners;

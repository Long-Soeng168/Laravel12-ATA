import Headline from './headline';

const BlogsList = () => {
    return (
        <div className="mx-auto max-w-[4000px] bg-white">
            <Headline title="News & Updates" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {BlogCard()}
                {BlogCard()}
                {BlogCard()}
                {BlogCard()}
            </div>
        </div>
    );

    function BlogCard() {
        return (
            <div className="flex flex-col overflow-hidden border-[0.5px] bg-[#36454f] hover:shadow-lg">
                <a href="#">
                    <img className="aspect-[1/1] w-full object-cover" src="/assets/demo-images/NEWS.jpg" alt="Sunset in the mountains" />
                </a>

                <div className="p-4">
                    <div className="mb-8">
                        <a href="#" className="2xl:text-2xl mb-2 inline-block text-lg font-bold text-white transition duration-500 ease-in-out">
                            Women Entering Cybersecurity Through Non-Traditional Paths
                        </a>
                        <p className="2xl:text-xl text-sm text-gray-300">By John P. Mello Jr.</p>
                        <p className="2xl:text-xl text-sm text-gray-300">March 25, 2025</p>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="font-proxima-nova-regular bg-primary 2xl:text-2xl px-4 py-1 text-base text-white capitalize transition duration-200 hover:underline"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
};

export default BlogsList;

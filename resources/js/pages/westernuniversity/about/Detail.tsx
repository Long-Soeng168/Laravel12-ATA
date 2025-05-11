import MyTopMenu from '../components-wu/my-top-menu';
import MyLayoutWestern from '../layout/layout';

const Detail = () => {
    return (
        <MyLayoutWestern>
            <div className="bg-blue-950">
                <MyTopMenu />
            </div>

            <div className="min-h-screen bg-gray-100 px-4 py-8 text-gray-800">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <h1 className="mb-2 text-3xl font-bold">Quality Education</h1>
                        <div className="mb-4 space-x-2 text-lg text-gray-700">
                            <span>
                                Access to quality teachers; use of quality learning tools and professional development; quality education as one that
                                focuses on the
                            </span>
                        </div>

                        {/* Image Preview */}
                        <div className="mb-6 aspect-video">
                            <img
                                src="/assets/demo-images/02TimeLineIcons/2023.jpg"
                                alt="Big Buck Bunny"
                                className="h-full w-full rounded object-cover shadow-md"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-4 text-gray-700">
                            <p>
                                Nam et vestibulum odio. Aliquam auctor ac velit sit amet pretium. Maecenas pulvinar egestas rutrum. Nam et elit
                                faucibus nunc euismod fringilla eu iaculis mi. Mauris mollis posuere leo, in varius mauris rhoncus sed.
                            </p>
                            <p>
                                Aenean congue molestie sapien, nec convallis lectus interdum ut. Vestibulum facilisis, sem eu lobortis pulvinar, dui
                                dui ornare erat, nec porta nunc quam a metus. Fusce eget consequat purus.
                            </p>
                            <p>Vivamus rhoncus elit vitae sapien dignissim luctus. Etiam aliquet fringilla dapibus.</p>
                            <p>
                                Nam et vestibulum odio. Aliquam auctor ac velit sit amet pretium. Maecenas pulvinar egestas rutrum. Nam et elit
                                faucibus nunc euismod fringilla eu iaculis mi. Mauris mollis posuere leo, in varius mauris rhoncus sed.
                            </p>
                            <p>
                                Aenean congue molestie sapien, nec convallis lectus interdum ut. Vestibulum facilisis, sem eu lobortis pulvinar, dui
                                dui ornare erat, nec porta nunc quam a metus. Fusce eget consequat purus.
                            </p>
                            <p>Vivamus rhoncus elit vitae sapien dignissim luctus. Etiam aliquet fringilla dapibus.</p>
                            <p>
                                Nam et vestibulum odio. Aliquam auctor ac velit sit amet pretium. Maecenas pulvinar egestas rutrum. Nam et elit
                                faucibus nunc euismod fringilla eu iaculis mi. Mauris mollis posuere leo, in varius mauris rhoncus sed.
                            </p>
                            <p>
                                Aenean congue molestie sapien, nec convallis lectus interdum ut. Vestibulum facilisis, sem eu lobortis pulvinar, dui
                                dui ornare erat, nec porta nunc quam a metus. Fusce eget consequat purus.
                            </p>
                            <p>Vivamus rhoncus elit vitae sapien dignissim luctus. Etiam aliquet fringilla dapibus.</p>
                        </div>

                        {/* Image Preview */}
                        <div className="mt-6 aspect-video">
                            <img
                                src="/assets/demo-images/02TimeLineIcons/2023.jpg"
                                alt="Big Buck Bunny"
                                className="h-full w-full rounded object-cover shadow-md"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <div>
                            <h3 className="mb-2 border-b border-gray-300 pb-1 text-lg font-bold">Academics</h3>
                            <ul className="space-y-1 text-sm">
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        General English Program
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Curriculum
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Exchange Program
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Summer Program
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        School Calendar
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-2 border-b border-gray-300 pb-1 text-lg font-bold">School info</h3>
                            <ul className="space-y-1 text-sm">
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Campuses
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        School Facilities
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Class Schedule and Subjects
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Student Council
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-2 border-b border-gray-300 pb-1 text-lg font-bold">Contact</h3>
                            <ul className="space-y-1 text-sm">
                                <li>016 699 192</li>
                                <li>Find us on Google Map</li>
                                <li>info@western.edu.kh</li>
                                <li>#20, St. 598C,Phnom Penh Thmey,Sen Sok, Cambodia</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-3 border-b border-gray-300 pb-2 text-lg font-semibold">Social Media</h3>
                            <ul className="space-y-2 text-sm text-gray-800">
                                <li className="flex items-center space-x-2">
                                    <img src="/assets/demo-images/facebook.png" alt="Facebook" className="h-7 w-7" />
                                    <span>Facebook</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <img src="/assets/demo-images/telegram.png" alt="Telegram" className="h-7 w-7" />
                                    <span>Telegram</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <img src="/assets/demo-images/social.png" alt="Instagram" className="h-7 w-7" />
                                    <span>Instagram</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <img src="/assets/demo-images/youtube.png" alt="YouTube" className="h-7 w-7" />
                                    <span>YouTube</span>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </MyLayoutWestern>
    );
};

export default Detail;

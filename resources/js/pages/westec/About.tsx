import { ContactSection } from './components/contact-section';
import Headline from './components/headline';
import { OurJourney } from './components/our-journey';
import WhyChooseUsCard from './components/why-choose-us-card';
import WestecLayout from './layout/layout';

const About = () => {
    return (
        <WestecLayout>
            <section className="relative">
                <img src="/assets/westec/images/about-banner.jpeg" className="max-h-[650px] min-h-[300px] w-full object-cover" alt="" />
                <div className="bg-true-primary/50 absolute top-1/2 left-4 max-w-[80%] -translate-y-1/2 p-4 text-white lg:left-16 lg:max-w-[750px] 2xl:max-w-[850px]">
                    <h1 className="mt-2 mb-4 text-xl font-bold text-yellow-500 lg:text-4xl">Suor Sdey Cambodia!</h1>
                    <div className="mb-2 flex flex-col gap-4 text-xs font-medium lg:text-2xl">
                        <p>At Westec Corporation, we don’t just follow the latest trends in technology—we lead them.</p>
                        <p>
                            Born from a vision of passionate engineers from the USA and Canada, we’ve grown into Cambodia’s leading provider of smart,
                            secure, and innovative solutions.
                        </p>
                        <p>
                            Whether you’re a business owner needing cutting-edge security or a homeowner looking for smart automation, Westec is your
                            go-to partner for transforming the way you live and work.
                        </p>
                    </div>
                </div>
            </section>
            <section>
                <Headline title="Why choose Westec?" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-true-primary-three">{<WhyChooseUsCard />}</div>
                    <div className="bg-true-primary">{<WhyChooseUsCard />}</div>
                    <div className="bg-true-primary-three">{<WhyChooseUsCard />}</div>
                    <div className="bg-true-primary">{<WhyChooseUsCard />}</div>
                    <div className="bg-true-primary-three">{<WhyChooseUsCard />}</div>
                    <div className="bg-true-primary">{<WhyChooseUsCard />}</div>
                </div>
            </section>
            <ContactSection bg="bg-true-primary-two" />
            <section>
                <Headline title="Vision" />
                <img src="/assets/westec/images/vision-banner.png" className="w-full object-cover" alt="" />
            </section>
            <section>
                <Headline title="Our Commitment" />
                <img src="/assets/westec/images/commitment-banner.png" className="w-full object-cover" alt="" />
            </section>
            <section>
                <Headline title="Our Journey (Milestones)" />
                <OurJourney />
            </section>
        </WestecLayout>
    );
};

export default About;

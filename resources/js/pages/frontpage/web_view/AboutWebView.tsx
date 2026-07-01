import AboutContent from '../about/AboutContent';

const AboutWebView = () => {
    return (
        <div>
            <div className="text-foreground bg-background">
                <main className="mx-auto max-w-7xl px-4 py-10">
                    <AboutContent />
                </main>
            </div>
        </div>
    );
};

export default AboutWebView;

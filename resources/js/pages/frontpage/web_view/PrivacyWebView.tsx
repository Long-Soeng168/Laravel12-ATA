import PrivacyContent from '../privacy/PrivacyContent';

const PrivacyWebView = () => {
    return (
        <div>
            <div className="text-foreground bg-background">
                <main className="mx-auto max-w-7xl px-4 py-10">
                    <PrivacyContent />
                </main>
            </div>
        </div>
    );
};

export default PrivacyWebView;

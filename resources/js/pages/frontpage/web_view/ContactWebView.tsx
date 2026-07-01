import ContactContent from '../contact/ContactContent';

const ContactWebView = () => {
    return (
        <div>
            <div className="text-foreground bg-background">
                <main className="mx-auto max-w-7xl px-4 py-10">
                    <ContactContent />
                </main>
            </div>
        </div>
    );
};

export default ContactWebView;

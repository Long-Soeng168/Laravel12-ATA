const MyGoogleMap = () => {
    return (
        <div className="relative h-96 w-full">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31268.71360350244!2d104.85317279754501!3d11.581279162733535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519e61e7251b%3A0x308b0c2e593ce8b8!2sWestern%20International%20School%20-%20Stadium%20(Main%20Campus)!5e0!3m2!1sen!2skh!4v1746174098623!5m2!1sen!2skh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute top-0 left-0 h-full w-full"
            ></iframe>
        </div>
    );
};

export default MyGoogleMap;

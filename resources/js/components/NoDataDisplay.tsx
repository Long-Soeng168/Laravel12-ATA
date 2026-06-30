import useTranslation from '@/hooks/use-translation';

const NoDataDisplay = ({ title = 'No Data', message = '' }) => {
    const { t } = useTranslation();
    return (
        <div className="flex w-full flex-col items-center justify-center pt-4 px-8">
            <div className="flex max-w-md flex-col items-center text-center transition-opacity duration-300 ease-in-out">
                {/* Image with subtle styling */}
                <img
                    src="/assets/icons/empty-box.png"
                    alt="Empty state illustration"
                    className="pointer-events-none h-24 w-24 object-contain opacity-70 drop-shadow-sm select-none sm:h-32 sm:w-32"
                    loading="lazy"
                />

                {/* Modern Typography */}
                <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-100">{t(title)}</h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t(message)}</p>
            </div>
        </div>
    );
};

export default NoDataDisplay;

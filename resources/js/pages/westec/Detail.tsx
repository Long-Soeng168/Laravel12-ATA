import MyImageGallery from './components/my-gallery-image';
import MyLayout from './layout/layout';

const Detail = () => {
    return (
        <MyLayout>
            <div className="px-4 sm:px-10 pt-10 flex gap-4 mb-20 bg-white ">
                <div className="max-w-xl">
                    <MyImageGallery />
                </div>
                <div>Descroption</div>
            </div>
        </MyLayout>
    );
};

export default Detail;

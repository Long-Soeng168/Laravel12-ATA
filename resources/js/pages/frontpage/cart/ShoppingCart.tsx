import MyStepper from '@/components/my-stepper';
import FrontPageLayout from '../layouts/frontpage-layout';
import CartItemList from './components/CartItemList';
import CartItemSummary from './components/CartItemSummary';

const ShoppingCart = () => {
    return (
        <FrontPageLayout>
            <div className="mx-auto my-10 max-w-screen-xl px-4">
                {/* <h1 className="mb-8 text-2xl font-bold lg:text-2xl">Shopping Cart</h1> */}
                <MyStepper steps={['Cart', 'Checkout', 'Complete']} currentStep={0} />
                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Products Table */}
                    <CartItemList />

                    {/* Summary Section */}
                    <CartItemSummary />
                </div>
            </div>
        </FrontPageLayout>
    );
};

export default ShoppingCart;

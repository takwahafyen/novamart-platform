import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CommonLayout from '../../../components/shop/common-layout';
import CartPage from './common/cart-page';

const Cart = () => {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/page/account/login');
        }
    }, [router]);

    return (
        <CommonLayout parent="home" title="cart">
            <CartPage />
        </CommonLayout>
    );
};

export default Cart;

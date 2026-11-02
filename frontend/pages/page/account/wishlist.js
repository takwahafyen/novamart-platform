import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CommonLayout from '../../../components/shop/common-layout';
import WishlistPage from './common/wishlist-page';

const Wishlist = () => {
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/page/account/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        }
    }, [router]);

    return (
        <CommonLayout parent="home" title="wishlist">
            <WishlistPage />
        </CommonLayout>
    );
}

export default Wishlist;

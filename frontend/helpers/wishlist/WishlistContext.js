import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const Context = createContext({
  wishlistItems: [],
  addToWish: () => {},
  removeFromWish: () => {},
});

const getLocalWishlistItems = () => {
  try {
    const list = localStorage.getItem('wishlist');
    return list ? JSON.parse(list) : [];
  } catch (err) {
    return [];
  }
};

export const Provider = (props) => {
  const [wishlistItems, setWishlistItems] = useState(getLocalWishlistItems());

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add Product To Wishlist
  const addToWish = (item) => {
    const index = wishlistItems.findIndex((wish) => wish.id === item.id);

    
      setWishlistItems([...wishlistItems, item]);
      toast.success('Product Added Successfully!');
    
  };

  // Remove Product From Wishlist
  const removeFromWish = (item) => {
    const updatedWishlist = wishlistItems.filter((e) => e.id !== item.id);
    setWishlistItems(updatedWishlist);
    toast.error('Product Removed Successfully!');
  };

  return (
    <Context.Provider
      value={{
        wishlistItems: wishlistItems,
        addToWish: addToWish,
        removeFromWish: removeFromWish,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export {
  Context as WishlistContext,
  Provider as WishlistContextProvider,
};

import { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuth } from './LoginContext';

export const WishlistCartContext = createContext();

export const WishlistCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { token, isLoggedIn } = useAuth();
  const toast = useToast();

  const fetchWithToken = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
    options.headers = { ...options.headers, ...headers };

    const response = await fetch(url, options);
    return response;
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetchWithToken('https://croma-backend-1.onrender.com/api/carts');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCartItems(data.data);
      setCartItemsCount(data.data.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchWishlistItems = async () => {
    try {
      const response = await fetchWithToken('https://croma-backend-1.onrender.com/api/wishlist');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data)
      setWishlistItems(data.data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems();
      fetchWishlistItems();
    }
  }, [isLoggedIn, token]);

  const addToCart = async (product) => {
    if (!isLoggedIn) {
      toast({
        title: 'Login Required',
        description: 'Please log in to add items to your cart.',
        status: 'warning',
        position: 'top-right',
        duration: 2000,
        isClosable: true
      });
      return;
    }

    try {
      const response = await fetchWithToken('https://croma-backend-1.onrender.com/api/carts', {
        method: 'POST',
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('Failed to add item to cart');
      await fetchCartItems();
      toast({
        title: 'Item Added',
        description: 'Product added to your cart successfully.',
        status: 'success',
        position: 'top-right',
        duration: 2000,
        isClosable: true
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast({
        title: 'Error',
        description: 'Failed to add item to cart.',
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true
      });
    }
  };

  const addToWishlist = async (product) => {
    if (!isLoggedIn) {
      toast({
        title: 'Login Required',
        description: 'Please log in to add items to your wishlist.',
        status: 'warning',
        position: 'top-right',
        duration: 2000,
        isClosable: true
      });
      return;
    }
  
    try {
      const response = await fetchWithToken('https://croma-backend-1.onrender.com/api/wishlist', {
        method: 'POST',
        body: JSON.stringify(product),
      });
  
      const responseData = await response.json();
      console.log(responseData)
      if (!response.ok) throw new Error(responseData.msg || 'Failed to add item to wishlist');
  
      await fetchWishlistItems();
      toast({
        title: 'Item Added',
        description: 'Product added to your wishlist successfully.',
        status: 'success',
        position: 'top-right',
        duration: 2000,
        isClosable: true
      });
    } catch (error) {
      console.error("Error adding item to wishlist:", error.message);
      toast({
        title: 'Error',
        description: `Failed to add item to wishlist. ${error.message}`,
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true
      });
    }
  };
  

  const removeFromCart = async (id, showToast = true) => {
 
    setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
    setCartItemsCount((prevCount) => prevCount - 1);
  
    try {
      const response = await fetchWithToken('https://croma-backend-1.onrender.com/api/carts', {
        method: 'DELETE',
        body: JSON.stringify({ id })
      });
      if (!response.ok) throw new Error('Failed to remove item from cart');
      
      if (showToast) {
        toast({
          title: 'Item Removed',
          description: 'Product removed from your cart successfully.',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true
        });
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      
      if (showToast) {
        toast({
          title: 'Error',
          description: 'Failed to remove item from cart.',
          status: 'error',
          position: 'top-right',
          duration: 2000,
          isClosable: true
        });
      }
      await fetchCartItems();
    }
  };
  
  const removeFromWishlist = async (id, showToast = true) => {
    try {
      const response = await fetchWithToken('https://croma-backend-1.onrender.com/api/wishlist', {
        method: 'DELETE',
        body: JSON.stringify({ id })
      });
      if (!response.ok) throw new Error('Failed to remove item from wishlist');
      setWishlistItems((prevItems) => prevItems.filter(item => item._id !== id));
      
      if (showToast) {
        toast({
          title: 'Item Removed',
          description: 'Product removed from your wishlist successfully.',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true
        });
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      if (showToast) {
        toast({
          title: 'Error',
          description: 'Failed to remove item from wishlist.',
          status: 'error',
          position: 'top-right',
          duration: 2000,
          isClosable: true
        });
      }
    }
  };

  return (
    <WishlistCartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        cartItemsCount,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistCartContext.Provider>
  );
};

export function useWishlistCart() {
  const wishlistContext = useContext(WishlistCartContext);
  return wishlistContext;
}

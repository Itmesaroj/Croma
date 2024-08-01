import { useState } from 'react';
import { useAuth } from '../context/LoginContext';
import { useWishlistCart } from "../context/wishList";
import { FaStar } from "react-icons/fa";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure } from '@chakra-ui/react';
import "../style/wishlist.css";

function WishList() {
  const { isLoggedIn } = useAuth();
  const { wishlistItems, addToCart, removeFromWishlist } = useWishlistCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);

  function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(price);
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item._id, false);
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleDelete = () => {
    if (selectedItem) {
      removeFromWishlist(selectedItem._id);
      onClose();
    }
  };

  return (
    <div className='wishlistContainer'>
      {isLoggedIn ? (
        <div>
          <div className='wishListPageHeading'>My Wishlist</div>
          <div className="my_wishList">
            {wishlistItems && wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <div key={item._id} className="wishlistProduct">
                  <div className='wrapper_product'>
                  <div className='wishlist_first_box'>
                    <img src={item.image} alt={item.title} className="wishlistProductImage" />
                  </div>
                  
                  <div className='wishlist_second_box'>
                    <h3>{item.title}</h3>
                    <p className='wishlist_brand'>Brand : {item.brand}</p>
                    <div className="wishlistPriceContainer">
                      <p className="wishlistActualPrice" >
                        {formatPrice(item.aprice)}
                      </p>
                      <p className="wishlistOriginalPrice">
                        {formatPrice(item.pprice)}
                      </p>
                      <p className="wishlistSavePercent">{item.savemoney}</p>
                    </div>
                    <p className="wishlistRatingContainer">
                      <span className="wishlistRating" style={{color:"#12DAA8"}}>Rating: {item.rating} </span>
                      <div className='star_section'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </p>
                  </div>
                  
                  </div>
                  
                  <div className='wishlist_third_box'>
                    <div className="wishlistButtonContainer">
                      <button className="wishlistRemoveButton wish-btn"  style={{border:"1.4px solid #ffffff", color:"white", borderRadius:"5px",background:"transparent"}} onClick={() => handleOpenModal(item)}>
                        Delete
                      </button>
                      <button className="wishlistAddButton wish-btn" style={{backgroundColor: "#12DAA8",  border:"2px solid #12DAA8" ,color:"#013528",borderRadius:"5px" }} onClick={() => handleAddToCart(item)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Your wishlist is empty.</p>
            )}
          </div>

          {/* Chakra UI Modal for Delete Confirmation */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered  
    >
            <ModalOverlay />
            <ModalContent backgroundColor="rgb(27, 27, 27)" className="model-cotent" color={"white"} maxWidth={"50%"} maxHeight={"300px"} >
              <ModalCloseButton />
              <ModalBody >
                Are you sure you want to remove this product from your wishlist?
              </ModalBody>
              <ModalFooter display={"flex"} justifyContent={"center"}>
                <Button style={{border:"1.4px solid #ffffff", borderRadius:"5px",color:"white" ,background:"transparent"}} mr={3} onClick={onClose} className="wishlistAdcdButton wish-btn">
                  No
                </Button>
                <Button variant='ghost' style={{backgroundColor: "#12DAA8",  border:"2px solid #12DAA8" ,color:"#013528",borderRadius:"5px" }} onClick={handleDelete} className="wishlistRemoveButton wish-btn">
                  Yes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

        </div>
      ) : (
        <p>Please log in to see your wishlist.</p>
      )}
    </div>
  );
}

export default WishList;

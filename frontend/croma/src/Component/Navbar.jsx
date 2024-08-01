import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import Croma_Logo from '../assets/Croma_Logo.svg';
import "../style/Navbar.css";
import { IoMenuOutline, IoPencil } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import {NavLink} from "react-router-dom"
import MobileNavbar from './ModileNavbar';
import { useAuth } from '../context/LoginContext';
import { IoLogOut } from "react-icons/io5";
import { useWishlistCart} from "../context/wishList";
function Navbar() {
  const {isLoggedIn,logout}=useAuth()
  const {cartItemsCount}=useWishlistCart()
  return (
    <>
    {/* desktop navbar */}
      <div className="desktop_navbar_layout">
        <div>
          <NavLink to='/'> <img src={Croma_Logo} alt="Croma Logo" /></NavLink>
         
        </div>
        <div className="desktop_navbar_menu">
          <Menu  className="align_main_menu_drop">
            <MenuButton color='white'  border='none' display='flex' as={"button"}>
              <div style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
                <IoMenuOutline color='white' style={{ fontSize: "38px" }} />
                <p className='text-sm'>Menu</p>
              </div>
            </MenuButton>
            <MenuList className='menu_items'>
              <h3>Shop by Category</h3>
              <MenuItem className='menu_item_class'><NavLink to='/Televisions'>Televisions & Accessories</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/HomeAppliances'>Home Appliances</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/PhonesWearables'>Phones & Wearables</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/ComputersTablets'>Computers & Tablets</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/KitchenAppliances'>Kitchen Appliances</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/AudioVideo'>Audio & Video</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/HealthFitness'>Health & Fitness</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/GroomingPersonalCare'>Grooming & Personal Care</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/CamerasAccessories'>Cameras & Accessories</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/SmartDevices'>Smart Devices</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/Gaming'>Gaming</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/Accessories'>Accessories</NavLink></MenuItem>
              <MenuItem className='menu_item_class'><NavLink to='/ZipCare'>ZipCare</NavLink></MenuItem>

            </MenuList>
          </Menu>
        </div>
        <div className='navbar_search'>
          <input type="text" placeholder="What are you looking for?" className='custom-input' />
          <CiSearch className='custom-heading' />
        </div>
        <div className="user_details_container">
          <div className="location_part">
            <MdLocationOn className="text-xl" />
            <p className="whitespace-nowrap text-sm">Mumbai 400049</p>
            <IoPencil className="text-xs" />
          </div>
          <div className="user_image">
            <Menu>
              <MenuButton border={'none'} backgroundColor={"black"} color={"white"} fontSize={"20px"}>
                <FaUser />
              </MenuButton>
              <MenuList className='menu_items user_drop_dwon_menu'>
                <p className='title_menu_drop'>Edit basic details</p>
                <NavLink to='/MyProfile'>
                  <MenuItem className='menu_item_class user_menu'>
                    <div><i className="fa-regular fa-user"></i></div>
                    <div>
                      <h3>New User</h3>
                      <p>Create Account</p>
                    </div>
                  </MenuItem>
                </NavLink>
                <NavLink to='/MyAddress'>
                  <MenuItem className='menu_item_class user_menu'>
                    <div><i className="fa-regular fa-address-book"></i></div>
                    <div className='user_details'>
                      <h3>My Address</h3>
                      <p>Manage your saved address</p>
                    </div>
                  </MenuItem>
                </NavLink>
                <NavLink to='/MyOrders'>
                  <MenuItem className='menu_item_class user_menu'>
                    <div><i className="fa-solid fa-bag-shopping"></i></div>
                    <div className='user_details'>
                      <h3>My Order</h3>
                      <p>View, track, cancel, reorder products</p>
                    </div>
                  </MenuItem>
                </NavLink>
                <NavLink to='/MyPrivilegeOffers'>
                  <MenuItem className='menu_item_class user_menu'>
                    <div><i className="fa-regular fa-star"></i></div>
                    <div className='user_details'>
                      <h3>My Privilege Offers</h3>
                      <p>Exclusive offers for you</p>
                    </div>
                  </MenuItem>
                </NavLink>
                <NavLink to='/MyWishlist'>
                  <MenuItem className='menu_item_class user_menu'>
                    <div><i className="fa-regular fa-heart"></i></div>
                    <div className='user_details'>
                      <h3>My WishList</h3>
                      <p>Have a look at your favorite products</p>
                    </div>
                  </MenuItem>
                </NavLink>
                <div>
                  <MenuItem className='menu_item_class user_menu'>
                  {isLoggedIn?<NavLink onClick={()=>{logout()}}>
                                    <MenuItem className='menu_item_class user_menu'>
                                        <div><IoLogOut fontSize={"40px"}/></div>
                                        <div className='user_details'>
                                            <h3>LogOut</h3>
                                        </div>
                                    </MenuItem>
                                </NavLink>: <NavLink to='/Login'>
                                    <MenuItem className='menu_item_class user_menu'>
                                        <div>{isLoggedIn?<IoLogOut fontSize={"40px"}/>:<i className="fa-solid fa-right-from-bracket"></i>}</div>
                                        <div className='user_details'>
                                            <h3>LogIn</h3>
                                        </div>
                                    </MenuItem>
                                </NavLink>}
                  </MenuItem>
                </div>
              </MenuList>
            </Menu>
          </div>
          <div className="cart_icon">
            <NavLink to="/cart" className="cart_hover"><FaShoppingCart/></NavLink>
            <p className="counter_cart">{cartItemsCount}</p>
          </div>
        </div>
      </div>


    {/* Mobile Song*/}
   
    < div className="mobile_navbar_Lavout" >
      <MobileNavbar/>
      <div className='navbar_search' style={{minHeight:"40px"}}>
          <input type="text" placeholder="What are you looking for?" className='custom-input' />
          <CiSearch className='custom-heading' />
        </div>
      </div>
   
   
    </>
  );
}

export default Navbar;

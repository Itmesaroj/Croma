import { useRef } from 'react';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import Croma_Logo from '../assets/Croma_Logo.svg';
import "../style/Navbar.css";
import { IoMenuOutline, IoPencil } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from '../context/LoginContext';
import { IoLogOut } from "react-icons/io5";
function MobileNavbar() {
    const {isLoggedIn,logout}=useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    return (
        <div style={{width:"100%",display:'flex', justifyContent:"space-between",height:"50%", alignItems:'center'}}>
            <div className='left_box'>
                <div className="desktop_navbar_menu">
                    <Button ref={btnRef} onClick={onOpen} border="none" background="black" color="white">
                        <IoMenuOutline color='white' style={{ fontSize: "38px" }} />
                        <p className='text-sm'>Menu</p>
                    </Button>
                </div>
                <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef} >
                    <DrawerContent>
                        <DrawerBody background="black" width="300px">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ color: '#12DAA8' }}>Menu</h2>
                                <DrawerCloseButton
                                    width="20px"
                                    background="black"
                                    color="white"
                                    fontSize="20px"
                                    border="none"
                                    padding="2rem"
                                />
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/Televisions'>Televisions & Accessories</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/HomeAppliances'>Home Appliances</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/PhonesWearables'>Phones & Wearables</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/ComputersTablets'>Computers & Tablets</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/KitchenAppliances'>Kitchen Appliances</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/AudioVideo'>Audio & Video</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/HealthFitness'>Health & Fitness</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/GroomingPersonalCare'>Grooming & Personal Care</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/CamerasAccessories'>Cameras & Accessories</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/SmartDevices'>Smart Devices</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/Gaming'>Gaming</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/Accessories'>Accessories</NavLink>
                            </div>
                            <div className='menu_item_class'>
                                <NavLink to='/ZipCare'>ZipCare</NavLink>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
                <div>
                <NavLink to='/'>
                    <img src={Croma_Logo} alt="Croma Logo" width={"70px"} />
                </NavLink>
            </div>
            </div>
            <div className='right_box'>
                <div className="user_details_container">     
                    <div className="location_part">
                        <MdLocationOn className="text-xl" />
                        <p className="whitespace-nowrap text-sm">Mumbai 400049</p>
                        <IoPencil className="text-xs" />
                    </div>
                    <div className="user_image">
                        <Menu>
                            <MenuButton border="none" backgroundColor="black" color="white" fontSize="20px" >
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
                                
                            </MenuList>
                        </Menu>
                    </div>
                    <div className="cart_icon">
                        <NavLink to="/cart" className="cart_hover">
                            <FaShoppingCart />
                        </NavLink>
                        <p className="counter_cart">0</p>
                    </div>
                </div>
            </div>




        </div>
    );
}

export default MobileNavbar;

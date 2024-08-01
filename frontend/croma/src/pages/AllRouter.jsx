import {Routes,Route} from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import WishList from "./WishList"
import Cart from "./Cart"
import Order from "./Order"

import Address from "./Address"
import Televisions from "./Televisions"
import SingleProduct from "./SingleProduct"
import Register from "./Register"
function AllRouter() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Televisions" element={<Televisions/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/MyWishlist" element={ <WishList/>}/>
        <Route path="/MyOrders" element={<Order/>}/>
        <Route path="/MyProfile" element={<Register/>}/>
        <Route path="/MyAddress" element={<Address/>}/>
        <Route path="/television/:id" element={<SingleProduct/>}/>
    </Routes>
    </>
  )
}

export default AllRouter

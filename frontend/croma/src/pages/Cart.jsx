import { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  StepIcon,
  StepNumber,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';
import "../style/Address.css"
import { Stack, InputGroup, InputLeftAddon, Input,  Select } from '@chakra-ui/react';
import { FaRegAddressCard } from 'react-icons/fa';
import { useWishlistCart } from '../context/wishList';
import { useAuth } from '../context/LoginContext';
import "../style/Cart.css";

import {NavLink} from "react-router-dom"

const steps = [
  { title: 'Cart', description: 'Review Your Cart Items' },
  { title: 'Shipping', description: 'Enter Shipping Address' },
  { title: 'Payment', description: 'Payment Information' },
];

function CartStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const { cartItems, removeFromCart, cartItemsCount } = useWishlistCart();
  const { isLoggedIn,token } = useAuth();
  const [totalActualPrice, setTotalActualPrice] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addemail: '',
    phone: '',
    address: ''
});

const [errors, setErrors] = useState({
    email: '',
    phone: ''
});

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));

  if (name === 'addemail') {
      setErrors((prev) => ({
          ...prev,
          email: validateEmail(value) ? '' : 'Invalid email address'
      }));
  }
  if (name === 'phone') {
      setErrors((prev) => ({
          ...prev,
          phone: validatePhone(value) ? '' : 'Invalid phone number'
      }));
  }
};


const addressFrom = (e) => {
  e.preventDefault();
  const requiredFields = ['firstName', 'lastName', 'addemail', 'phone', 'address'];
  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
  }

  if (!validateEmail(formData.addemail)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
      return;
  }

  if (!validatePhone(formData.phone)) {
      setErrors((prev) => ({ ...prev, phone: 'Invalid phone number' }));
      return;
  }

  nextStep();
};



const OrderSubmit = async () => {
  try {
   
    const orderData = {
      ...formData,
      orderItems: cartItems,
    };

   
    const response = await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '', 
      },
      body: JSON.stringify(orderData),
    });


    const result = await response.json();
    if (response.ok) {
      alert(result.msg); 
      
      cartItems.forEach(item => removeFromCart(item._id, false));
      nextStep(); 
    } else {
      alert(result.msg); 
    }
  } catch (error) {
    console.error('Error placing order:', error);
    alert('An error occurred while placing the order.');
  }
};


  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.aprice, 0);
    setTotalActualPrice(total);
  }, [cartItems]);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderCartItems = () => (
    <div className='cart_item_container_box'>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item._id} className='cartItem'>
            <div className="cartItem_left">
              <img src={item.image} alt={item.title} className='cart-item-image' />
              <div className='cartItem-part'>
                <p className='item-title-cart'>{item.title}</p>
                <button className='remove-button' onClick={() => handleRemove(item._id)}>
                  Remove
                </button>
              </div>
            </div>
            <div className="cartItem-right">
              <div className='cart-item-details'>
                <div className='original-price-cart-box'>
                  <p className='item-price original-price' style={{ fontSize: "25px", fontWeight: "700" }}>
                  ₹{item.aprice.toLocaleString()}
                  </p>
                  <span style={{ fontSize: "14px", fontWeight: "400" }}>(Incl. all Taxes)</span>
                </div>
                <div className='discounted-box'>
                  <p className='item-price discounted-price-cart'>
                    MRP₹{item.pprice.toLocaleString()}
                  </p>
                  <p className='item-save-money-cart'>{item.savemoney}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Text>Your cart is empty.</Text>
      )}
    </div>
  );

  const renderOrderSummary = () => (
    <div className='cart_order_summary_box'>
      {cartItems.length > 0 && (
        <div className='order-summary'>
          <p className='order-summary-title'>Order Summary (items {cartItemsCount})</p>
          <div className='money_summary'>
            <p>
              <span>Original Price</span>
              <span>
                ₹{totalActualPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </p>
            <p>
              <span>Savings💵</span> ₹00.00
            </p>
            <p>
              <span>Total Price🛒</span>
              <span>
                ₹{totalActualPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </p>
            <button className='order-summary-checkout-button' onClick={nextStep}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
  

  const handleOrder=async()=>{
    OrderSubmit()
   
  }
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className='cart_item_total_container'>
            {renderCartItems()}
            {renderOrderSummary()}
          </div>
        );
      case 1:
        return (
          <div className='cart_item_total_container' style={{background: "#fbfafa"}}>
          <div className='shipping_from_main_box'>
            <div className="shipping_from_main_heading">
                <h2>
                    <span>Enter Shipping Information</span>
                    <span><FaRegAddressCard /></span>
                </h2>
            </div>

            <div className="main_address_from">
                <div className="contact_info">
                    <h3>Contact Information</h3>
                </div>
                <form >
                    <div className='from_input_box'>
                        <div className='shipping_input_div'>
                            <label htmlFor="title">Title</label>
                            <Select
                                name="title"
                                id="title"
                                className='select_input'
                                placeholder="Select"
                                onChange={(e) => handleChange(e)}
                            >
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                                <option value="Dr">Dr</option>
                                <option value="Prof">Prof</option>
                            </Select>
                        </div>
                        <div className='shipping_input_div'>
                            <label htmlFor="firstName">First Name</label>
                            <Input
                                type="text"
                                id='firstName'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder='Enter First Name'
                                required
                            />
                        </div>
                    </div>
                    <div className='from_input_box'>
                        <div className='shipping_input_div'>
                            <label htmlFor="middleName">Middle Name</label>
                            <Input
                                type="text"
                                id='middleName'
                                name='middleName'
                                placeholder='Enter Middle Name'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='shipping_input_div'>
                            <label htmlFor="lastName">Last Name</label>
                            <Input
                                type="text"
                                id="lastName"
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder='Enter Last Name'
                                required
                            />
                        </div>
                    </div>
                    <div className='from_input_box'>
                        <div className='shipping_input_div'>
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                id='email'
                                name='addemail'
                                value={formData.addemail}
                                onChange={handleChange}
                                placeholder='Enter Email Address'
                                isInvalid={!!errors.email}
                            />
                            {errors.email && <span className='error'>{errors.email}</span>}
                        </div>
                        <div className='shipping_input_div'>
                            <label htmlFor="phone">Mobile Number</label>
                            <Stack spacing={4}>
                                <InputGroup>
                                    <InputLeftAddon>+91</InputLeftAddon>
                                    <Input
                                        type='tel'
                                        id='phone'
                                        name='phone'
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder='Enter Phone Number'
                                        isInvalid={!!errors.phone}
                                    />
                                </InputGroup>
                                {errors.phone && <span className='error'>{errors.phone}</span>}
                            </Stack>
                        </div>
                    </div>

                    <div className="from_input_box">
                        <div className='shipping_input_div'>
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="shipping-address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Search for building name, landmark, street, area ..."
                                className="shipping-textarea"
                            />
                        </div>
                    </div>

                    
                </form>
            </div>
        </div>
      <div className='cart_order_summary_box'>
      {cartItems.length > 0 && (
        <div className='order-summary'>
          <p className='order-summary-title'>Order Summary (items {cartItemsCount})</p>
          <div className='money_summary'>
            <p>
              <span>Original Price</span>
              <span>
                ₹{totalActualPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </p>
            <p>
              <span>Savings💵</span> ₹00.00
            </p>
            <p>
              <span>Total Price🛒</span>
              <span>
                ₹{totalActualPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </p>
            <button className='order-summary-checkout-button' onClick={addressFrom}>
              proccedd to payment
            </button>
            <Button mt={4} ml={2} onClick={prevStep}>
              Back to Address
            </Button>
          </div>
        </div>
      )}
    </div>
    </div>
        );
      case 2:
        return (
          <div className='cart_item_total_container' style={{ background: "#fbfafa" }}>
            <div className="payment-form-container">
              <form>
                <div className="form-control">
                  <label htmlFor="cardName">Name on Card</label>
                  <input type="text" id="cardName" placeholder="Enter name as it appears on your card" required />
                </div>
    
                <div className="form-control">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input type="text" id="cardNumber" placeholder="Enter your card number" required />
                </div>
    
                <div className="form-group">
                  <div className="form-control">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="text" id="expiryDate" placeholder="MM/YY" required />
                  </div>
    
                  <div className="form-control">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="CVV" required />
                  </div>
                </div>
    
                <div className="form-control">
                  <label htmlFor="billingAddress">Billing Address</label>
                  <input type="text" id="billingAddress" placeholder="Enter your billing address" required />
                </div>
    
                <div className="payment-method-container">
  <label htmlFor="paymentMethod">Payment Method</label>
  <div className="radio-group">
    <input type="radio" id="cashOnDelivery" name="paymentMethod" value="cashOnDelivery" defaultChecked />
    <label htmlFor="cashOnDelivery">Cash on Delivery</label>
    
    <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" />
    <label htmlFor="creditCard">Credit Card</label>
    
    <input type="radio" id="debitCard" name="paymentMethod" value="debitCard" />
    <label htmlFor="debitCard">Debit Card</label>
    
    <input type="radio" id="netBanking" name="paymentMethod" value="netBanking" />
    <label htmlFor="netBanking">Net Banking</label>
  </div>
</div>
              </form>
            </div>
    
            <div className='cart_order_summary_box'>
              {cartItems.length > 0 && (
                <div className='order-summary'>
                  <p className='order-summary-title'>Order Summary (items {cartItemsCount})</p>
                  <div className='money_summary'>
                    <p>
                      <span>Original Price</span>
                      <span>
                        ₹{totalActualPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </p>
                    <p>
                      <span>Savings💵</span> ₹00.00
                    </p>
                    <p>
                      <span>Total Price🛒</span>
                      <span>
                        ₹{totalActualPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </p>
                    <button className='order-summary-checkout-button' onClick={handleOrder}>
                      Placed Order
                    </button>
                    <Button mt={4} ml={2} onClick={prevStep}>
              Back to Address
            </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='cart-container'>
      {cartItems.length > 0 ? (
        <div className='cart_mid_container'>
          <div className='cart_top_container'>
            <Stepper index={activeStep} className='custom-stepper'>
              {steps.map((step, index) => (
                <Step key={index} className='custom-step'>
                  <StepIndicator className='custom-step-indicator'>
                    <StepStatus
                      complete={<StepIcon className='custom-step-icon' />}
                      incomplete={<StepNumber className='custom-step-number' />}
                      active={<StepNumber className='custom-step-number' />}
                    />
                  </StepIndicator>
                  <Box className='stepper_content custom-step-content'>
                    <StepTitle className='stepper_title custom-step-title'>
                      {step.title}
                    </StepTitle>
                    <StepDescription className='stepper_description custom-step-description'>
                      {step.description}
                    </StepDescription>
                  </Box>
                  {index < steps.length - 1 && (
                    <StepSeparator className='custom-step-separator' />
                  )}
                </Step>
              ))}
            </Stepper>
          </div>
          <div className='cart_bottom_container'>
            {renderStepContent()}
          </div>
        </div>
      ) : (
        <div className='empty-cart-message' >
          <div>
          <img src="https://i.pinimg.com/originals/49/8c/8f/498c8f38095278d39ca2018ff1fb4a6e.gif" alt="" />
          </div>
         
          <div>
            No Product In Cart
          </div>
          <NavLink to="/">
          <button >
            Continue Shopping
          </button>
          </NavLink>
          
        </div>
      )}
    </div>
  );
  
}

export default CartStepper;

import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import "../style/Login.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/LoginContext';
function Login() {
  const {login}=useAuth()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Field Validation
    if (!formData.email || !formData.password) {
      toast({
        title: 'Validation Error',
        description: 'All fields are required',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true
      });
      return;
    }
  
    if (!validateEmail(formData.email)) {
      toast({
        title: 'Validation Error',
        description: 'Invalid email format',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true
      });
      return;
    }
  
    if (!validatePassword(formData.password)) {
      toast({
        title: 'Validation Error',
        description: 'Password must be at least 8 characters long',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true
      });
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json(); 
  
      if (response.ok) {
        localStorage.setItem("token", result.token);
        login(result.token)
        toast({
          title: 'Login Successful',
          description: result.msg,
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true
        });
        setTimeout(()=>{
          navigate('/');
        })
        
      } else {
        toast({
          title: 'Login Failed',
          description: result.error || 'An error occurred',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'An Error Occurred',
        description: error.message || 'Please try again later',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <div className="form-container">
      <div className="login-form">
        <h2>Login</h2>
        <div className="login_form-input-section">
          <form onSubmit={handleSubmit}>
            <div className="login_input-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter Your Email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
            <div className="login_input-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Enter Password" 
                value={formData.password} 
                onChange={handleChange} 
              />
            </div>
            <div className="login_input-group">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

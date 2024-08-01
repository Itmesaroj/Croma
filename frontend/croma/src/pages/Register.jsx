import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import "../style/Register.css";
import { useNavigate } from 'react-router-dom';
function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobileNumber: '',
    gender: ''
  });

  const toast = useToast();
const  navigate=useNavigate()
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

  const validateMobileNumber = (number) => {
    const re = /^\d{10}$/;
    return re.test(String(number));
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field Validation
    if (!formData.username || !formData.email || !formData.password || !formData.mobileNumber || !formData.gender) {
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
        position: 'top-right',
        description: 'Invalid email format',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }

    if (!validateMobileNumber(formData.mobileNumber)) {
      toast({
        title: 'Validation Error',
        position: 'top-right',
        description: 'Mobile number must be 10 digits',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast({
        title: 'Validation Error',
        position: 'top-right',
        description: 'Password must be at least 8 characters long',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          mobileNumber: Number(formData.mobileNumber) 
        })
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'Registration Successful',
          description: result.msg,
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        });
        setTimeout(()=>{
          navigate('/');
        })
      } else {
        const result = await response.json();
        throw new Error(result.error);
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
      <div className="registration-form">
        <h2>Register Form</h2>
        <div className="form-input-section">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input type="text" name="mobileNumber" id="mobileNumber" placeholder="Enter Your Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender:</label>
              <select name="gender" id="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

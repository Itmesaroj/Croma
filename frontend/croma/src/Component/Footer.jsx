import { NavLink } from 'react-router-dom';

function Footer() {
  const firstList = [{ name: 'About Croma', to: '/about-croma' }, { name: 'Help And Support', to: '/help-and-support' }, { name: 'FAQs', to: '/faqs' }, { name: 'Buying Guide', to: '/buying-guide' }, { name: 'Return Policy', to: '/return-policy' }, { name: 'B2B Orders', to: '/b2b-orders' }, { name: 'Store Locator', to: '/store-locator' }, { name: 'E-Waste', to: '/e-waste' }];
  const secondList = [{ name: 'Franchise Opportunity', to: '/franchise-opportunity' }, { name: 'Site Map', to: '/site-map' }, { name: 'Careers At Croma', to: '/careers-at-croma' }, { name: 'Terms of Use', to: '/terms-of-use' }, { name: 'Disclaimer', to: '/disclaimer' }, { name: 'Privacy Policy', to: '/privacy-policy' }, { name: 'Unboxed', to: '/unboxed' }, { name: 'Gift Card', to: '/gift-card' }, { name: 'Croma E-Star', to: '/croma-e-star' }];
  const productCategories = [{ name: 'Televisions & Accessories', to: '/televisions-accessories' }, { name: 'Home Appliances', to: '/home-appliances' }, { name: 'Phones & Wearables', to: '/phones-wearables' }, { name: 'Computers & Tablets', to: '/computers-tablets' }, { name: 'Kitchen Appliances', to: '/kitchen-appliances' }, { name: 'Audio & Video', to: '/audio-video' }, { name: 'Health & Fitness', to: '/health-fitness' }, { name: 'Grooming & Personal Care', to: '/grooming-personal-care' }, { name: 'Cameras & Accessories', to: '/cameras-accessories' }, { name: 'Smart Devices', to: '/smart-devices' }, { name: 'Gaming', to: '/gaming' }, { name: 'Accessories', to: '/accessories' }, { name: 'Top Brands', to: '/top-brands' }];
  return (
    <div className="footer_main_container">
      <div className="footer_content">
        <div className="firstBox">
          <div style={{ color: 'white' }}><h2>Connect with us</h2></div>
          <div><i className="fa-brands fa-youtube"></i><i className="fa-brands fa-facebook"></i><i className="fa-brands fa-square-instagram"></i><i className="fa-brands fa-linkedin"></i><i className="fa-brands fa-twitter"></i></div>
          <div><h5>© Copyright 2023 Croma. All rights reserved</h5></div>
        </div>
        <div className="second_box">
          <h3>Useful Links</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  {firstList.map((link, index) => (<p key={index}><NavLink to={link.to}>{link.name}</NavLink></p>))}
                </td>
                <td>
                  {secondList.map((link, index) => (<p key={index}><NavLink to={link.to}>{link.name}</NavLink></p>))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="third_box">
          <h3>Products</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  {productCategories.slice(0, Math.ceil(productCategories.length / 2)).map((category, index) => (<p key={index}><NavLink to={category.to}>{category.name}</NavLink></p>))}
                </td>
                <td>
                  {productCategories.slice(Math.ceil(productCategories.length / 2)).map((category, index) => (<p key={index}><NavLink to={category.to}>{category.name}</NavLink></p>))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Footer;

import Feature from "../Component/Feature"
import Footer from "../Component/Footer"
import SliderProductItem from "../Component/slider_product_item"
import SloderHome from "../Component/SloderHome"
import "../style/Home.css"
function Home() {
  return (
    <div>
      <SloderHome/>
      <SliderProductItem/>
      <Feature/>
      <Footer/>
    </div>
  )
}

export default Home

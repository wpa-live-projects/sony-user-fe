import Navbar from '../Components/Navbar/Navbar'
import AboutUs from '../Components/AboutUs/AboutUs'
import BestSellers from '../Components/BestSellers/BestSellers'
import Collections from '../Components/Collections/Collections'
import HeroSection from '../Components/HeroSection/HeroSection'
import Offer from '../Components/Offer/Offer'
import Reviews from '../Components/Reviews/Reviews'

const Home = () => {
  return (
    <div>
      <Navbar />
      <section id="hero"><HeroSection /></section>
      <section id="about"><AboutUs /></section>
      <section id="collections"><Collections /></section>
      <section id="offers"><Offer /></section>
      <section id="best-sellers"><BestSellers /></section>
      <section id="reviews"><Reviews /></section>
    </div>
  )
}

export default Home;

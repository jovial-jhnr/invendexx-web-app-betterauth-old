import Hero from '@/components/homeFeature/Hero.jsx';
// import PricingSect from '@/components/homeFeature/Pricing Section.jsx'
import Features from '@/components/homeFeature/Features.jsx'
import HomeAccordion from '@/components/homeFeature/HomeAccord.jsx'
import SectionPrice from '@/components/homeFeature/SectionPrice.jsx'

const Home = () =>{
    return(
        <>
        <div>
            <Hero/>
            <Features/>
            {/* <PricingSect/> */}
            <SectionPrice/>
            <HomeAccordion/>
            
        </div>
        </>
    )
}
export default Home

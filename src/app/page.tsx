import AboutCompany from "@/components/About-page/AboutCompany";
import ContactForm from "@/components/Contact/ContactForm";
import Hero from "@/components/Home-page/Hero";
import OurAdventure from "@/components/Home-page/OurAdventure";
import RecentBlogs from "@/components/Home-page/RecentBlogs";
export default function HomePage() {
  return (
     <div>
       <Hero/>
      <OurAdventure/>
      <AboutCompany/>
      <ContactForm/>
      <RecentBlogs/>
     </div>

  );
}
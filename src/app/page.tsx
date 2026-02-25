import { Metadata } from 'next';
import HeroBanner from '@/components/sections/home/HeroBanner';
import TrustBar from '@/components/sections/home/TrustBar';
import AboutSnapshot from '@/components/sections/home/AboutSnapshot';
import ServicesGrid from '@/components/sections/home/ServicesGrid';
import ProductsShowcase from '@/components/sections/home/ProductsShowcase';
import EngineBrands from '@/components/sections/home/EngineBrands';
import WhyChooseUs from '@/components/sections/home/WhyChooseUs';
import ProjectsGallery from '@/components/sections/home/ProjectsGallery';
import Testimonials from '@/components/sections/home/Testimonials';
import GlobalMap from '@/components/sections/home/GlobalMap';
import QuickQuote from '@/components/sections/home/QuickQuote';

export const metadata: Metadata = {
  title: "Leon International | Marine Engineering, Ship Repair & Spare Parts Supplier",
  description: "Leon International delivers comprehensive marine engineering services — ship repair, dry docking, NDT inspection, fabrication, HVAC, protective coatings & OEM spare parts. 50+ years experience. Offices in Pakistan, UAE, China & Latvia.",
  alternates: {
    canonical: 'https://leoninternational.com/',
  },
};

export default function Home() {
  return (
    <>
      <HeroBanner />
      <TrustBar />
      <AboutSnapshot />
      <ServicesGrid />
      <ProductsShowcase />
      <EngineBrands />
      <WhyChooseUs />
      <ProjectsGallery />
      <Testimonials />
      <GlobalMap />
      <QuickQuote />
    </>
  );
}

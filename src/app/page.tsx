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
  title: 'Leon International | Marine Engineering & Ship Repair',
  description: 'Leading marine engineering company: ship repair, dry docking, NDT inspection, fabrication & OEM spare parts. 50+ years of excellence across Pakistan, UAE, China & Latvia.',
  alternates: {
    canonical: 'https://leon-international.com/',
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

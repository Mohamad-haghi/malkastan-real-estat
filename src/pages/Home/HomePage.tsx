import { Seo } from '@/components/ui/Seo';
import { Hero } from '@/components/sections/Hero';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { SmartFinder } from '@/components/search/SmartFinder';
import { LifestyleDiscovery } from '@/components/sections/LifestyleDiscovery';
import { TrustSection } from '@/components/sections/TrustSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { siteConfig } from '@/config/siteConfig';

export function HomePage() {
  return (
    <>
      <Seo
        title={`${siteConfig.brand} — ${siteConfig.tagline}`}
        description={siteConfig.description}
        image="https://images.pexels.com/photos/16573669/pexels-photo-16573669.jpeg?auto=compress&cs=tinysrgb&h=630&w=1200"
      />
      <Hero />
      <FeaturedProperties />
      <SmartFinder />
      <LifestyleDiscovery />
      <TrustSection />
      <CtaSection />
    </>
  );
}

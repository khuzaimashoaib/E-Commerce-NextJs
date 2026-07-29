import CollectionSec from "@/components/sections/CollectionSec";
import FeatureSec from "@/components/sections/FeatureSec";
import Hero from "@/components/sections/Hero";
import LatestCollSec from "@/components/sections/LatestCollSec";
import MarqueSec from "@/components/sections/MarqueSec";
import ShopByCategory from "@/components/sections/ShopByCategory";

export default function Home() {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <MarqueSec />
      <CollectionSec />
      <FeatureSec />
      <LatestCollSec />
    </>
  );
}

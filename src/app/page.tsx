import HeroBanner from '@/components/home/HeroBanner';
import StatsOverview from '@/components/home/StatsOverview';
import NewsTicker from '@/components/home/NewsTicker';
import Highlights from '@/components/home/Highlights';
import { stats, news, highlights } from '@/lib/data';

export default function Home() {
  return (
    <div className="pt-16 md:pt-20">
      <HeroBanner />
      <StatsOverview stats={stats} />
      <NewsTicker news={news} />
      <Highlights highlights={highlights} />
    </div>
  );
}

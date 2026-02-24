import HeroSection from "@/components/home/HeroSection";
import AgentStatusBar from "@/components/home/AgentStatusBar";
import KanbanPreview from "@/components/home/KanbanPreview";
import ActivityFeed from "@/components/home/ActivityFeed";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AgentStatusBar />
      <KanbanPreview />
      <ActivityFeed />
    </div>
  );
}

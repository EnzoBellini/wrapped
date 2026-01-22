import { SlideDeck } from "./SlideDeck";
import { AudioToggle } from "./ui/AudioToggle";

export function WrappedApp() {
  return (
    <div className="h-dvh w-full overflow-hidden">
      <SlideDeck />
      <AudioToggle />
    </div>
  );
}



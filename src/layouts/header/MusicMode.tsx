import { useState, useEffect } from "react";
// Mantine
import { ActionIcon } from "@mantine/core";
// Motion
import { AnimatePresence, motion } from "framer-motion";
// Icons
import { PlayerPlay, PlayerPause } from "tabler-icons-react";
// sounds
import useSound from "use-sound";
// hooks
import useAnalyticsEventTracker from "../../hooks/useAnalyticsEventTracker";
// mp3
import Chill from "/src/assets/sounds/chill.mp3";

// ------------------------------------------------------------

export default function MusicMode() {
  const gaEventTracker = useAnalyticsEventTracker({
    category: "Music",
    action: "Switch",
    label: "Switch Music",
  });

  const [playMode, setPlayMode] = useState(true);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // sound effects on click with mobile-friendly options
  const [play, { stop }] = useSound(Chill, {
    volume: 0.5,
    html5: true, // Use HTML5 audio for better mobile support
    preload: true, // Preload the audio
    onload: () => setIsAudioReady(true), // Track when audio is ready
  });

  // Enable audio context on first user interaction
  useEffect(() => {
    const enableAudio = () => {
      // Resume audio context if it's suspended (common on mobile)
      if (typeof window !== "undefined" && window.AudioContext) {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }
      }
      document.removeEventListener("touchstart", enableAudio);
      document.removeEventListener("click", enableAudio);
    };

    document.addEventListener("touchstart", enableAudio);
    document.addEventListener("click", enableAudio);

    return () => {
      document.removeEventListener("touchstart", enableAudio);
      document.removeEventListener("click", enableAudio);
    };
  }, []);

  const handleClick = async () => {
    try {
      if (playMode) {
        // For mobile devices, we need to ensure the audio context is resumed
        const audioElement = document.querySelector("audio");
        if (audioElement && audioElement.paused) {
          await play();
        } else {
          play();
        }
      } else {
        stop();
      }
      setPlayMode(!playMode);
      gaEventTracker(playMode ? { label: "Music Off" } : { label: "Music On" });
    } catch (error) {
      console.warn("Audio playback failed:", error);
      // Still update the UI even if audio fails
      setPlayMode(!playMode);
      gaEventTracker(playMode ? { label: "Music Off" } : { label: "Music On" });
    }
  };

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        style={{ display: "inline-block" }}
        key={playMode.toString()}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ActionIcon
          size="xl"
          onClick={handleClick}
          variant="filled"
          radius="lg"
          aria-label={playMode ? "Music Off" : "Music On"}
          sx={(theme: any) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.gray[8]
                : theme.colors.gray[0],
            color:
              theme.colorScheme === "dark"
                ? theme.colors.gray[0]
                : theme.colors.gray[8],
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[9]
                  : theme.colors.gray[1],
            },
          })}
        >
          {playMode === true ? <PlayerPlay size={24} /> : <PlayerPause />}
        </ActionIcon>
      </motion.div>
    </AnimatePresence>
  );
}

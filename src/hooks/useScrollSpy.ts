import { useEffect, useState } from "react";

interface UseScrollSpyProps {
  sectionIds: string[];
  offset?: number;
}

export const useScrollSpy = ({
  sectionIds,
  offset = 100,
}: UseScrollSpyProps) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the current section based on scroll position
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);

        if (element) {
          const { offsetTop } = element;

          if (scrollPosition >= offsetTop) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    // Set initial active section
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
};

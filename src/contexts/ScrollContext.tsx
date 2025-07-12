import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useScrollSpy } from "../hooks/useScrollSpy";

interface ScrollContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
  sectionIds: string[];
}

export const ScrollProvider = ({
  children,
  sectionIds,
}: ScrollProviderProps) => {
  const [activeSection, setActiveSection] = useState("#home");

  // Use scroll spy to automatically detect current section
  const scrollSpySection = useScrollSpy({ sectionIds, offset: 150 });

  // Update active section when scroll spy detects a new section
  useEffect(() => {
    if (scrollSpySection) {
      setActiveSection(scrollSpySection);
    }
  }, [scrollSpySection]);

  return (
    <ScrollContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};

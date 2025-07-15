import { forwardRef, ReactNode } from "react";
// mantine
import { Box } from "@mantine/core";
// context
import { useScrollContext } from "src/contexts/ScrollContext";

// ----------------------------------------------------------

interface SectionProps {
  children: ReactNode;
  meta?: ReactNode;
  withBackground?: boolean;
  isFirst?: boolean;
  height?: string;
  sectionId?: string; // Add sectionId prop to identify the section
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    { children, meta, height, isFirst, withBackground, sectionId, ...other },
    ref
  ) => {
    // Get active section from context
    const { activeSection } = useScrollContext();

    // Define which sections should have backgrounds
    const backgroundSections = ["#about", "#projects"];

    // Determine if this section should have a background
    // Use sectionId if provided, otherwise fall back to withBackground prop
    const shouldHaveBackground = sectionId
      ? backgroundSections.includes(`#${sectionId}`)
      : withBackground;

    return (
      <Box
        sx={(theme: any) => ({
          [theme.fn.largerThan("sm")]: {
            minHeight: "100vh",
          },
          [theme.fn.smallerThan("sm")]: {
            minHeight: "60vh",
          },
          [theme.fn.smallerThan("md")]: {
            marginTop: isFirst ? -150 : 20,
            marginBottom: isFirst ? 150 : -17,
          },
          [theme.fn.largerThan("md")]: {
            marginTop: isFirst ? -125 : 0,
            marginBottom: isFirst ? 10 : -17,
          },
          marginRight: -16,
          marginLeft: -16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: shouldHaveBackground
            ? theme.colorScheme === "dark"
              ? theme.colors.yellow[2]
              : theme.colors.orange[1]
            : "transparent",
        })}
        ref={ref}
        {...other}
      >
        {children}
      </Box>
    );
  }
);

export default Section;

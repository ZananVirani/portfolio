import { useState } from "react";
// Mantine
import { ActionIcon, createStyles } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
// components
import About from "src/components/About";
import { Contact } from "src/components/Contact";
import Github from "src/components/Github";
import Hero from "src/components/Hero";
import Section from "src/components/Section";
import Skills from "src/components/Skills";
import Project from "src/components/Project";
// // icons
import { ArrowUp } from "tabler-icons-react";

// -------------------------------------------------

const useStyles = createStyles((theme) => ({
  sticky: {
    position: "fixed", // Change from sticky to fixed
    zIndex: 9999,
    bottom: 25, // Fixed distance from bottom
    right: 25, // Fixed distance from right
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    [theme.fn.largerThan("md")]: {
      bottom: 75,
      right: 75,
    },
  },
}));

export default function LandingPage() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const { classes } = useStyles();

  const handleParallaxNavigationUp = () => {
    scrollIntoView({ alignment: "center" });
  };

  return (
    <>
      <div ref={targetRef} />
      <Section withBackground={false} isFirst={true} sectionId="home">
        <div id="home">
          <Hero />
        </div>
      </Section>
      <Section withBackground={true} sectionId="about">
        <div id="about">
          <About />
        </div>
      </Section>
      <Section withBackground={false} sectionId="skills">
        <div id="skills">
          <Skills />
        </div>
      </Section>
      <Section withBackground={true} height={"200hv"} sectionId="projects">
        <div id="projects">
          <Project />
        </div>
      </Section>
      {/* <Section withBackground={false} sectionId="contact">
        <div id="contact">
          <Contact />
        </div>
      </Section> */}
      <div className={classes.sticky}>
        <ActionIcon
          variant="filled"
          color="gray"
          radius={50}
          aria-label="Scroll to top"
          onClick={handleParallaxNavigationUp}
          // disabled={currentOffset >= 2}
          size={45}
          mr={25}
        >
          <ArrowUp />
        </ActionIcon>
      </div>
    </>
  );
}

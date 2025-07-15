// React
import { Outlet } from "react-router-dom";
// Manatine UI
import { AppShell, useMantineTheme } from "@mantine/core";
// header
import Footer from "src/components/Footer";
import HeaderResponsive from "./header/HeaderResponsive";
// context
import { ScrollProvider } from "src/contexts/ScrollContext";

//-----------------------------------------------------------------------------

const links = [
  {
    label: "Home",
    link: "#home",
  },
  {
    label: "About",
    link: "#about",
  },
  {
    label: "Skills",
    link: "#skills",
  },
  {
    label: "Projects",
    link: "#projects",
  },
  // {
  //   label: "Contact",
  //   link: "#contact",
  // },
];

export default function MainLayout(): JSX.Element {
  const theme = useMantineTheme();
  const sectionIds = links
    .map((link) => link.link)
    .filter((link) => link.startsWith("#"))
    .map((link) => link.substring(1));

  return (
    <ScrollProvider sectionIds={sectionIds}>
      <AppShell
        navbarOffsetBreakpoint={theme.breakpoints.md}
        fixed
        header={<HeaderResponsive links={links} />}
      >
        <Outlet />
        {/* <p style={{ justifyContent: "center", display: "flex" }}>
          Copyright © 2025 Zanan Virani, view the source code on{" "}
          <a
            href="https://github.com/ZananVirani/portfolio"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </p> */}
      </AppShell>
      <Footer />
    </ScrollProvider>
  );
}

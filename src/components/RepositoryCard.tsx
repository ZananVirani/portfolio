import {
  Badge,
  Box,
  Group,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { motion } from "framer-motion";
import { BrandGithub, GitFork, Star } from "tabler-icons-react";
import { getTagColor } from "../utils/getTagColor";

// ------------------------------------------------------

const mappings: Record<string, string[]> = {
  IPSFellowshipPRD: [],
  "ai-contribution-tracker": ["next", "fastapi"],
  "Black-Scholes-Options-Pricer": ["c++"],
  CafProject: ["react-native", "express"],
  Melofy: ["flutter"],
  PetGame: ["java"],
  portfolio: ["react"],
  "recipe.it": ["next", "fastapi"],
  PrivInspect: ["typescript", "python"],
};

type RepositoryCardProps = {
  title: string;
  description: string;
  url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  created_at: string;
};

export default function RepositoryCard({
  title,
  description,
  url,
  stargazers_count,
  forks_count,
  language,
  created_at,
}: RepositoryCardProps) {
  const handleLinkClick = (e: any, link: any) => {
    window.open(link);
    e.stopPropagation();
  };

  return (
    <motion.div whileHover={{ y: -5 }}>
      <Box
        sx={(theme: any) => ({
          padding: theme.spacing.md,
          maxHeight: 175,
          minHeight: 150,
          borderRadius: 25,
          // marginTop: theme.spacing.sm,
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[3]
          }`,
          boxShadow: `${theme.shadows.md} !important`,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.white[0],
        })}
        onClick={(e: any) => handleLinkClick(e, url)}
      >
        <Group>
          <Group>
            <Group>
              <BrandGithub />
              <Text size="md" weight={500} lineClamp={1}>
                {title}
              </Text>
            </Group>
            <Group position="apart">
              {/* <Group>
                {forks_count && (
                  <Group>
                    <GitFork size={18} color={"red"} />
                    {forks_count}
                  </Group>
                )}
                <Group>
                  <Star size={18} color={"orange"} />
                  {stargazers_count}
                </Group>
              </Group> */}
              {renderLanguage()}
            </Group>
          </Group>
          <Text lineClamp={4}>
            <TypographyStylesProvider>
              <Text size="xs">{description}</Text>
            </TypographyStylesProvider>
          </Text>
        </Group>
      </Box>
    </motion.div>
  );

  function renderLanguage() {
    const languages = mappings[title] || [];
    return languages.map((elem: string, index) => (
      <Badge
        key={index}
        sx={{ backgroundColor: getTagColor(elem), color: "#fff" }}
        size="md"
      >
        <Text size="xs">{elem}</Text>
      </Badge>
    ));
  }
}

import {
  Badge,
  Box,
  Group,
  Progress,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { motion } from "framer-motion";
import { BrandGithub, GitCommit, GitFork, Star } from "tabler-icons-react";
import { getTagColor } from "../utils/getTagColor";

// ------------------------------------------------------

const mappings: Record<string, string[]> = {
  IPSFellowshipPRD: ["case study"],
  "ai-contribution-tracker": ["next", "fastapi"],
  "Black-Scholes-Options-Pricer": ["c++"],
  CafProject: ["react-native", "express"],
  Melofy: ["flutter"],
  PetGame: ["java"],
  portfolio: ["react"],
  "recipe.it": ["next", "fastapi"],
  PrivInspect: ["typescript", "python"],
  "24-ues-stationbook": ["react-native", "express"],
};

type RepositoryCardProps = {
  title: string;
  description: string;
  url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  created_at: string;
  commit_count?: number | null;
  total_commit_count?: number | null;
};

export default function RepositoryCard({
  title,
  description,
  url,
  stargazers_count,
  forks_count,
  language,
  created_at,
  commit_count,
  total_commit_count,
}: RepositoryCardProps) {
  const handleLinkClick = (e: any, link: any) => {
    window.open(link);
    e.stopPropagation();
  };

  const commitSharePercentage =
    typeof commit_count === "number" &&
    typeof total_commit_count === "number" &&
    total_commit_count > 0
      ? Math.min((commit_count / total_commit_count) * 100, 100)
      : null;

  const languageBadges = renderLanguage();

  return (
    <motion.div whileHover={{ y: -5 }}>
      <Box
        sx={(theme: any) => ({
          padding: theme.spacing.md,
          maxHeight: 250,
          minHeight: 195,
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
          <Box>
            <Group spacing={8}>
              <BrandGithub />
              <Text size="md" weight={500} lineClamp={1}>
                {title}
              </Text>
            </Group>

            {languageBadges.length > 0 && (
              <Group mt={8} spacing={6}>
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
                {languageBadges}
              </Group>
            )}
          </Box>
          <TypographyStylesProvider>
            <Text size="xs" lineClamp={4} sx={{ lineHeight: 1.35, minHeight: "5.4em" }}>
              {description.trim()}
            </Text>
          </TypographyStylesProvider>

          {typeof commit_count === "number" && (
            <Box mt={5}>
              <Group spacing={6} mb={5}>
                <GitCommit size={16} />
                <Text size="xs" weight={600}>
                  {commit_count.toLocaleString()} commits
                  {typeof total_commit_count === "number"
                    ? ` of ${total_commit_count.toLocaleString()}`
                    : ""}
                </Text>
              </Group>
              <Progress
                value={commitSharePercentage ?? 0}
                size="sm"
                radius="xl"
              />
              <Text size="xs" mt={4} color="dimmed">
                {typeof commitSharePercentage === "number"
                  ? `Made ${commitSharePercentage.toFixed(0)}% of commits`
                  : "Commit share unavailable"}
              </Text>
            </Box>
          )}
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

import { useEffect, useState } from "react";
// Mantine
import { Container, Grid, Skeleton, Title } from "@mantine/core";
// Components
import BoxWrapper from "./BoxWrapper";
// d_mock
import github from "../_mock/github.json";
import RepositoryCard from "./RepositoryCard";

// ----------------------------------------------------------------------------

export default function Github() {
  const [repos, setRepos] = useState<any>([]);

  const projectOrder = (github as any).projectOrder || [];

  const sortReposByCustomOrder = (repositories: any[]) => {
    const orderMap = new Map(
      projectOrder.map((name: string, index: number) => [
        name.toLowerCase(),
        index,
      ]),
    );

    return [...repositories].sort((a: any, b: any) => {
      const aName = a?.name?.toLowerCase() || "";
      const bName = b?.name?.toLowerCase() || "";
      const aOrder = orderMap.has(aName)
        ? (orderMap.get(aName) as number)
        : Number.MAX_SAFE_INTEGER;
      const bOrder = orderMap.has(bName)
        ? (orderMap.get(bName) as number)
        : Number.MAX_SAFE_INTEGER;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      // Keep unspecified repositories in a stable alphabetical order.
      return aName.localeCompare(bName);
    });
  };

  const fetchData = async () => {
    try {
      const res = await fetch("https://api.github.com/users/ZananVirani/repos");
      const data = await res.json();

      // Check if data is an array before processing
      if (Array.isArray(data)) {
        setRepos(sortReposByCustomOrder(data).slice(0, 9));
      } else {
        console.error("GitHub API returned non-array data:", data);
        setRepos([]);
      }
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      setRepos([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container mt={50} mb={50} px="xl" size="xl">
      <BoxWrapper withBackground={false}>
        <Title
          order={1}
          sx={(theme) => ({
            marginBottom: 25,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.yellow[5]
                : theme.colors.orange[5],
          })}
        >
          {github.project}
        </Title>
        <Grid>
          {repos.length > 0
            ? repos.map((repo: any, index: number) => (
                <Grid.Col sm={12} md={6} lg={4} key={index}>
                  <RepositoryCard
                    title={repo.name}
                    description={repo.description}
                    language={repo.language}
                    url={repo.svn_url}
                    created_at={repo.created_at}
                    stargazers_count={repo.stargazers_count}
                    forks_count={repo.forks_count}
                  />
                </Grid.Col>
              ))
            : Array.from(Array(6)).map((_, index) => (
                <Grid.Col sm={12} md={6} lg={4} key={index}>
                  <Skeleton height={150} sx={{ minWidth: 175 }} radius="xl" />
                </Grid.Col>
              ))}
        </Grid>
      </BoxWrapper>
    </Container>
  );
}

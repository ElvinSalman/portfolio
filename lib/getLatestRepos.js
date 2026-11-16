export default async function getLatestRepos(data, token) {
  try {
    const response = await fetch(
      "https://api.github.com/users/" +
        encodeURIComponent(data.githubUsername) +
        "/repos?sort=updated&per_page=6",
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) return [];
    const repositories = await response.json();
    return Array.isArray(repositories)
      ? repositories.map(({ id, name, description, html_url }) => ({
          id,
          name,
          description,
          html_url,
        }))
      : [];
  } catch {
    return [];
  }
}

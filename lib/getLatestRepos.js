import axios from "axios";

const getLatestRepos = async (data, token) => {
  try {
    const username = data.githubUsername;

    const config = token
      ? { headers: { Authorization: `token ${token}` } }
      : {};

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      config
    );

    // Возвращаем массив последних 6 репозиториев
    return res.data;
  } catch (err) {
    console.error("Error fetching repos:", err);
    return [];
  }
};

export default getLatestRepos;

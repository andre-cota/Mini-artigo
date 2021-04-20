module.exports = {
  baseUrl: "https://api.github.com/search",
  searchRepositories: {
    url: "/repositories?q=language:python+",
  },
  searchInCode: {
    url: "/code?q=flake8,pylintrc,bandit,mypy+in:path+",
  },
};


const stage = process.env.SST_STAGE || "dev"
const basePath = stage === "production" ? "/prompter-cli" : ""

export default {
  url: stage === "production" ? "https://devan.gg/prompter-cli" : "http://localhost:4321",
  email: "huapayadevan@gmail.com",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/imdevan/prompter",
  githubDocs: "https://github.com/imdevan/prompter-cli",
  headerLinks: [
    { name: "Home", url: `${basePath}/` },
    { name: "Docs", url: `${basePath}/intro` },
  ],
}

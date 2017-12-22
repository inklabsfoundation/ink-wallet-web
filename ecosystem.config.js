module.exports = {
  apps: [
    {
      name: "qtum-web",
      script: "./lib/server/",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],
  deploy: {
    stage: {
      user: "deployer",
      host: "92.53.66.193",
      ref: "origin/feature/send-transaction-wip",
      repo: "git@github.com:EvercodeLab/qtum-web.git",
      path: "/var/www/qtum",
      "post-deploy": "npm install && ENABLE_NODESOURCE_PLUGIN=true clap build && pm2 startOrRestart ecosystem.config.js --env production",
      env: {
        "NODE_ENV": "production"
      }
    }
  }
};

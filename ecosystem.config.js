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
      ref: "origin/feature/final-features",
      repo: "git@github.com:EvercodeLab/qtum-web.git",
      path: "/var/www/qtum",
      "post-deploy": "yarn install --production=false && ENABLE_NODESOURCE_PLUGIN=true clap build && pm2 startOrRestart ecosystem.config.js --env production && pm2 save",
      env: {
        "NODE_ENV": "production"
      }
    },
    prod1: {
      user: "deployer",
      host: "47.75.42.201",
      ref: "origin/develop",
      repo: "git@github.com:inklabsfoundation/ink-wallet-web.git",
      path: "/var/www/wallet.ink.one",
      "post-deploy": "yarn install --production=false && ENABLE_NODESOURCE_PLUGIN=true clap build && pm2 startOrRestart ecosystem.config.js --env production && pm2 save",
      env: {
        "NODE_ENV": "production"
      }
    },
    prod2: {
      user: "deployer",
      host: "47.75.42.76",
      ref: "origin/develop",
      repo: "git@github.com:inklabsfoundation/ink-wallet-web.git",
      path: "/var/www/wallet.ink.one",
      "post-deploy": "yarn install --production=false && ENABLE_NODESOURCE_PLUGIN=true clap build && pm2 startOrRestart ecosystem.config.js --env production && pm2 save",
      env: {
        "NODE_ENV": "production"
      }
    }
  }
};

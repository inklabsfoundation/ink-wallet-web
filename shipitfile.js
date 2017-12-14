/* eslint-disable max-len */
module.exports = function (shipit) {
  require("shipit-deploy")(shipit);

  shipit.initConfig({
    default: {
      servers: "deployer@92.53.66.193",
      repositoryUrl: "git@github.com:EvercodeLab/qtum-web.git",
      ignores: [".git", "node_modules"],
      keepReleases: 3,
      deleteOnRollback: false,
      key: "~/.ssh/id_rsa.pub",
      shallowClone: true
    },
    staging: {
      deployTo: "/var/www/qtum",
      branch: "feature/create-wallet",
      env: "prod"
    }
  });

  shipit.task("deploy", () => {
    return shipit.remote(`cd ${shipit.config.deployTo} && git fetch && git checkout ${shipit.config.branch} && git reset --hard HEAD && git pull origin ${shipit.config.branch}`)
      .then(() => {
        shipit.remote(`cd ${ shipit.config.deployTo } && yarn install`).then(() => {
          shipit.remote(`cd ${ shipit.config.deployTo } && ENABLE_NODESOURCE_PLUGIN=true node_modules/xclap/bin/clap.js build`).then(() => {
            shipit.remote(`cd ${ shipit.config.deployTo } && nohup npm run ${ shipit.config.env } >out.log 2>&1`);
          });
        });
      });
  });
};

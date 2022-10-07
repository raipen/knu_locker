module.exports = {
  apps : [{
    script: './src/app.js',
    watch: '.',
    ignore_watch : [
      "node_modules",
      "src/log/*",
      "react/*",
    ],
    env: {
      // 개발 환경설정
      NODE_ENV: 'development',
    },
    env_production: {
        // 운영 환경설정 (--env production 옵션으로 지정할 수 있다.)
        NODE_ENV: 'production',
    }
  }],
};

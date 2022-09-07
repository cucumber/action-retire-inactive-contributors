module.exports = {
  default: [
      '--require-module ts-node/register', 
      '--require features/**/*.ts'
    ]
    .concat(process.env.CUCUMBER_PUBLISH_TOKEN ? "--publish" : "--publish-quiet")
    .join(" "),
  };

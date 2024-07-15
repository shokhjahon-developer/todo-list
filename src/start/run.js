const config = require("../../config");
const port = config.PORT;

const runner = async (app) => {
  app.listen(port, () => {
    console.log(`server starts on port: ${port}`);
  });
};

module.exports = runner;

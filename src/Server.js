const app = require('./index');
const { connetDb } = require("./config/db");

const PORT = 4567;

app.listen(PORT, () => {
  connetDb();
  console.log("ecommerce listening on port", PORT);
});

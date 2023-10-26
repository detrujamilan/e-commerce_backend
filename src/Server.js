const app = require(".");
const { connetDb } = require("./config/db");

const PORT = 5434;

app.listen(PORT, () => {
 connetDb();
  console.log("ecommerce listening on port", PORT);
});

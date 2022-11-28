const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();

// middleswares
app.use(cors());
app.use(express.json());

// apis in try finally
async function run() {
  try {
    const categorizedProductsCollection = client
      .db("laptopDeals")
      .collection("categorisedProducts");
    const usersCollection = client.db("laptopDeals").collection("users");
    const bookingsCollection = client.db("laptopDeals").collection("bookings");
    const productsCollection = client.db("laptopDeals").collection("products");
    const paymentsCollection = client.db("laptopDeals").collection("payments");

    const verifyAdmin = async (req, res, next) => {
      const decodedEmail = req.decoded.email;
      const query = { email: decodedEmail };
      const user = await usersCollection.findOne(query);

      if (user?.role !== "admin") {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    app.get("/categories", async (req, res) => {
      const query = {};
      const results = await categorizedProductsCollection.find(query).toArray();
      res.send(results);
    });

    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { category_id: id || !paid };
      const results = await productsCollection.find(query).toArray();
      res.send(results);
    });

    app.get("/products/:email", async (req, res) => {
      const email = req.params.email;
      const query = { seller_email: email };
      const results = await productsCollection.find(query).toArray();
      res.send(results);
    });

    app.get("/advertiseditems", async (req, res) => {
      const query = { advertised: true };
      const results = await productsCollection.find(query).toArray();
      res.send(results);
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("Laptop Deals is running...");
});

app.listen(port, () => {
  console.log("Laptop Deals server is running on port ==>", port);
});

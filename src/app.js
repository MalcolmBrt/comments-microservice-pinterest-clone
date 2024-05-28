import express from "express";
import mongoose from "mongoose";
import commentRoutes from "./routes.js";

const app = express();
const port = 3000;

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());

// Routes
app.use("/comments", commentRoutes);

async function start() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		app.listen(port, () => console.log(`Comments API listening on port ${port}`));
	} catch (err) {
		console.log(err);
	}
}

start();

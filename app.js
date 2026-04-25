import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from "./src/db/database.js";
import dotenv from "dotenv";

dotenv.config();

// rutas
import homeRoutes from "./src/routes/home.routes.js";
import postRoutes from "./src/routes/post.routes.js";

// repositorios
import postRepository from "./src/repositories/postRepository.js";
import userRepository from "./src/repositories/userRepository.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "src", "public")));

// rutas
app.use("/", homeRoutes);
app.use("/posts", postRoutes);

connectDB();

try {
    let user = await userRepository.findAll();
    
    if (user.length === 0) {
        user = await userRepository.create({
            email: "juan.aguirre.s@tecsup.edu.pe",
            name: "Juan",
            lastName: "Aguirre",
            age: 20,
            phoneNumber: "999999999",
            password: "12345678"
        });
    } else {
        user = user[0];
    }

    await postRepository.create({
        title: "Primer Post",
        content: "Este es un contenido de ejemplo válido",
        user: user._id,
        hashtags: ["#node", "#mongo"],
        imageUrl: "https://via.placeholder.com/300"
    });

} catch (error) {
    console.log("Error: ", error);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
const existingPosts = await postRepository.findAll();
if (existingPosts.length === 0) {
  await postRepository.create({
    title: "Primer Post",
    content: "Este es un contenido de ejemplo válido",
    user: user._id,
    hashtags: ["#node", "#mongo"],
    imageUrl: "https://via.placeholder.com/300"
  });
}
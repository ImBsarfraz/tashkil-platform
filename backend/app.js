import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { dbConnection } from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import tashkilRoutes from "./routes/tashkil.routes.js"
import path from "path"
import { errorHandlingMiddleware } from "./middlewares/errorMiddleware.js"

dotenv.config();
dbConnection();

const SERVER = process.env.PORT || 4000;

const app = express();

const _dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ limit: "10md", extended: true }));
app.use(cookieParser());

// apis
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tashkil", tashkilRoutes);

// for production
// when we want deploy frontend it needs a build se do npm run build and it creates
// dist folder in vite and build in react
app.use(express.static(path.join(_dirname, "/frontend/dist")));

// serve when got the different routes 
app.get("/*splat", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

app.use(errorHandlingMiddleware);

app.listen(SERVER, () => {
    console.log(`Serving on port ${SERVER}`);
})
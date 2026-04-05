import "dotenv/config"
import cors from "cors"
import mongoose  from "mongoose"
import express from "express"
import cookieParser from "cookie-parser"
const app = express()
const PORT = process.env.PORT || 9000
import Subscribe from "./routes/subsribe.js"

const allowedOrigins = [
  "http://localhost:5173",
  "https://rebornclassics.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", Subscribe)

app.get("/", (req, res) => {
    res.send("server running")
})

const startServer = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, () =>{
            console.log(`server is running on ${PORT}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

startServer()
import express, { Express, Request, Response} from 'express'
import { dbGetTvlByBridge, dbGetTvlByChain} from "./utils/dbQuery"
const app: Express = express()
const PORT = 3000

// Dummy route for testing
app.get('/', (req, res) => {
    res.send("Hello there mate!")
})

// 1. TvlByBridge
app.get('/tvlByBridge', async (req, res) => {
    res.send(await dbGetTvlByBridge())
})

// 2. TvlByChain
app.get('/tvlByChain', async (req, res) => {
    res.send(await dbGetTvlByChain())
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


import express, { Express, Request, Response} from 'express'
import { dbGetTvlByBridge, dbGetTvlByChain, dbGetChainTvlByBridge, dbGetChainTvlByAsset,
    dbGetAssetTvlByBridge, dbGetAssetTvlByChain} from "./utils/dbQuery"
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

// 3. Chain TVL by bridge
app.get('/chainTvlByBridge/:chain', async (req, res) => {
    res.send(await dbGetChainTvlByBridge(req.params.chain))
})

// 4. Chain TVL by Asset
app.get('/chainTvlByAsset/:chain', async (req, res) => {
    res.send(await dbGetChainTvlByAsset(req.params.chain))
})

// 5. Asset TVL by Bridge
app.get('/assetTvlByBridge/:asset', async (req, res) => {
    res.send(await dbGetAssetTvlByBridge(req.params.asset))
})

// 6. Asset TVL by Chain
app.get('/assetTvlByChain/:asset', async (req, res) => {
    res.send(await dbGetAssetTvlByChain(req.params.asset))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


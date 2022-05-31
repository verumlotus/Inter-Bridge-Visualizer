import express, { Express, Request, Response} from 'express'
const app: Express = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send("Hello there mate!")
})

// 1. TvlByBridge
app.get('/tvlByBridge', async (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})


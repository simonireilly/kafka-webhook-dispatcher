// Simple Webhook Server
//
// This server is a simple express serer designed to mimic responses from webhooks

//  Libraries
import express from 'express'
import { json } from 'body-parser'

// Config
const app = express().use(json()) // creates http server
const token = 'test' // type here your verification token

// Setup routes
app.get('/', (req, res) => {
    // check if verification token is correct
    if (req.query.token !== token) {
        return res.sendStatus(401)
    }

    // return challenge
    return res.end(req.query.challenge)
})

app.post('/', (req, res) => {
    // check if verification token is correct
    if (req.query.token !== token) {
        return res.sendStatus(401)
    }

    // print request body
    console.log(req.body)

    // return a text response
    const data = {
        responses: [
            {
                type: 'text',
                elements: ['Hi', 'Hello']
            }
        ]
    }

    res.json(data)
})

app.listen(3000, () => console.log('[BotEngine] Webhook is listening'))

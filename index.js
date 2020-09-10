const express = require('express');
const { config, engine } = require('express-edge')
const app = new express();
const utils = require('./js/utils')

config({ cache: process.env.NODE_ENV === 'production' });

app.use(engine)
app.use(express.static('public'))
app.set('views', `${__dirname}/views`)



app.get(['/', '\/index(\.html)?'], async (req, res) => {

    res.render('index', {
        lastUpdate: utils.formatCustomDate(new Date())
    })
})



app.get('\/dashboard(\.html)?', async (req, res) => {
    res.render('dashboard', {
        
    })
})


let listenPort = 8081
app.listen(listenPort, () => {
    console.log('App listening on port ' + listenPort);
})
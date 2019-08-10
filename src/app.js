const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name : 'louis'
    })
})

app.get('/about', (req,res) => {
    res.render(
        'about',
        {
            title: 'About me',
            name: 'louis'
        }
    )
})

app.get('/help', (req,res) => {
    res.render(
        'help',
        {
            helpText: 'Help message',
            title: 'Help',
            name: 'Louis'
        }
    )
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: "best"
//     },{
//         name: "louis"
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    geoCode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error: error
                    })
                }
    
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
          })
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'louis',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'louis',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
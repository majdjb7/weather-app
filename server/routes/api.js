const express = require('express')
const moment = require('moment')
const urllib = require('urllib')
const router = express.Router()
const City = require('./models/City')
const API_KEY = "15c3e05f5ebc08478d4946e9dc5e36b1"
// const apiCall = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherDB', { useNewUrlParser: true })


let city1
// ********************************************************************************************************
router.get('/city', function(req, res) {
    let cityName = req.query.cityName

    urllib.request(`api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`, function (request, response) {
        let cityData = JSON.parse(response)
        // console.log(cityData)
        city1 = new City({
                 name: cityName,
                 temperature: cityData.main.temp,
                 condition: cityData.weather[0].main,
                 conditionPic: cityData.weather[0].icon
        })
        // city1.save()
        res.send(city1)
    })
})
// ********************************************************************************************************
router.get('/cities', function(req, res) {
    City.find({}, function(err, cities) {
        // console.log(cities)
        res.send(cities)
    })
})
// ********************************************************************************************************
router.post('/city', function(req, res) {
    // let cityName = req.query.cityName
    let cityName = req.body.cityName
    console.log("TO ADD: ", cityName)

    // urllib.request(`api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`, function (request, response) {
    //     let cityData = JSON.parse(response)
    //     console.log(cityData)
    //     let city1 = new City({
    //              name: cityName,
    //              temperature: cityData.main.temp,
    //              condition: cityData.weather[0].main,
    //              conditionPic: cityData.weather[0].icon
    //     })
    city1.save()
    res.send(city1)
    // })
})
// ********************************************************************************************************
router.delete('/city', function(req, res) {
    let cityName = req.query.cityName
    City.findOneAndDelete({name: cityName}, function(err, city) {
        console.log(city)
    })
    res.end()
})
// ********************************************************************************************************


module.exports = router
const express = require('express')
const moment = require('moment')
const urllib = require('urllib')
const router = express.Router()
const City = require('../../models/City')
const API_KEY = "15c3e05f5ebc08478d4946e9dc5e36b1"
// const apiCall = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL||'mongodb://localhost/weatherDB', { useNewUrlParser: true })
    .then(() => console.log("connected")).catch((error) => console.log(error))

let city1
// ********************************************************************************************************
router.get('/city', function(req, res) {
    let cityName = req.query.cityName

    urllib.request(`api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`, function (request, response) {
        let cityData = JSON.parse(response)
        // console.log(cityData)
        temperatureCelsius = parseInt(cityData.main.temp) - 273.15
        
        city1 = new City({
                 name: cityName,
                 temperature: Math.round(temperatureCelsius).toFixed(2),
                 condition: cityData.weather[0].main,
                 conditionPic: `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`
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
    let cityName = req.body
    console.log(cityName)
    let city1 = new City({
                     name: cityName.name,
                     temperature: cityName.temperature,
                     condition: cityName.condition,
                     conditionPic: cityName.conditionPic
            })
    
    city1.save()
    res.send(city1)
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
const citiesModel = new CitiesModel();
let render
async function loadPage() {
    await citiesModel.getDataFromDB()
    render = new Renderer(citiesModel.cityData);
    console.log(citiesModel.cityData)
    render.renderResults();
    $(".save").hide()
}

loadPage()

async function handleSearch(cityName) {
    await citiesModel.getCityData(cityName)
}

$("body").on("click", "#submit", async function() {
    let cityName = $("#city").val()
    console.log(cityName)
    await handleSearch(cityName)
    render.renderResults();
})

$("body").on("click", ".save", function() {
    let cityNameToAdd = $(this).closest('.weatherCard').find('.location')[0].innerHTML
    let cityTemperatureToAdd = $(this).closest('.weatherCard').find('.temp')[0].innerHTML
    let cityConditionToAdd = $(this).closest('.weatherCard').find('.condition')[0].innerHTML
    let cityIconToAdd = $(this).closest('.weatherCard').find('.conditionPic')[0].src
    // let deleteButton = $(this).closest('.weatherCard').find('.delete')
    $(this).hide()
    // console.log(deleteButton)

    let cityObject = {
                name: cityNameToAdd,
                temperature: cityTemperatureToAdd.slice(0, -1),
                condition: cityConditionToAdd,
                conditionPic: cityIconToAdd
    }
    citiesModel.saveCity(cityObject)
})

$("body").on("click", ".delete", function() {
    let cityToDelete = $(this).closest('.currentTemp').find('.location')[0].innerHTML
    citiesModel.removeCity(cityToDelete)
    
    
        render.renderResults();
     
})
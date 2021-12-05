const citiesModel = new CitiesModel();
let render
async function loadPage() {
    await citiesModel.getDataFromDB()
    render = new Renderer(citiesModel.cityData);
    console.log(citiesModel.cityData)
    render.renderResults();
}

loadPage()

async function handleSearch(cityName) {
    await citiesModel.getCityData(cityName)

}

$("#submit").on("click", function() {
    let cityName = $("#city").val()
    handleSearch(cityName)
    setTimeout(function() {
        render.renderResults();
      }, 500);
      ;
    

})

$("#save").on("click", function() {
    let cityName = $("#city").val()
    let cityNameObj = {"cityName": cityName}
    citiesModel.saveCity(cityName)
    render.renderResults();

})

$("body").on("click", ".save", function() {
    let cityNameToAdd = $(this).closest('.cityDiv').find('.name')[0].innerHTML
    let cityTemperatureToAdd = $(this).closest('.cityDiv').find('.temperature')[0].innerHTML
    let cityConditionToAdd = $(this).closest('.cityDiv').find('.condition')[0].innerHTML
    let cityIconToAdd = $(this).closest('.cityDiv').find('.conditionPic')[0].src

    let cityObject = {
                name: cityNameToAdd,
                temperature: cityTemperatureToAdd.slice(13),
                condition: cityConditionToAdd.slice(11),
                conditionPic: cityIconToAdd
    }
    citiesModel.saveCity(cityObject)
    // render.renderResults();

})

$("body").on("click", ".delete", function() {
    let cityToDelete = $(this).closest('.cityDiv').find('.name')[0].innerHTML
    console.log(cityToDelete)
    citiesModel.removeCity(cityToDelete)

    setTimeout(function() {
        render.renderResults();
      }, 1000);
      ;
    // let cityName = $("#city").val()
    // let cityNameObj = {"cityName": cityName}
    // citiesModel.saveCity(cityName)
    // render.renderResults();

})
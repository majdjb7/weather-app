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
    let cityName = $("#city").val()
    let cityNameObj = {"cityName": cityName}
    citiesModel.saveCity(cityName)
    render.renderResults();

})

$("body").on("click", ".delete", function() {
    let cityToDelete = $(this).closest('.cityDiv').find('.name')[0].innerHTML
    console.log(cityToDelete)
    citiesModel.removeCity(cityToDelete)

    setTimeout(function() {
        render.renderResults();
      }, 3000);
      ;
    // let cityName = $("#city").val()
    // let cityNameObj = {"cityName": cityName}
    // citiesModel.saveCity(cityName)
    // render.renderResults();

})
class CitiesModel{
    constructor() {
        this.cityData = []
    }

    getDataFromDB = async function () {
        this.cityData = await $.get(`cities/`)
    }

    getCityData(cityName) {
        $.get(`city/?cityName=${cityName}`, function (response) {
          }).then(response => {
              let city = response
              this.cityData.push(city)
          });
    }


    saveCity(cityToSave) {
        $.post('city/', cityToSave, function(response) {
        })
    }

    removeCity(cityToRemove) {
        $.ajax({
            url : `city/?cityName=${cityToRemove}`,
            method : 'delete',
            data : {
               cityName: cityToRemove
            }
       })
    }
}
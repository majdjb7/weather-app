class CitiesModel{
    constructor() {
        this.cityData = []
    }

    getDataFromDB = async function () {
        this.cityData = await $.get(`cities/`)
    }

    async getCityData(cityName) {
        return $.get(`city/?cityName=${cityName}`, function (response) {
          }).then(response => {
              console.log(response)
              let city = response
              this.cityData.push(city)
          });
    }


    saveCity(cityToSave) {
        $.post('city/', cityToSave, function(response) {
        })
    }

    removeCity(cityToRemove) {
        // this.data.splice(cityToRemove)
        $.ajax({
            url : `city/?cityName=${cityToRemove}`,
            method : 'delete',
            data : {
               cityName: cityToRemove
            }
       })
    }
}
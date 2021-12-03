class CitiesModel{
    constructor() {
        this.cityData = []
    }

    // getDataFromDB() {
    //     $.get(`cities/`, function (response) {
    //         this.cityData = response
    //       });
    // }
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
    //     $.ajax({
    //         url : `city`,
    //         method : 'post',
    //         data : {
    //            cityName: cityToSave
    //         }
    //    })


        $.post('city/', cityToSave, function(response) {
            // response.send(cityToSave)
        })
        // .then(
        //     this.getDataFromDB()
        // )
    }

    removeCity(cityToRemove) {
        $.ajax({
            url : `city/?cityName=${cityToRemove}`,
            method : 'delete',
            data : {
               cityName: cityToRemove
            }
       })
        // $.delete('city/', cityToRemove, function(response) {
        //     response.send(cityToRemove)
        // }).then(
        //     getDataFromDB()
        // )
    }
}
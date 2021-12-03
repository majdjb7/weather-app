
var source = $('#ingredients-template').html();
var template = Handlebars.compile(source);

class Renderer {
    constructor(data) {
      this.data = data;
    }
  
    renderResults() {
        const citiesInfo = {"cities": this.data};
        $(".CitiesList").empty();
        var newHTML = template(citiesInfo);
        $('.CitiesList').append(newHTML);
    }
}
function buscarMapas() {

    var options = document.getElementsByName("optionsRadios");
    var url_servidor;
    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            url_servidor = options[i].value;
        }
    }
    var textoBuscar = document.getElementById("text_filter_socrata").value; //encodeURI()
    var limiteResultados = document.getElementById("num_results_socrata").value;
    var peticion1 = url_servidor + "q=" + textoBuscar + "&limit=" + limiteResultados + "&only=map";
    // console.log(peticion1);

    enviarPeticion(peticion1).then(function (respuestaSocrata) {

        if (respuestaSocrata) {
            // console.info(respuestaSocrata);
            document.getElementById("results").innerHTML = "Resultados encontrados:<b>" + respuestaSocrata.resultSetSize + "</b>";
            //$('#mygrid').html('');

            var resultadosHTML;

            if (respuestaSocrata.resultSetSize >= 1) {
                resultadosHTML = "<ul>";
                for (var i = 0; i < respuestaSocrata.results.length; i++) {

                    resultadosHTML = resultadosHTML + '<li class="li"><b>' + respuestaSocrata.results[i].resource.name + ': <b>' +
                        '<a target="_blank" title="' + respuestaSocrata.results[i].resource.attribution + '" href="' + respuestaSocrata.results[i].link + '"> Link </a> ' +
                        '<a class="btn btn-success btn-xs" onClick="obtenerGeoJson(this.id)" title="' + respuestaSocrata.results[i].resource.attribution + '" href="#" id="' + respuestaSocrata.results[i].resource.id + '#' + respuestaSocrata.results[i].metadata.domain + '">Ver mapa</a>';

                }
                resultadosHTML = resultadosHTML + "</ul>";
                document.getElementById("mygrid").innerHTML = resultadosHTML;


            } else {

                document.getElementById("results").innerHTML = "No hay resultados";
            }
        }
    });//fin peticion



} // fin funcion

function obtenerGeoJson(data) {

    var params = data.split("#");
    var peticion2 = 'https://' + params[1] + '/api/views.json?method=getByResourceName&name=' + params[0];

    enviarPeticion(peticion2).then(function (respuestaNodoSocrata) {
        var peticion3;
        var isGeojson;
        var bbox;
        console.info(respuestaNodoSocrata);

        if (respuestaNodoSocrata.metadata && respuestaNodoSocrata.metadata.geo) { //es geo

            peticion3 = 'https://' + params[1] + '/api/geospatial/' + respuestaNodoSocrata.childViews[0] + '?method=export&format=GeoJSON';
            isGeojson = true;
            bbox = respuestaNodoSocrata.metadata.geo.bbox;
        } else { // es una tabla

            peticion3 = 'https://' + params[1] + '/resource/' + params[0] + '.json?$limit=1000';
            isGeojson = false;
            bbox = null;

        }

        enviarPeticion(peticion3).then(function (respuestaRecurso) {

            // console.info(respuestaNodoSocrata.metadata.geo.bbox);
            console.info(respuestaRecurso);
            prepararDatos(respuestaRecurso, bbox, isGeojson);

        });// fin peticion 2 

    });// fin peticion 2 

} //finfuncion
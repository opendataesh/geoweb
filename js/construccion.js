function addconstruccionCapa() {

    map.addSource("construccion_source", {
        "type": "vector",
        "url": "mapbox://mapboxesh.bl66yh45"  // Nuestor ID Tileset

    }); //fin map source

    map.addLayer({
        "id": "construccion",
        "type": "fill-extrusion",
        "source": "construccion_source",
        "source-layer": "TG_CONSTRUCCION1-a4i8iu", // Nuestro nombre Tileset
        "maxzoom": 21,
        "minzoom": 15,
        "filter": [">", "Piso", 0],
        "paint": {
                "fill-extrusion-color": [
                "interpolate", ["linear"], ["number", ["get", "Piso"]],
                0, "#FFFFFF",
                1, "#FF0000",
                2, "#FFF26D",
                3, "#4CFF00",
                4, "#0026FF",
                5, "#0026FF",
                6, "#FF00DC"
                 ],
                "fill-extrusion-height": [
                "interpolate", ["linear"], ["zoom"], 8, 0, 12.5, 0,
                14, ["*", 1, ["to-number", ["get", "Piso"]]],
                16, ["*", 1.5, ["to-number", ["get", "Piso"]]],
                20, ["*", 2, ["to-number", ["get", "Piso"]]]
            ],
            "fill-extrusion-opacity": 0.9
        }
    }
        , "road-label-small"
    );

} //fin funcion


function filtrarconstruccion(valor) {
    map.setFilter("construccion", [">", "Piso", parseInt(valor-1)]);

    document.getElementById("altura").innerHTML = "De  <b>" + valor + "</b> piso(s)";

}
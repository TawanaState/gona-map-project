// Layers list
export const Layers = [
    {
        title : "Default",
        description : "Default layer",
        icon : "/assets/images/layers/default.png",
        url : "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        options : {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        },
    },
    /*{
        title : "satellite",
        description : "Satellite layer",
        icon : "/assets/images/layers/satellite.png",
        url : "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        options : {
            maxZoom: 18,
            attribution: `&copy; <a href="http://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community`,
        },
    },*/
    {
        title : "Satellite",
        description : "Satellite layer",
        icon : "/assets/images/layers/satellite.png",
        url : "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        options : {
            maxZoom: 20,
            attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains : ['mto', 'mt1', 'mt2', 'mt3']
        }
    },
    {
        title : "Terrain",
        description : "Terrain layer",
        icon : "/assets/images/layers/terrain.png",
        url : "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        options : {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        },
    }
]

function genLayerElement(id, title, checked = false) {
    let layer = Layers.find(layer => layer.title === title);

    let layer_option = document.createElement("div");
    layer_option.className = "layer-option";
    layer_option.setAttribute("id", id);
    layer_option.setAttribute("title", title);
    layer_option.setAttribute("description", "Layer description here");

    let layer_button = document.createElement("input");
    layer_button.type = "radio";
    layer_button.name = "layer";
    layer_button.id = id;
    layer_button.style.setProperty("--data-icon", `url("${layer.icon}")`);
    layer_button.checked = checked; // Default to checked

    if (checked) {
        L.tileLayer(layer.url, layer.options).addTo(window.MAP);
    }

    layer_button.onchange = (e) => {
        if (e.target.checked) {
            L.tileLayer(layer.url, layer.options).addTo(window.MAP);
        } else {
            window.MAP.eachLayer((layer) => {
                if (layer instanceof L.TileLayer) {
                    window.MAP.removeLayer(layer);
                }
            });
        }
    }
    layer_option.appendChild(layer_button);

    let layer_label = document.createElement("label");
    layer_label.setAttribute("for", id);
    layer_label.innerText = title;
    layer_option.appendChild(layer_label);

    return layer_option;
}


export function setupLayers(defaultLayer=0) {
    const layersModal = document.querySelector(".layers-modal");
    layersModal.addEventListener("click", (e) => {
        window.history.back();
    })
    const layersContainer = document.querySelector(".layers-modal-options");
    layersContainer.innerHTML = ""; // Clear existing layers
    Layers.forEach((layer, index) => {
        let layerElement = genLayerElement("layer-" + layer.title.replaceAll(" ", "-"), layer.title, index === defaultLayer);
        layersContainer.appendChild(layerElement);
    });
    
}
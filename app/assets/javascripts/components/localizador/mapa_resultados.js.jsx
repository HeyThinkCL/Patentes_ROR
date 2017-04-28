class Mapa extends React.Component {
    static markersMap;
    static change;
    static resultados;
    constructor(props) {
        super(props);
        change = true;
        mapax = function (ixx) {



            if (ixx!=0 && resultados[ixx-1].ubicacion == resultados[ixx].ubicacion){


                resultados_posicion=[resultados[ixx]]

                for(jxx=ixx-1 ; jxx >=0 && resultados[jxx].ubicacion== resultados[ixx].ubicacion;jxx--){
                    resultados_posicion.push(resultados[jxx])

                }

                    props.nounico(resultados_posicion)
            }
            else {

                props.seleccionar_mapa(resultados[ixx])
            }
        }

        cerca = function (lat,lng) {
            near={lat:lat,lng:lng}
            map = {zoom:16,lat:lat,lng:lng}
            $.post("/api/cerca",near,function (data) {
                console.log(data);
                props.funcion(data,map)
            })


        }
    }



    componentDidMount() {
        var $this = $(ReactDOM.findDOMNode(this));
        googleMapWithMarkersExample = function () {

            var $markersMap = $('#demo-map-buscardor');
            if ($markersMap.length) {
                markersMap = new GMaps({
                    div: $markersMap[0],
                    height: '560px',
                    lat: -33.4558882,
                    lng: -70.5959592,
                    zoom: 13
                });




            }

   /*         GMaps.on('click', markersMap.map, function(event) {

                var lat = event.latLng.lat();
                var lng = event.latLng.lng();


                cerca(lat,lng);
            });*/


        }
        googleMapWithMarkersExample()
    }


    render() {

        if(change ==this.props.change ){

            change=!change;
            markersMap.removeMarkers();
            markersMap.setCenter(this.props.map.lat,this.props.map.lng);
            markersMap.setZoom(this.props.map.zoom);
            resultados = this.props.resultados;


            var dato;
            var datos = this.props.resultados;

            juntas= $("#onJuntas").val() || []
            markersMap.removePolygons()


            for (junta of juntas){

                id_search = junta.split("-")[0].replace(" ","")

                    for (junta_vecino of this.props.juntasvecinos) {

                        if (junta_vecino.numero == id_search) {

                            var p = []
                            for (poli of junta_vecino.area.replace("POLYGON ((", "").replace("))", "").split(",")) {
                                p.push(poli.split(" ").reverse());
                            }
                            markersMap.drawPolygon({
                                fillColor: '#3fb7ff',
                                fillOpacity: 0.35,
                                paths: p,
                                strokeColor: '#3fb7ff',
                                strokeOpacity: 0.8,
                                strokeWeight: 2
                            });
                        }
                    }
            }


            for (var ixx =0 ; ixx < datos.length ; ixx++){

                dato = datos[ixx]
                if (ixx > 0 && datos[ixx].ubicacion ==  datos[ixx-1].ubicacion){
                    icon = "/img/markers/manhole-jb4c.png"


                }
                else{
                    if ( dato.deuda && dato.deudor ) {
                        icon = "/img/markers/deudores.png"
                    }
                    else if (dato.deuda){

                        icon = "/img/markers/townhouse_comprometidos.png"
                    }
                    else {
                        icon = "/img/markers/townhouse.png"
                    }

                }

                var l = dato.ubicacion.replace("POINT(","").replace(")","").split(" ")

                markersMap.addMarker({
                    title: dato.nombre_social,
                    content: ixx,
                    lat: l[1],
                    lng: l[0],
                    icon: icon,
                    click: function click(evt) {
                        mapax(evt.content);
                        //toastr.info(evt.content, evt.title);
                    }
                });

            }

        }


        return <div>
            <div id="demo-map-buscardor"></div>

            {/*<div className="form-group">*/}
                {/*<button className="btn btn-primary btn-block btn-next" type="button" onClick={this.buscar} >Activar busqueda en mapa</button>*/}
            {/*</div>*/}


        </div>;
    }
}
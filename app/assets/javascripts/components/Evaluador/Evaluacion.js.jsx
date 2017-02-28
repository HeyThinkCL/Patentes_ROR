class Evaluacion extends React.Component {
    static juntas_vecinos;
    static mapa;
    static ubicaciones_giro;
    static ubicacion_patente;
    constructor(props){
        super(props)

        juntas_vecinos = this.props.resultados.juntas_vecinos;
        mapa  = this.props.resultados.mapa;
        ubicacion_giro = props.resultados.giro
        ubicacion_patente = props.resultados.patente



        this.giros = function () {

            if(props.resultados.giro.length){

                return <span className="fw-l">{props.resultados.giro[0].distancia} Metros</span>
            }else {

                return <span className="fw-l">No existen</span>
            }
        }
        this.patentes = function () {

            if(props.resultados.patente.length){

                return <span className="fw-l">{props.resultados.patente[0].distancia} Metros</span>
            }else {

                return <span className="fw-l">No existen</span>
            }
        }


    }

    componentDidMount() {
        var $markersMap = $('#demo-map-buscardor2');
        markersMap = new GMaps({
            div: $markersMap[0],
            height: '460px',
            lat: mapa.lat,
            lng: mapa.lng,
            zoom: 15
        });
        map = markersMap;


        var p = []


        for(poli of juntas_vecinos.area.replace("POLYGON((","").replace("))","").split(",")){
            p.push(poli.split(" ").reverse());
        }
        map.drawPolygon({
            fillColor: "#61aeff",
            fillOpacity: 0.35,
            paths: p,
            strokeColor: '#3fb7ff',
            strokeOpacity: 0.8,
            strokeWeight: 2
        });



        for(giro of ubicacion_giro) {

            ubicacion = giro.ubicacion.replace("POINT(", "").replace(")", "").split(" ")
            map.addMarker({
                title: "",
                lat: ubicacion[1],
                lng: ubicacion[0],
                icon :"/img/markers/townhouse.png",
                zIndex:1


            });
        }

        for(patente of ubicacion_patente) {

            ubicacion = patente.ubicacion.replace("POINT(", "").replace(")", "").split(" ")
            map.addMarker({
                title: "",
                lat: ubicacion[1],
                lng: ubicacion[0],
                icon :"/img/markers/townhouse.png",
                zIndex:1


            });
        }

        map.addMarker({
            title: "",
            icon: "/img/icon.png",
            lat: mapa.lat,
            lng: mapa.lng,
            zIndex:2


        });





    }

    render(){



        return <div>

            <div className="row gutter-xs">
                <div className="col-md-6 col-lg-4">
                    <div className="card bg-primary">
                        <div className="card-body">
                            <div className="media">
                                <div className="media-middle media-left">
                  <span className="bg-primary-inverse circle sq-48">
                    <span className="icon icon-user" />
                  </span>
                                </div>
                                <div className="media-middle media-body">
                                    <h6 className="media-heading">Junta de vecino <br /></h6>
                                    <h3 className="media-heading">
                                        <span className="fw-l">{this.props.resultados.juntas_vecinos.numero} - {this.props.resultados.juntas_vecinos.nombre}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 ">
                    <div className="card bg-info">
                        <div className="card-body">
                            <div className="media">
                                <div className="media-middle media-left">
                  <span className="bg-info-inverse circle sq-48">
                    <span className="icon icon-shopping-bag" />
                  </span>
                                </div>
                                <div className="media-middle media-body">
                                    <h6 className="media-heading">Distancia a un proximo local de mismas cartacteristicas</h6>
                                    <h3 className="media-heading">

                                        {this.giros()}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 ">
                    <div className="card bg-info">
                        <div className="card-body">
                            <div className="media">
                                <div className="media-middle media-left">
                  <span className="bg-info-inverse circle sq-48">
                    <span className="icon icon-clock-o" />
                  </span>
                                </div>
                                <div className="media-middle media-body">
                                    <h6 className="media-heading">Distancia a un proximo local de mismo tipo patente</h6>
                                    <h3 className="media-heading">
                                        {this.patentes()}

                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className="row gutter-xs">
                <div className="col-md-6 col-lg-3 col-lg-push-0">
                    <div className="card bg-primary">
                        <div className="card-body">
                            <div className="media">
                                <div className="media-middle media-left">
                  <span className="bg-primary-inverse circle sq-48">
                    <span className="icon icon-user" />
                  </span>
                                </div>
                                <div className="media-middle media-body">
                                    <h6 className="media-heading">Cantidad patentes de este mismo <br />rut</h6>
                                    <h3 className="media-heading">
                                        <span className="fw-l">{this.props.resultados.cantidad_rut_patente}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 ">
                    <div className="card bg-info">
                        <div className="card-body">
                            <div className="media">
                                <div className="media-middle media-left">
                  <span className="bg-info-inverse circle sq-48">
                    <span className="icon icon-shopping-bag" />
                  </span>
                                </div>
                                <div className="media-middle media-body">
                                    <h6 className="media-heading">Cantidad locales de este mismo giro con este mismo rut</h6>
                                    <h3 className="media-heading">
                                        <span className="fw-l">{this.props.resultados.cantidad_rut_giro}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 ">
                    <div className="card bg-info">
                        <div className="card-body">
                            <div className="media">
                                <div className="media-middle media-left">
                  <span className="bg-info-inverse circle sq-48">
                    <span className="icon icon-clock-o" />
                  </span>
                                </div>
                                <div className="media-middle media-body">
                                    <h6 className="media-heading">Cantidad de la misma patentes en esta junta de vecinos</h6>
                                    <h3 className="media-heading">
                                        <span className="fw-l">{this.props.resultados.cantidad_patente}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="card bg-warning">
                        <div className="card-body">
                            <div className="media">
                                <div className="media-middle media-left">
                  <span className="bg-warning-inverse circle sq-48">
                    <span className="icon icon-usd" />
                  </span>
                                </div>
                                <div className="media-middle media-body">
                                    <h6 className="media-heading">Cantidad del mismo giro en esta <br /> junta de vecinos</h6>
                                    <h3 className="media-heading">
                                        <span className="fw-l">{this.props.resultados.cantidad_giro}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row">

            <div className="col-md-12">
                <div className="demo-form-wrapper">
                    <form className="form form-horizontal">


                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="form-control-1">Mapa</label>
                            <div className="col-sm-9">
                                <div id="demo-map-buscardor2">
                                </div>
                            </div>
                        </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>


    }
}
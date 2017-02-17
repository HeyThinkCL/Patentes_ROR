// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
class Errores  extends React.Component {
    static map;
    static results_map;
    static handleChange;
    static error;
    static idx;



    constructor(props) {
        super(props);

        _this=this
        this.state = {errores:props.errores};
        this.handleChange = function (name, e) {
            var change = {};
            change[name] = e.target.value;
            this.setState(change);
        }
        this.enviar = function () {

        }
        this.buscar_rut = function () {


        }
        this.localizar = function () {
            alert("aca")


        }
        this.save = function () {


        }
        this.handlePictureClick = function (pic) {



            console.log(pic)
        }
        this.handleChange = function (name, e) {
            var errores = _this.state.errores
            error = errores[name]
            idx= name
            error.direccion =  e.target.value
            errores[name]= error

            _this.setState({errores:errores})
        }

        handleChange = this.handleChange

        set_new = this.set_new = function (result) {


            error.direccion = result.formatted_address
            var latlng = result.geometry.location
            error.ubicacion = "POINT ("+latlng.lng()+" "+latlng.lat()+")"
            console.log(error)
            var errores = _this.state.errores
            errores[idx]= error
            _this.setState({errores:errores})
        }




    }



    componentDidMount() {
        var $markersMap = $('#demo-map-buscardor');
        markersMap = new GMaps({
            div: $markersMap[0],
            height: '460px',
            lat: -33.4558882,
            lng: -70.5959592,
            zoom: 13
        });
        map = markersMap;


    }



    render() {
        ubicacion =  function(a) {


            try {
                out =  a.replace("POINT (", "").replace(")", "").split(" ")
                return out
            } catch (e) {
                return ["",""]
            }
        }

        localizar = function (local) {
            console.log("aca")
            var address= local.direccion
            GMaps.geocode({
                address: local.direccion,
                callback: function(results, status) {
                    map.removeMarkers();
                    if (status == 'OK') {
                        console.log(results)

                        results_map = results;

                        for (var ixj =0 ; ixj < results.length; ixj++) {
                            var latlng = results[ixj].geometry.location
                            map.addMarker({
                                title: address,
                                content: ixj,
                                lat: latlng.lat(),
                                lng: latlng.lng(),
                                click: function click(evt) {
                                    result = results_map[evt.content]
                                    set_new(result)
                                    //toastr.info(evt.content, evt.title);
                                }
                            });
                        }

                    }
                }
            });


        }





        errores = this.state.errores.map( function(local,idj) {


            this.clickme = function () {

                localizar(local)
            }
            this.guardar = function () {

                $.post("/api/error",local,function (data) {

                    console.log("save")


                })
            }



            return (

                <div className="row">

                    <div className="col-sm-2">{local.representante.nombre_social}</div>
                    <div className="col-sm-2" >
                        <input className="form-control" value={local.direccion}  onChange={handleChange.bind(this, idj)}  type="text" name="local[giro]" id="local_giro" />
                    </div>
                    <div className="col-sm-2">
                        <input className="form-control" value={ubicacion(local.ubicacion)[0]}    type="text" name="local[giro]" id="local_giro" />

                    </div>
                    <div className="col-sm-2" >

                        <input className="form-control" value={ubicacion(local.ubicacion)[1]}    type="text" name="local[giro]" id="local_giro" />

                    </div>
                    <button onClick={ this.clickme} className="col-sm-1">Localizar</button>
                    <button onClick={ this.guardar} className="col-sm-1">Guardar</button>


                </div>

            );
        });




        return <div className="layout-content">
                <div className="layout-content-body">
                    <div className="title-bar">
                        <h1 className="title-bar-title">
                            <span className="d-ib">Errores</span>
                        </h1>
                    </div>
                    <div className="row">
                            <div id="demo-map-buscardor">
                            </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            {errores}

                        </div>
                    </div>
                </div>
            </div>;
    

    }
}
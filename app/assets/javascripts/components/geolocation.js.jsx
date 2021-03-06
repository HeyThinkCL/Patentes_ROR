// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


class Geolocation  extends React.Component {
    static maps;
    static results_map;
    static enviado;
    static comuna;
    static _this;


    constructor(props) {
        super(props);
        enviado = false;

        this.state = {enviado:false,msg:'',id:'',
            rol: '', rut: '',nombre:'',apellido:'',email:'',
            celular:'',telefono:'', nombre_social: '', giro: '',
            direccion: '',
            direccion_buscar: 'diecinueve de abril 2040',
            lat:0,lng:0, avanzado: false,
            rol_propiedad:"", codigo_sii:'',
            casa:'',oficina:'',local:'',
            departamento:'',
            id :''


        };

        _this= this;

        evaluacion = function () {

            r={}
            return <div></div>

        }

        this.state.evaluacion=evaluacion()

        this.giroChange = function(val) {
            console.log("Selected: " + val);
        }


        var _this = this;
        this.handleChange = function (name, e) {
            var change = {};
            change[name] = e.target.value;
            this.setState(change);
        }
        setx = this.setState;



        this.enviado = function () {
            if (this.state.enviado)

            return  <div className="row">
                <div className="col-xs-12 col-md-12">
                    <div className="panel panel-body text-center" data-toggle="match-height" style={{height: 76}}>
                        <h4 className="text-muted">
                            Se ha creado el local con el id :
                            <a className="label label-success" target="_blank">
                                <span>{this.state.id}</span>
                            </a>
                        </h4>
                    </div>
                </div>
            </div>;
            else
                return <div>

                </div>;




        }

        set_new = function (result) {

            var change={};

            var latlng = result.geometry.location;
            console.log({lat:latlng.lat(),lng:latlng.lng(),direccion:result.formatted_address})

            _this.setState({lat:latlng.lat(),lng:latlng.lng(),direccion:result.formatted_address})

        }
        inside = function (point, vs) {
            // ray-casting algorithm based on
            // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

            var x = point[0], y = point[1];

            var inside = false;
            for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                var xi = vs[i][0], yi = vs[i][1];
                var xj = vs[j][0], yj = vs[j][1];

                var intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }

            return inside;
        };



        this.enviar = function () {
            enviado =true;
            _this.setState({enviado:false})
            _this.state.giro = $("#Ongiro").val()
            delete _this.state.evaluacion;
            $.post("/locales",_this.state,function (data) {


                evaluacion = function () {

                    delete _this.state.evaluacion;

                    send = JSON.parse(JSON.stringify(_this.state));
                    guardar = function () {
                        $.post("/locales_guardar", send, function (data) {
                            console.log(data)

                            _this.setState({enviado:true,id:data.id})
                            $(window).scrollTop(0);

                        })

                    }

                    r={}
                    return <div>
                    <Evaluacion resultados={data}></Evaluacion>
                        <div className="form-group">
                        <button className="btn btn-primary btn-block btn-next" type="button" onClick={guardar}>Guardar Evaluación</button>
                    </div>
                        </div>

                }

                _this.setState({evaluacion:evaluacion()})

            })
        }
        this.buscar_rut = function () {
            $.get("/api/ruts/"+_this.state.rut,function (data) {


                _this.setState({'nombre_social':data.nombre_social,'nombre':data.nombre,'email':data.email,'apellido':data.apellido,'celular':data.celular,'telefono':data.telefono })

            })

        }

        this.buscar= function () {
            this.setState({});
            var address = this.state.direccion_buscar
            evaluacion = function () {

                r={}
                return <div></div>

            }


            this.setState({evaluacion:evaluacion()});

            GMaps.geocode({
                address: this.state.direccion_buscar,
                callback: function(results, status) {
                    if (status == 'OK') {
                        results_map = results;
                        maps.removeMarkers();
                        for (var ixj =0 ; ixj < results.length; ixj++) {
                            var latlng = results[ixj].geometry.location
                            maps.addMarker({
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
        maps = markersMap;

            $(".js-example-basic-multiple").select2({placeholder:'Seleccionar'});





    }


    render() {

        patentes = this.props.patentes.map(function (patente,jx) {

            return  <option key={jx}>{patente.nombre} - {patente.tipo}</option>

        })

        giros = this.props.giros.map(function (giro,jx) {

            return <option  key={jx} value={giro.giro}>{giro.giro}</option>

        })

        return <div className="layout-content">
                <div className="layout-content-body">
                    <div className="title-bar">
                        <h1 className="title-bar-title">
                            <span className="d-ib">Agregar local </span>
                        </h1>
                    </div>

                    {this.enviado()}



                    <div className="row">
                        <div className="col-md-12">
                            <div className="demo-form-wrapper">
                                <form className="form form-horizontal">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Giro</label>
                                        <div className="col-sm-4">
                                            <select id="Ongiro" className="js-example-basic-multiple form-control" >
                                                <option > </option>
                                                {giros}
                                            </select>
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Patente</label>
                                        <div className="col-sm-4">
                                            <select  className=" form-control" >
                                                {patentes}
                                            </select>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Monto</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" />
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Deuda</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" />
                                        </div>
                                    </div>

                                    <div className="form-group">

                                        <label className="col-sm-2 control-label" htmlFor="form-control-2">Rut</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-2" className="form-control" type="text" value={this.state.rut} onChange={this.handleChange.bind(this, 'rut')}  />
                                        </div>
                                        <div className="col-sm-5">
                                            <button className="btn btn-primary btn-block btn-next" type="button" onClick={this.buscar_rut.bind(this)} >Buscar Rut</button>
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Razon Social</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.nombre_social} onChange={this.handleChange.bind(this, 'nombre_social')} />
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">E-mail</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Nombre</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.nombre} onChange={this.handleChange.bind(this, 'nombre')} />
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Apellido</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text"  value={this.state.apellido} onChange={this.handleChange.bind(this, 'apellido')} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Telefono</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text"  value={this.state.telefono} onChange={this.handleChange.bind(this, 'telefono')} />
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Celular</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text"  value={this.state.celular} onChange={this.handleChange.bind(this, 'celular')}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Rol Propiedad</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.nombre_social} onChange={this.handleChange.bind(this, 'nombre_social')} />
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Codigo sii</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="email" value={this.state.codigo_sii} onChange={this.handleChange.bind(this, 'codigo_sii')} />
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Casa</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.casa} onChange={this.handleChange.bind(this, 'casa')} />
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Oficina</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="email" value={this.state.oficina} onChange={this.handleChange.bind(this, 'oficina')} />
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Local</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.local} onChange={this.handleChange.bind(this, 'local')} />
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Departamento</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="email" value={this.state.departamento} onChange={this.handleChange.bind(this, 'departamento')} />
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Direccion</label>
                                        <div className="col-sm-3">
                                            <input id="form-control-1" className="form-control" value={this.state.direccion} onChange={this.handleChange.bind(this, 'direccion')}    type="text" disabled="true"/>
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Latitud</label>
                                        <div className="col-sm-2">
                                            <input id="form-control-1" className="form-control" value={this.state.lat} type="text" disabled="true"/>
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Longitud</label>
                                        <div className="col-sm-2">
                                            <input id="form-control-1" className="form-control" value={this.state.lng} type="text" disabled="true"/>
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Direccion</label>
                                        <div className="col-sm-7">
                                            <input id="form-control-1" className="form-control" value={this.state.direccion_buscar} onChange={this.handleChange.bind(this, 'direccion_buscar')}    type="text" />
                                        </div>
                                        <div className="col-sm-2">
                                            <button className="btn btn-primary btn-block btn-next" type="button" onClick={this.buscar.bind(this)} >Buscar</button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-2">Mapa</label>
                                        <div className="col-sm-9">
                                            <div id="demo-map-buscardor">
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block btn-next" type="button" onClick={this.enviar.bind(this)}>Evaluar Patente</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {this.state.evaluacion}
                    </div>


                </div>
            </div>




    }
}
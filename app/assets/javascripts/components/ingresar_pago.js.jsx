// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
class Ingresarpago  extends React.Component {

    static map;
    static results_map;
    static enviado;


    constructor(props) {
        super(props);
        _this=this;

        this.state = {enviado:false,msg:'',monto_pagar:0,id:'',rol: '', rut: '',nombre:'',apellido:'',email:'',celular:'',telefono:'', nombre_social: '', giro: '', direccion: '', pago: false};
        this.handleChange = function (name, e) {
            var change = {};
            change[name] = e.target.value;
            this.setState(change);
        }
        this.enviar = function () {

            $.post("/ingresar_pagos",this.state,function (data) {

                _this.setState({enviado:true,msg:data.msg})

            })

        }
        this.buscar_rol = function () {
            $.get("/api/roles/"+this.state.rol,function (data) {
                change={}
                change.nombre   = data.representante.nombre
                change.apellido = data.representante.apellido
                change.telefono = data.representante.telefono
                change.celular  = data.representante.celular
                change.email = data.representante.email
                change.rut  = data.representante.rut
                change.direccion  = data.direccion
                change.pago  = data.pago
                change.deuda  = data.deuda
                change.giro  = data.representante.giro
                change.nombre_social  = data.representante.nombre_social
                change.enviado=false
                _this.setState(change)



            })


        }
        this.msg=function () {
            if (this.state.enviado){
                return <div>

                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="panel panel-body text-center" data-toggle="match-height">
                                <h4 className="text-muted">
                                    {this.state.msg}
                                </h4>
                            </div>
                        </div>
                    </div>

                </div>
            }
            else {
                return <div></div>
            }

        }




    }



    render() {



        return <div className="layout-content">
                <div className="layout-content-body">
                    <div className="title-bar">
                        <h1 className="title-bar-title">
                            <span className="d-ib">Ingresar un pago </span>
                        </h1>
                    </div>

                    {this.msg()}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="demo-form-wrapper">
                                <form className="form form-horizontal">
                                    <div className="form-group">

                                        <label className="col-sm-2 control-label" htmlFor="form-control-2">Rol</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-2" className="form-control" type="text" value={this.state.rol} onChange={this.handleChange.bind(this, 'rol')}  />
                                        </div>
                                        <div className="col-sm-5">
                                            <button className="btn btn-primary btn-block btn-next" type="button" onClick={this.buscar_rol.bind(this)} >Buscar Rol</button>
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Rol</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text"  value={this.state.rol} disabled />
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Giro</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.giro} disabled />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Rut</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.rut} disabled />
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Razon social</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.nombre_social} disabled />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Direccion</label>
                                        <div className="col-sm-9">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.direccion} disabled />
                                        </div>


                                    </div>



                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Monto</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.pago} disabled />
                                        </div>
                                        <label className="col-sm-1 control-label" htmlFor="form-control-1">Deuda</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text" value={this.state.deuda} disabled />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Monto a pagar</label>
                                        <div className="col-sm-4">
                                            <input id="form-control-1" className="form-control" type="text"  value={this.state.monto_pagar} onChange={this.handleChange.bind(this, 'monto_pagar')}  />
                                        </div>

                                    </div>







                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block btn-next" type="button" onClick={this.enviar.bind(this)}>Crear pago</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
    

    }
}
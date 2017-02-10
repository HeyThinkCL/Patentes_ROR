class Buscar_Patente extends React.Component {
    constructor(props) {
        super(props);
        this.buscar = function () {
            alert("hola");
        }

        this.buscar = function () {
            this.setState({});
            $.post("/api/localizar", this.state, function (data) {
                props.funcion(data)
            })
        }
    }

    render() {
       const children = this.props.children;
        return <div>
            <div className="layout-content">
                <div className="layout-content-body">
                    <div className="title-bar">
                        <h1 className="title-bar-title">
                            <span className="d-ib">Buscar patentes</span>

                        </h1>
                        <p className="title-bar-description">
                            <small>Utiliza el buscador para buscar patentes.</small>
                        </p>
                    </div>



                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form form-horizontal">


                                            <div className="form-group">
                                                <label className="col-sm-2 control-label" for="form-control-1">Rol</label>

                                                <div className="col-sm-4">
                                                    <input className="form-control"  type="text" name="local[rol]" id="local_rol"   />

                                                </div>

                                                <label className="col-sm-2 control-label" for="form-control-1">Rut</label>

                                                <div className="col-sm-4">
                                                    <input className="form-control"   type="text" name="local[rut]" id="local_rut" />

                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label" for="form-control-1">Razon Social</label>

                                                <div className="col-sm-4">
                                                    <input className="form-control" type="text" name="local[nombre_social]" id="local_nombre_social" />

                                                </div>

                                                <label className="col-sm-2 control-label" for="form-control-1">Giro</label>

                                                <div className="col-sm-4">
                                                    <input className="form-control" type="text" name="local[giro]" id="local_giro" />

                                                </div>
                                            </div>
                                            <div className="form-group">


                                                <label className="col-sm-2 control-label" for="form-control-1">Dirección</label>

                                                <div className="col-sm-10">
                                                    <input className="form-control"    type="text" name="local[direccion]" id="local_direccion" />

                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button className="btn btn-primary btn-block btn-next" type="button" onClick={this.buscar} >Buscar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                </div>
            </div>
        </div>;
    }
}
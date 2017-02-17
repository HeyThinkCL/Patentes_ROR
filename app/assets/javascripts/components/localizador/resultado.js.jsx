class Resultado extends React.Component {

    static seleccionado;
    constructor(props) {
        super(props);
        this.detalle = function () {

             $.get("/api/info/"+seleccionado.id,function (data) {
                 props.detalle(data);
             })
        }
        this.cerca = function () {
            l  = seleccionado.ubicacion.replace("POINT(","").replace(")","").split(" ")
            near ={lat:l[1],lng:l[0]}
            map = {zoom:16,lat:l[1],lng:l[0]}
            console.log(l)


            $.post("/api/cerca",near,function (data) {
                console.log(data);
                props.funcion(data,map)
            })
        }


    }


    render() {







        if(this.props.seleccionado != undefined) {
            seleccionado = this.props.seleccionado
            return <div>
                <h3>Resultado</h3>
                <div className="form form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 derecha" htmlFor="form-control-1">Rol</label>
                        <div className="col-sm-4">
                            {this.props.seleccionado.rol}
                        </div>
                        <label className="col-sm-2 derecha" htmlFor="form-control-1">Rut</label>
                        <div className="col-sm-4">
                            {this.props.seleccionado.rut}-{this.props.seleccionado.dv}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 derecha" htmlFor="form-control-1">Razon Social</label>
                        <div className="col-sm-4">
                            {this.props.seleccionado.nombre_social}
                        </div>
                        <label className="col-sm-2 derecha" htmlFor="form-control-1">Giro</label>
                        <div className="col-sm-4">
                            {this.props.seleccionado.giro}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 derecha" htmlFor="form-control-1">Dirección</label>
                        <div className="col-sm-10">
                            {this.props.seleccionado.direccion}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 derecha" htmlFor="form-control-1">Monto</label>
                        <div className="col-sm-4">
                            {this.props.seleccionado.pago}
                        </div>
                        <label className="col-sm-2 derecha" htmlFor="form-control-1">Deuda</label>
                        <div className="col-sm-4">
                            {this.props.seleccionado.deuda}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-6">
                            <button className="btn btn-primary btn-block btn-next" onClick={this.detalle.bind(this)} type="button">Mostrar Detalles</button>
                        </div>
                        <div className="col-sm-6">
                            <button className="btn btn-success btn-block btn-next" onClick={this.cerca} type="button">Patentes cercanas</button>
                        </div>
                    </div>
                    <div className="form-group">
                    </div>
                </div>

            </div>;
        }
        else
            return <div>

            </div>
    }
}
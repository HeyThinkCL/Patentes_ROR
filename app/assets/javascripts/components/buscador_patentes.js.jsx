/**
 * Created by malba on 18-01-17.
 */

var datos;
var mapas = React.createClass({
    getInitialState() {
        this.state = {rol:'',rut:'',nombre_social:'',giro:'',direccion:''};
        return {rol:'',rut:'',nombre_social:'',giro:'',direccion:''};
    },
    handleChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    buscar_sql: function(){
        console.log(this.state );
        $.post("/api/localizar",this.state,function (data) {
            datos=data;
            map(data);
        })
    },
    render: function() {
         return (
            <div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" for="form-control-1">Rol</label>

                    <div className="col-sm-4">
                        <input className="form-control"  type="text" name="local[rol]" id="local_rol" onChange={this.handleChange.bind(this, 'rol')}  />

                    </div>

                    <label className="col-sm-2 control-label" for="form-control-1">Rut</label>

                    <div className="col-sm-4">
                        <input className="form-control" value={this.state.rut}  onChange={this.handleChange.bind(this, 'rut')}  type="text" name="local[rut]" id="local_rut" />

                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" for="form-control-1">Razon Social</label>

                    <div className="col-sm-4">
                        <input className="form-control" value={this.state.nombre_social} onChange={this.handleChange.bind(this, 'nombre_social')} type="text" name="local[nombre_social]" id="local_nombre_social" />

                    </div>

                    <label className="col-sm-2 control-label" for="form-control-1">Giro</label>

                    <div className="col-sm-4">
                        <input className="form-control" value={this.state.giro}  onChange={this.handleChange.bind(this, 'giro')}  type="text" name="local[giro]" id="local_giro" />

                    </div>
                </div>
                <div className="form-group">


                    <label className="col-sm-2 control-label" for="form-control-1">Dirección</label>

                    <div className="col-sm-10">
                        <input className="form-control" value={this.state.direccion}  onChange={this.handleChange.bind(this, 'direccion')}  type="text" name="local[direccion]" id="local_direccion" />

                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block btn-next" type="button" onClick={this.buscar_sql}>Buscar</button>
                </div>
            </div>
        );
    }
});
var render_localizado  = function (a) {
    var dato = datos[a.content];
    console.log(dato);
    $("#R_rol").text(dato['rol']);
    $("#R_rut").text(dato['rut']+"-"+dato['dv'] );
    $("#R_giro").text(dato['giro']);
    $("#R_direccion").text(dato['direccion']);
    $("#R_nombre_social").text(dato['nombre_social']);
}

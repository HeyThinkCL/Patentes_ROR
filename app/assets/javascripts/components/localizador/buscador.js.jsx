class Buscador extends React.Component {



    constructor(props) {
        super(props);
        this.state = {rol:'',rut:'',nombre_social:'',giro:'',direccion:'bolivar',avanzado:false};
        this.buscar = function () {
            this.setState({});
            $.post("/api/localizar",this.state,function (data) {
               props.funcion(data)
            })
        }
        this.avanzado1= function () {

            if (this.state.avanzado )
                return
        }
        this.avanzado2= function () {

            if (this.state.avanzado ) {
                juntas = this.props.juntasvecinos.map(function (junta) {

                    return <option key={junta.id}>{junta.numero}</option>

                })

                return <div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Criterio</label>

                        <div className="col-sm-4">

                            <select className="form-control" name="transporte">
                                <option>Deudores</option>
                                <option>No deudores</option>
                                <option>Todos</option>
                            </select>
                        </div>

                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Junta Vecinos</label>

                        <div className="col-sm-4">

                            <select className="form-control" name="transporte">
                                {juntas}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Desde</label>

                        <div className="col-sm-4">
                            <input className="form-control" type="text" name="local[rol]" id="local_rol"/>

                        </div>

                        <label className="col-sm-2 control-label" htmlFor="form-control-1">Hasta</label>

                        <div className="col-sm-4">
                            <input className="form-control" type="text" name="local[rut]" id="local_rut"/>

                        </div>
                    </div>
                </div>
            }
        }
        this.handleChange = function (name, e) {
            var change = {};
            change[name] = e.target.value;
            this.setState(change);
        }
        this.avanzado_check = function () {
            var change = {};
            change['avanzado'] = !this.state.avanzado;
            this.setState(change);

        }

    }



    componentDidMount() {

        $(".js-example-basic-multiple").select2();

        }
            render() {


                giros = this.props.giros.map(function (giro,jx) {

                    return <option  key={jx} value={giro.giro}>{giro.giro}</option>

                })

                patentes = this.props.patentes.map(function (patente,jx) {

                    return <option key={jx}>{patente.nombre} - {patente.tipo}</option>

                })



        return <div>
            <h3>Buscador</h3>
            <div className="form form-horizontal">


                <div className="form-group">
                    <label  className="col-sm-2 control-label" htmlFor="form-control-1">Rol</label>

                    <div className="col-sm-4">
                        <input className="form-control" defaultValue={this.state.rol} onChange={this.handleChange.bind(this, 'rol')} type="text" name="local[rol]" id="local_rol"   />

                    </div>

                    <label  className="col-sm-2 control-label" htmlFor="form-control-1">Rut</label>

                    <div className="col-sm-4">
                        <input className="form-control" defaultValue={this.state.rut} onChange={this.handleChange.bind(this, 'rut')}  type="text" name="local[rut]" id="local_rut" />

                    </div>
                </div>
                <div className="form-group">
                    <label  className="col-sm-2 control-label" htmlFor="form-control-1">Razon Social</label>

                    <div className="col-sm-4">
                        <input className="form-control" defaultValue={this.state.nombre_social}  onChange={this.handleChange.bind(this, 'nombre_social')} type="text" name="local[nombre_social]" id="local_nombre_social" />

                    </div>
                    <label className="col-sm-2 control-label" htmlFor="form-control-1">Patente</label>

                    <div className="col-sm-4">

                        <select className="form-control" name="transporte">
                            <option >Todos</option>
                            {patentes}
                        </select>
                    </div>


                    </div>
                <div className="form-group">

                    <label  className="col-sm-2 control-label" htmlFor="form-control-1">Giro</label>

                    <div className="col-sm-10">

                        <select className="js-example-basic-multiple" multiple="multiple">
                            {giros}
                        </select>

                    </div>
                </div>
                <div className="form-group">


                    <label  className="col-sm-2 control-label" htmlFor="form-control-1">Dirección</label>

                    <div className="col-sm-10">
                        <input className="form-control" value={this.state.direccion} onChange={this.handleChange.bind(this, 'direccion')}   type="text" name="local[direccion]" id="local_direccion" />

                    </div>
                </div>

                <div className="form-group">


                    <label  className="col-sm-2 control-label" htmlFor="form-control-1">Avanzado</label>

                    <div className="col-sm-4">
                        <input className="form-control"  value={this.state.avanzado}  onChange={this.avanzado_check.bind(this)}  type="checkbox" name="local[direccion]" id="local_direccion" />

                    </div>

                    {this.avanzado1()}


                </div>


                {this.avanzado2()}


                <div className="form-group">
                    <button className="btn btn-primary btn-block btn-next" type="button" onClick={this.buscar.bind(this)}  >Buscar</button>
                </div>
            </div>

        </div>;
    }
}
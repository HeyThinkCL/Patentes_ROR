class Soporte extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mensaje: '',
            opcion: 'Otros'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this._create = this._create.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target
        const value =  target.value
        const name = target.name
        this.setState({
           [name]: value
        });
    }
    _create() {
        axios.post('/soporte',{
            email: this.props.usuario.email,
            nombre: this.props.usuario.nombre,
            apellido: this.props.usuario.apellido,
            opcion: this.state.opcion,
            mensaje: this.state.mensaje
        });
    }
    _onSubmit(event){
        event.preventDefault();
        this._create();
    }

    render(){
        return(
            <form className="form form-horizontal">
                <div className="form-group p-y-md">
                    <label className="col-sm-5 control-label">Nombre</label>
                    <div className="col-sm-5">
                        <input className="form-control" type="text" readOnly={true} defaultValue={this.props.usuario.nombre+' '+this.props.usuario.apellido}/>
                    </div>
                </div>
                <div className="for-group p-y-md">
                    <label className="col-sm-5 control-label">Email</label>
                    <div className="col-sm-5 p-y-md">
                        <input className="form-control" type="email" readOnly={true} defaultValue={this.props.usuario.email}/>
                    </div>
                </div>

                <div className="form-group p-y-md">
                    <label className="col-sm-5 control-label">Problema </label>
                    <div className="col-sm-5">
                        <select type="select" className="form-control" name="opcion" value={this.state.opcion} onChange={this.handleInputChange}>
                            <option name="otros">Otros</option>
                            <option name="local">Local Mal Ingresado</option>
                            <option name="visualiza">Problemas de Visualización</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-5 control-label">Mensaje</label>
                    <div className="col-sm-5">
                        <textarea className="form-control" rows={10} name="mensaje" value={this.state.mensaje} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="col-md-offset-5 col-sm-6 col-md-5">
                    <button className="btn btn-primary btn-block" type="submit" onClick={this._onSubmit}>Enviar</button>
                </div>
            </form>
        )
    }
}




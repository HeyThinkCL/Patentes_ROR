class Usuario extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nombre: null,
            apellido: null,
            email: null,
            password: null,
            password_confirmation: null,
            rol: 'Seleccione Rol'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this._create = this._create.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
    }

    handleInputChange(event){
        const target = event.target
        const value =  target.value
        const name = target.name
        this.setState({
            [name]: value
        });
    }

    isEmpty(value){
        return !_.isEmpty(value);
    }


    _create() {
        axios.post('/usuarios',{
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
                <div className="form-group">
                    <label className="col-sm-3 control-label">Nombre</label>
                    <div className="col-sm-9">
                        <input className="form-control"
                               type="text"
                               ref="username"
                               validate={this.isEmpty}
                               value={this.state.nombre}
                               defaultValue={this.state.nombre}
                               onChange={this.handleInputChange}
                               emptyMessage="Nombre Requerido"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Apellido</label>
                    <div className="col-sm-9">
                        <input className="form-control"
                               type="text"
                               ref="userlastname"
                               validate={this.isEmpty}
                               value={this.state.apellido}
                               defaultValue={this.state.apellido}
                               onChange={this.handleInputChange}
                               emptyMessage="Apellido Requerido"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Email</label>
                    <div className="col-sm-9">
                        <input className="form-control"
                               type="text"
                               ref="email"
                               validate={this.isEmpty}
                               defaultValue={this.state.email}
                               value={this.state.email}
                               onChange={this.handleInputChange}
                               emptyMessage="Email Requerido"/>
                    </div>
                </div>
            </form>
        )


    }
}
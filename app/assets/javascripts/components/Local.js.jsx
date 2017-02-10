class Local extends React.Component {


    render() {


        if (this.props.local==undefined)
            return <div></div>
        else
            return <div>
                <div className="card">
                    <h3> Resultados </h3>
                <div className="row">


                <div className="col-md-6">
                    <h4>Visitas</h4>
                </div>
                <div className="col-md-6">
                    <h4>Pagos</h4>



                </div>

                </div>

               <div className="row">

                <div className="col-md-4">


                    <div className="form-group">
                        <button className="btn btn-primary btn-block btn-next" type="button">Imprimir ficha</button>
                    </div>

                </div>
                        <div className="col-md-4">

                    <div className="form-group">
                        <button className="btn btn-primary btn-block btn-next" type="button">Editar</button>
                    </div>
                        </div>

                            <div className="col-md-4">
                    <div className="form-group">
                        <button className="btn btn-primary btn-block btn-next" type="button">Registar pago</button>
                    </div>


                            </div>
                </div>


                </div>
                </div>
          ;

    }
}
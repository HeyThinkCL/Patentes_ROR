class Local extends React.Component {



    render() {

        _this=this
        ir_pago= function () {

            window.location = "/ingresar_pagos?rol="+_this.props.local.rol
        }



        if (this.props.habilitado==false)
            return <div></div>
        else{
            pagos = this.props.pagos.map(function (pago) {

                date = new Date(pago.created_at)
                return <div>
                    Pago por : {pago.pagado} realizado el {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}
                </div>

            });

            return <div>
                <div className="card">
                    <h3> Resultados </h3>
                <div className="row">


                <div className="col-md-6">
                    <h4>Visitas</h4>
                </div>
                <div className="col-md-6">
                    <h4>Pagos</h4>
                    {pagos}


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
                        <button onClick={ir_pago.bind(this)} className="btn btn-primary btn-block btn-next" type="button">Registar pago</button>
                    </div>


                            </div>
                </div>


                </div>
                </div>
          ;
        }

    }
}
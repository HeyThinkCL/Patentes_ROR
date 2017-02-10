class Resultados extends React.Component {



    constructor(props) {
        super(props);

        mapa = function (local) {

            props.seleccionar_mapa(local)
        }


    }


    render() {



        tabla = this.props.resultados.map( function(local,idx) {
            this.click = function () {

                mapa(local);
            }



            return  <tr onClick={this.click} >


                <td className="text-left">{local.rol}</td>
                <td className="text-left">{local.rut}</td>
                <td className="text-left">{local.nombre_social}</td>
                <td className="text-left">{local.giro}</td>
                <td className="text-left">{local.direccion}</td>

                <td className="text-right">${local.pago}</td>
                <td className="text-right">${local.deuda}</td>

            </tr>;
        });


        if(this.props.resultados.length) {

            const resultados = this.props.resultados;

                pagos=0
                deudas = 0
                for (ixx =0 ;ixx <resultados.length;ixx++){
                    pago = this.props.resultados[ixx].pago
                    deuda = this.props.resultados[ixx].deudas
                    deudas = deuda+deudas;
                    pagos= pago+pagos;
                }
                console.log(pagos)


            return <div>
                <div className="row gutter-xs">
                    <div className="col-md-12">
                        <div className="card">
                            <h3> Resultados </h3>
                            <div className="card-body">
                                <table className="table table-hover table-bordered table-striped">
                                    <thead>
                                    <tr>

                                        <th rowspan="2" className="text-left">Rol</th>
                                        <th rowspan="2" className="text-left">Rut</th>
                                        <th rowspan="2" className="text-left">Razon social</th>
                                        <th rowspan="2" className="text-left">Giro</th>
                                        <th rowspan="2" className="text-left">Direccion</th>
                                        <th colspan="3" className="text-center">Valor Patente</th>
                                        <th colspan="3" className="text-center">Valor Deuda</th>
                                    </tr>

                                    </thead>
                                    <tbody>

                                    {tabla}
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th className="text-right" colspan="3">Total:</th>
                                        <th className="text-right">${pagos}</th>
                                        <th className="text-right">$</th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        }
        else
            return <div>

            </div>;
    }
}
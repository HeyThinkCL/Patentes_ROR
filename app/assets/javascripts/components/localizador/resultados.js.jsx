class Resultados extends React.Component {

    static first;

    constructor(props) {
        super(props);
        first=false;

        mapa = function (local) {

            props.seleccionar_mapa(local)
        }

        this.render_table = function () {

            /*var $datatablesColreorder = $('#demo-datatables-colreorder-xx');
            $datatablesColreorder.DataTable({
                colReorder: true,
                responsive: true,
                destroy: true,
                dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
                language: {
                    paginate: {
                        previous: '&laquo;',
                        next: '&raquo;'
                    },
                    search: "_INPUT_",
                    searchPlaceholder: "Search…"
                }
            });*/

        }


    }
    componentDidMount() {




    }


    render() {



        tabla = this.props.resultados.map( function(local,idx) {
            this.click = function () {

                mapa(local);
            }



            return <tr key={this.idx} onClick={this.click} >


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


            if (!first ) {
                setTimeout(this.render_table, 100);
                first=true;
            }
            else{

                console.log("new time")
            }

            return <div>
                <div className="row gutter-xs">

                    <div className="col-xs-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-actions">
                                    <button type="button" className="card-action card-toggler" title="Collapse" />
                                    <button type="button" className="card-action card-reload" title="Reload" />
                                    <button type="button" className="card-action card-remove" title="Remove" />
                                </div>
                            </div>
                            <div className="card-body">
                                <table id="demo-datatables-colreorder-xx" className="table table-hover table-striped table-bordered table-nowrap dataTable" cellSpacing={0} width="100%">
                                    <thead>
                                    <tr>
                                        <th className="text-left">Rol</th>
                                        <th className="text-left">Rut</th>
                                        <th className="text-left">Razon social</th>
                                        <th className="text-left">Giro</th>
                                        <th className="text-left">Direccion</th>
                                        <th className="text-center">Valor Patente</th>
                                        <th className="text-center">Valor Deuda</th>
                                    </tr>
                                    </thead>
                                    <tfoot>
                                    <tr>
                                        <th className="text-left">Rol</th>
                                        <th className="text-left">Rut</th>
                                        <th className="text-left">Razon social</th>
                                        <th className="text-left">Giro</th>
                                        <th className="text-left">Direccion</th>
                                        <th className="text-center">Valor Patente</th>
                                        <th className="text-center">Valor Deuda</th>
                                    </tr>
                                    </tfoot>
                                    <tbody>
                                    {tabla}
                                    </tbody>
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
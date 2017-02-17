class Registarvisitas    extends React.Component {
    static _this;
    constructor(props) {
        super(props);
        this.state = {'locales':[]}
        _this= this;

    }

    componentDidMount() {

        GMaps.geolocate({
            success: function(position) {
                //console.log(position.coords.latitude, position.coords.longitude);

                out = {'lat':position.coords.latitude,'lng':position.coords.longitude}

                $.post("/api/cerca",out,function (data) {

                    console.log(data)
                    _this.setState({locales:data});

                })

            },
            error: function(error) {
                alert('No puedo localizarte failed: '+error.message);

                out = {   lat: -33.4558882,
                    lng: -70.5959592}

                $.post("/api/cerca",out,function (data) {

                    console.log(data)
                    _this.setState({locales:data});
                    var $datatablesColreorder = $('#demo-datatables-colreorder-xx');
                    $datatablesColreorder.DataTable({
                        colReorder: true,
                        responsive: true,
                        stateSave: true,
                        dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
                        language: {
                            paginate: {
                                previous: '&laquo;',
                                next: '&raquo;'
                            },
                            search: "_INPUT_",
                            searchPlaceholder: "Search…"
                        }
                    });

                })

            },
            not_supported: function() {
                alert("Your browser does not support geolocation");
            },
            always: function() {


            }
        });
    }

    render() {

        locales = _this.state.locales.map(function (local) {

            ir_sitio =function () {
                window.location = "/registrar_visitas/"+local.id

            }


            return <tr  key={local.id}>
                <td>{local.direccion}</td>
                <td>{local.nombre_social}</td>
                <td>{local.rut}-{local.dv}</td>
                <td>{local.rol}</td>
                <td>{local.pago}</td>
                <td>{local.deuda}</td>
                <td><button onClick={ir_sitio} className="btn btn-primary btn-block btn-next" >Visitar</button></td>
            </tr>

        })



        return <div>
            <div className="layout-content">
                <div className="layout-content-body">
                    <div className="title-bar">
                        <h1 className="title-bar-title">
              <span className="d-ib">Registrar visitas

              </span>

                        </h1>

                    </div>
                    <div className="text-center m-b">
                        <h3 className="m-b-0">Espere por favor que cargue los lugares cercanos a tu ubicacion</h3>
                    </div>
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
                                            <th>Direccion</th>
                                            <th>Nombre Social</th>
                                            <th>Rut</th>
                                            <th>Rol</th>
                                            <th>Monto</th>
                                            <th>Deuda</th>
                                            <th>Opciones</th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Direccion</th>
                                            <th>Nombre Social</th>
                                            <th>Rut</th>
                                            <th>Rol</th>
                                            <th>Monto</th>
                                            <th>Deuda</th>
                                            <th>Opciones</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        {locales}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}
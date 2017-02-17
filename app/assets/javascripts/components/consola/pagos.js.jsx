class Consola_pagos extends React.Component {


    render() {

        pagos = this.props.pagos.map(function (x) {

            return <li className="list-group-item">
                <div className="media">
                    <div className="media-middle media-body">
                        <h6 className="media-heading">
                            <span className="text-muted">Women's Clothing</span>
                        </h6>
                        <h4 className="media-heading">28%
                            <small>$43,498.69</small>
                        </h4>
                    </div>
                    <div className="media-middle media-right">
                        <span className="bg-danger circle sq-40">
                          <span className="icon icon-female" />
                        </span>
                    </div>
                </div>
            </li>

        });


        patentes = this.props.patentes.map(function (x) {


            return <tr>
                <td className="col-xs-1 text-left"></td>
                <td className="col-xs-6 text-left">
                    <a className="link-muted" >
                        <span className="truncate">{x.nombre}</span>
                    </a>
                </td>
                <td className="col-xs-5 text-right">$7,124.23</td>
            </tr>;

        });

        return <div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <div className="card-actions">
                            <button type="button" className="card-action card-toggler" title="Collapse" />
                            <button type="button" className="card-action card-reload" title="Reload" />
                            <button type="button" className="card-action card-remove" title="Remove" />
                        </div>
                        <strong>Ultimos pagos / Recaudaciones por tipo</strong>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 m-y">
                                <ul className="list-group list-group-divided">
                                    {pagos}

                                </ul>
                            </div>
                            <div className="col-md-6 m-y">
                                <table className="table table-borderless table-fixed">
                                    <tbody>
                                    {patentes}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
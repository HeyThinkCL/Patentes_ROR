class Calculadora extends React.Component {
    static busqueda;
    constructor(props){
        super(props);
        _this = this;
        clickme = function () {

            console.log(busqueda);

            $.post("/api/excel",busqueda,function (dato) {

                var win=window.open('about:blank');
                with(win.document)
                {
                    open();
                    write(dato);
                    close();
                }

            });

        }
    }

    render() {


        function add(a, b) {
            return a + b.pago;
        }
        function add2(a, b) {
            return a + b.deuda;
        }
        ingresos  = this.props.resultados.reduce(add, 0);
        deudas  = this.props.resultados.reduce(add2, 0);


        busqueda = this.props.busqueda;




        money = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }



        return   <div className="row gutter-xs">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <div className="media">
                            <div className="media-middle media-left">
                  <span className="bg-gray sq-64 circle">
                    <span className="icon icon-flag" />
                  </span>
                            </div>
                            <div className="media-middle media-body">
                                <h3 className="media-heading">
                                    <span className="fw-l">${money(ingresos)} </span>
                                    <small>Posibles Ingresos</small>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <div className="media">
                            <div className="media-middle media-left">
                                <div className="media-chart"><iframe className="chartjs-hidden-iframe" style={{width: '100%', display: 'block', border: 0, height: 0, margin: 0, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} />
                                    <canvas data-chart="doughnut" data-animation="false" data-labels="[&quot;Resolved&quot;, &quot;Unresolved&quot;]" data-values="[{&quot;backgroundColor&quot;: [&quot;#0ac29d&quot;, &quot;#555&quot;], &quot;data&quot;: [879, 377]}]" data-hide="[&quot;legend&quot;, &quot;scalesX&quot;, &quot;scalesY&quot;, &quot;tooltips&quot;]" height={64} width={64} style={{display: 'block', width: 64, height: 64}} />
                                </div>
                            </div>
                            <div className="media-middle media-body">
                                <h2 className="media-heading">
                                    <span className="fw-l">${money(deudas)}  </span>
                                    <small>Deudas</small>

                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <div className="media">
                            <div className="media-middle media-left">
                                <div className="media-chart"><iframe className="chartjs-hidden-iframe" style={{width: '100%', display: 'block', border: 0, height: 0, margin: 0, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} />
                                    <canvas data-chart="doughnut" data-animation="false" data-labels="[&quot;Resolved&quot;, &quot;Unresolved&quot;]" data-values="[{&quot;backgroundColor&quot;: [&quot;#555&quot;, &quot;#0ac29d&quot;], &quot;data&quot;: [879, 377]}]" data-hide="[&quot;legend&quot;, &quot;scalesX&quot;, &quot;scalesY&quot;, &quot;tooltips&quot;]" height={64} width={64} style={{display: 'block', width: 64, height: 64}} />
                                </div>
                            </div>
                            <div className="media-middle media-body">
                                <h2 className="media-heading">
                                    <span className="fw-l">${money(ingresos+deudas)} </span>
                                    <small>Máximo</small>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <div className="media">

                            <div className="media-middle media-body">
                                <button className="btn btn-primary btn-block btn-next" onClick={clickme} > Descargar Excel </button>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
class Localizar extends React.Component {
    constructor(props) {
        super(props);

        var map = {zoom:13,lat:-33.4558882,lng:-70.5959592}
        this.state = {
            resultados: [],
            mapas: [],
            change: false,
            seleccionado: undefined,
            detalle: undefined,
            map:map
        }



        this.funcionEnPadre = function (x) {

            this.setState({resultados:x,mapas:x,change:!this.state.change,map:map,detalle:undefined,seleccionado:undefined});

        }
        this.funcionEnPadre2 = function (x,mapa) {

            this.setState({resultados:x,mapas:x,change:!this.state.change,map:mapa,detalle:undefined,seleccionado:undefined});

        }
        this.seleccionar_mapa = function (x) {
            this.setState({mapas:[x],seleccionado:x,change:!this.state.change,detalle:undefined});
        }
        this.seleccionar_mapa2 = function (x) {
            this.setState({seleccionado:undefined});
            this.setState({seleccionado:x,detalle:undefined});
        }
        this.seleccionar_mapa3 = function (x) {
            var l = x.ubicacion.replace("POINT(","").replace(")","").split(" ")
            var mapa = {lat:l[1],lng:l[0],zoom:15}
            this.setState({mapas:[x],seleccionado:x,change:!this.state.change,map:mapa,detalle:undefined});
        }

        this.detalle = function (x) {
            this.setState({detalle:'hola'});
        }

    }





    render() {
        return  <div>
            <div className="layout-content">
                <div className="layout-content-body">
                    <div className="title-bar">
                        <h1 className="title-bar-title">
                            <span className="d-ib">Buscar patentes</span>

                        </h1>
                        <p className="title-bar-description">
                            <small>Utiliza el buscador para buscar patentes. </small>
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Mapa map={this.state.map} funcion={this.funcionEnPadre2.bind(this)}  resultados={this.state.mapas} change={this.state.change} seleccionar_mapa={this.seleccionar_mapa2.bind(this)}></Mapa>
                        </div>
                        <div className="col-md-6">
                            <Buscador funcion={this.funcionEnPadre.bind(this)}></Buscador>
                            <Resultado funcion={this.funcionEnPadre2.bind(this)} detalle={this.detalle.bind(this)} seleccionado={this.state.seleccionado}></Resultado>

                        </div>
                    </div>



                            <Local local={this.state.detalle}></Local>


                    <div className="row">
                        <div className="col-md-12">
                            <Resultados resultados={this.state.resultados} seleccionar_mapa={this.seleccionar_mapa3.bind(this)}></Resultados>
                        </div>
                    </div>


                </div>
            </div>
        </div>;
    }
}

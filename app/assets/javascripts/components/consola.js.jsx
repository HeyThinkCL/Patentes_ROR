class Consola extends React.Component {
    componentDidMount() {
        var borde = this.props.comuna.borde
        var fondo = this.props.comuna.fondo
        var zoom  = this.props.comuna.zoom
        var polygonsPaths = []
        for(poli of this.props.comuna.area.replace("POLYGON ((","").replace("))","").split(",")){
            polygonsPaths.push(poli.split(" ").reverse());
        }
        var juntas_vecinos = this.props.juntasvecinos;

    var $this = $(ReactDOM.findDOMNode(this));
        function googleMapWithPolygonsExample() {
            var $polygonsMap = $('#demo-map-4');
            if ($polygonsMap.length) {
                var polygonsMap = new GMaps({
                    div: $polygonsMap[0],
                    height: '320px',
                    lat: -33.4558882,
                    lng: -70.5959592,
                    zoom: zoom
                });

                //var polygonsPaths = [["-33.4498668", "-70.6314905"], ["-33.4489229", "-70.6265964"], ["-33.447956", "-70.6219358"], ["-33.4473115", "-70.6187343"], ["-33.4483857", "-70.6184339"], ["-33.4475765", "-70.6137304"], ["-33.4469248", "-70.6138935"], ["-33.4464879", "-70.6111383"], ["-33.4459365", "-70.6092843"], ["-33.4456715", "-70.6079454"], ["-33.4451845", "-70.6041774"], ["-33.4448452", "-70.6011102"], ["-33.4447097", "-70.5991534"], ["-33.4443795", "-70.5991991"], ["-33.4442735", "-70.5981983"], ["-33.4447938", "-70.5981327"], ["-33.4468601", "-70.5945835"], ["-33.4469368", "-70.5944518"], ["-33.4478486", "-70.5927362"], ["-33.4408443", "-70.5880069"], ["-33.4394362", "-70.5870323"], ["-33.4391826", "-70.5868568"], ["-33.4374067", "-70.5853178"], ["-33.4355226", "-70.5836124"], ["-33.4354113", "-70.5835142"], ["-33.4340614", "-70.5824193"], ["-33.4337451", "-70.5822075"], ["-33.4345682", "-70.5808682"], ["-33.4352158", "-70.5796898"], ["-33.4359659", "-70.5782768"], ["-33.4362805", "-70.5774197"], ["-33.436434", "-70.5766619"], ["-33.4367182", "-70.5758825"], ["-33.4368171", "-70.5756245"], ["-33.4374971", "-70.5743235"], ["-33.4379937", "-70.5734414"], ["-33.4389749", "-70.5731754"], ["-33.4400708", "-70.5729865"], ["-33.4414514", "-70.5727249"], ["-33.4416106", "-70.5726947"], ["-33.4433439", "-70.5723943"], ["-33.4456357", "-70.5719823"], ["-33.4475765", "-70.5716648"], ["-33.4497249", "-70.5712785"], ["-33.4510212", "-70.5710639"], ["-33.4525465", "-70.5707979"], ["-33.453055", "-70.5707378"], ["-33.4535133", "-70.5707464"], ["-33.4537353", "-70.5707979"], ["-33.4548954", "-70.571124"], ["-33.4565281", "-70.5715618"], ["-33.4580462", "-70.5719909"], ["-33.4589914", "-70.5722656"], ["-33.4597079", "-70.5725308"], ["-33.4606674", "-70.5729943"], ["-33.4620048", "-70.5736608"], ["-33.462814", "-70.573987"], ["-33.4655134", "-70.5749912"], ["-33.4680337", "-70.5759697"], ["-33.4688301", "-70.5762473"], ["-33.4688873", "-70.5760585"], ["-33.4690786", "-70.5758648"], ["-33.4692003", "-70.5757789"], ["-33.4693407", "-70.5757026"], ["-33.4694796", "-70.5756673"], ["-33.4697874", "-70.5756845"], ["-33.4699521", "-70.5758047"], ["-33.4701239", "-70.5759935"], ["-33.4702313", "-70.5762081"], ["-33.4703336", "-70.5766507"], ["-33.4702525", "-70.5770311"], ["-33.4699326", "-70.5774146"], ["-33.4727035", "-70.5827018"], ["-33.4733693", "-70.5839892"], ["-33.473491", "-70.5845214"], ["-33.4735462", "-70.5851806"], ["-33.473672", "-70.5866818"], ["-33.4741016", "-70.5887932"], ["-33.4741034", "-70.5895766"], ["-33.4738132", "-70.5921689"], ["-33.473627", "-70.5951043"], ["-33.4736127", "-70.5963918"], ["-33.4737774", "-70.598692"], ["-33.4737967", "-70.5989331"], ["-33.4738919", "-70.6012326"], ["-33.4739421", "-70.6028205"], ["-33.4740974", "-70.6063306"], ["-33.4742943", "-70.6098872"], ["-33.4744778", "-70.6134278"], ["-33.4745892", "-70.6157132"], ["-33.4747198", "-70.6184055"], ["-33.4749408", "-70.6228186"], ["-33.4749491", "-70.622984"], ["-33.4729326", "-70.62354"], ["-33.4718085", "-70.6238147"], ["-33.4713073", "-70.6239348"], ["-33.4707847", "-70.6240207"], ["-33.4704768", "-70.6240979"], ["-33.4703265", "-70.6241666"], ["-33.4702262", "-70.6242267"], ["-33.4700401", "-70.624364"], ["-33.4698539", "-70.62457"], ["-33.4695975", "-70.6249962"], ["-33.4692682", "-70.6255627"], ["-33.4690319", "-70.6258288"], ["-33.4688253", "-70.6259548"], ["-33.4685962", "-70.6260664"], ["-33.4682586", "-70.6261635"], ["-33.4672849", "-70.6263952"], ["-33.4653087", "-70.6269789"], ["-33.4623587", "-70.6278544"], ["-33.4595088", "-70.6287041"], ["-33.4573033", "-70.6293135"], ["-33.4536655", "-70.630352"], ["-33.4498668", "-70.6314905"]]

                for (junta_vecino of juntas_vecinos){

                    var p = []
                    for(poli of junta_vecino.area.replace("POLYGON ((","").replace("))","").split(",")){
                        p.push(poli.split(" ").reverse());
                    }
                    polygonsMap.drawPolygon({
                            fillColor: borde,
                            fillOpacity: 0.35,
                            paths: p,
                            strokeColor: '#3fb7ff',
                            strokeOpacity: 0.8,
                            strokeWeight: 2
                        });
                }
            }
        }

        googleMapWithPolygonsExample()
}

    render() {
        return <div>
        <div className="layout-content">
            <div className="layout-content-body">
                <div className="title-bar">
                    <h1 className="title-bar-title">
                        <span className="d-ib">Consola</span>
                        <span className="d-ib">
                <a className="title-bar-shortcut" href="#" title="Add to shortcut list" data-container="body" data-toggle-text="Remove from shortcut list" data-trigger="hover" data-placement="right" data-toggle="tooltip">
                  <span className="sr-only">Add to shortcut list</span>
                </a>
                         </span>
                    </h1>
                    <p className="title-bar-description">
                        <small>Administre sus patentes</small>
                    </p>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <div className="card">
                            <div  className="card-body center">
                                <h4 className="card-title">Sistema de Gestión de Patentes</h4><br /><br />
                                <img src="http://heythink.cl/img/muni_nunoa.jpg" width="183" height="203" /> <br /><br />
                                <h3 className="card-title">{this.props.comuna.nombre}</h3>
                            </div>

                        </div>
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <div className="card">
                            <div  className="card-body">

                                <div id="demo-map-4"></div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="row">
       {/*             <Consola_visitas></Consola_visitas>
                    <Consola_pagos pagos={this.props.pagos} patentes={this.props.patentes}></Consola_pagos>*/}

                </div>



            </div>
        </div>
        </div>;
    }
}
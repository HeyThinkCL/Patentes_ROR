class Densidad extends React.Component {
    componentDidMount() {



    }

    render() {
        return <div>
            <div className="layout-content">
                <div className="layout-content-body">
                    <div className="title-bar">
                        <h1 className="title-bar-title">
                            <span className="d-ib">Densidad ctm</span>
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


                        <div className="col-xs-12 col-md-12">
                            <div className="card">
                                <div  className="card-body">

                                    <div id="floating-panel">
                                        <button >Toggle Heatmap</button>
                                        <button >Change gradient</button>
                                        <button >Change radius</button>
                                        <button >Change opacity</button>
                                    </div>
                                    <div id="map"></div>


                                </div>

                            </div>
                        </div>

                    </div>



                </div>
            </div>
        </div>;
    }
}
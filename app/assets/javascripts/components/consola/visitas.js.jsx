class Consola_visitas extends React.Component {


    render() {

        return <div>

            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <div className="card-actions">
                            <button type="button" className="card-action card-toggler" title="Collapse" />
                            <button type="button" className="card-action card-reload" title="Reload" />
                            <button type="button" className="card-action card-remove" title="Remove" />
                        </div>
                        <strong>Ultimas visitas</strong>
                    </div>
                    <div className="card-body">
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-segment">
                                    <span className="timeline-divider" />
                                </div>
                                <div className="timeline-content" />
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-segment">
                                    <img className="timeline-media img-circle" width={40} height={40} src="img/0299419341.jpg" alt="Harry Jones" />
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-row">
                                        <a href="#">Jorge Tagle </a>
                                        <small>a las 10:30 visito:</small>
                                    </div>
                                    <div className="timeline-row">
                                        Local : Farmacia Cruz verde  Rol : 270453 Rut:34234-2
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm btn-block" type="button">Ver más</button>
                    </div>
                </div>
            </div>

        </div>;
    }
}
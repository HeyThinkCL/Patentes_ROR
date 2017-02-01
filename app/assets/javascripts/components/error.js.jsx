/**
 * Created by malba on 17-01-17.
 */
var error = React.createClass({
    getInitialState() {
        this.state ={'errores':this.props.errores};
        return this.state;

    }
    ,
    handleChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    caca: function(){
       console.log(this.props);
    },



    render: function() {

        ubicacion =  function(a) {


            try {
                out =  a.replace("POINT (", "").replace(")", "").split(" ")
                return out
            } catch (e) {
                return ["",""]
            }
        }

        selectKey = function(idx, e){


            var ix={};


            }

        errores = this.state['errores'].map( function(local,idx) {

            return (

                <div className="row">

                    <div className="col-sm-2">{local.representante.nombre_social}</div>
                    <div className="col-sm-2" >
                        <input className="form-control" value={local.direccion} updateValue={local.direccion}     type="text" name="local[giro]" id="local_giro" />
                    </div>
                        <div className="col-sm-2">
                            <input className="form-control" value={ubicacion(local.ubicacion)[0]}    type="text" name="local[giro]" id="local_giro" />

                        </div>
                    <div className="col-sm-2" >

                            <input className="form-control" value={ubicacion(local.ubicacion)[1]}    type="text" name="local[giro]" id="local_giro" />

                        </div>
                    <div  className="col-sm-1">Localizar</div>
                    <div className="col-sm-1" >Guardar</div>

                </div>

            );
        });
        return (

            <div>

                {errores}

                </div>

        );
    }
});


var Main = React.createClass({ render() { return ( <div> <h1>Hello, World!</h1> </div> ) } });

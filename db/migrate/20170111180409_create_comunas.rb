class CreateComunas < ActiveRecord::Migration[5.0]
  def change
    create_table :comunas do |t|

      t.string   :nombre
      t.string   :borde
      t.string   :fondo
      t.integer   :zoom
      t.date     :expiracion
      t.st_polygon :area, geographic: true
      t.st_point :ubicacion, geographic: true

      t.timestamps
    end
  end
end

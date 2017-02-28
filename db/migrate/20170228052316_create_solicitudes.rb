class CreateSolicitudes < ActiveRecord::Migration[5.0]
  def change
    create_table :solicitudes do |t|
      t.integer :rol
      t.integer :pago
      t.integer :deuda
      t.integer :dia_1
      t.integer :dia_2
      t.integer :mes_1
      t.integer :mes_2
      t.string :direccion
      t.string :giro
      t.date   :fecha_otorgada
      t.integer :codigo_sii
      t.integer :rol_propiedad
      t.integer :numero
      t.string  :calle
      t.string  :casa
      t.string  :departamento
      t.string  :oficina
      t.string  :local
      t.boolean :minimo,default:false
      t.boolean :deudor,default:false
      t.boolean :error,default:false
      t.st_point :ubicacion, geographic: true
      t.belongs_to :patentes, foreign_key: true
      t.belongs_to :representantes, foreign_key: true
      t.belongs_to :usuarios, foreign_key: true
      t.belongs_to :juntas_vecinos, foreign_key: true
      t.belongs_to :comunas, foreign_key: true

      t.timestamps
    end
  end
end

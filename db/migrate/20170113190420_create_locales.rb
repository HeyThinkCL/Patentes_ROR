class CreateLocales < ActiveRecord::Migration[5.0]
  def change
    create_table :locales do |t|
      t.integer :rol
      t.integer :pago
      t.integer :deuda
      t.integer :dia_1
      t.integer :dia_2
      t.integer :mes_1
      t.integer :mes_2
      t.string :direccion
      t.string :giro
      t.boolean :minimo,default:false
      t.boolean :deudor,default:false
      t.boolean :error,default:false
      t.st_point :ubicacion, geographic: true
      t.belongs_to :patentes, foreign_key: true
      t.belongs_to :representantes, foreign_key: true
      t.belongs_to :usuarios, foreign_key: true
      t.timestamps

    end
  end
end


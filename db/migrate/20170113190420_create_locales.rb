class CreateLocales < ActiveRecord::Migration[5.0]
  def change
    create_table :locales do |t|
      t.integer :rol
      t.integer :rut
      t.string :dv
      t.string :nombre_social
      t.string :direccion
      t.string :giro
      t.boolean :error,default:false
      t.st_point :ubicacion, geographic: true
      t.belongs_to :patentes, foreign_key: true
      t.timestamps

    end
  end
end


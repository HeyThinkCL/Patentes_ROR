class CreateJuntasVecinos < ActiveRecord::Migration[5.0]
  def change
    create_table :juntas_vecinos do |t|
      t.integer  :numero
      t.string   :nombre
      t.st_polygon :area, geographic: true
      t.belongs_to :comunas, foreign_key: true
      t.timestamps
    end
  end
end

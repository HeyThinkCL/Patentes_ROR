class CreateRepresentantes < ActiveRecord::Migration[5.0]
  def change
    create_table :representantes do |t|
      t.integer :rut
      t.string :dv
      t.string :email
      t.string :passwd
      t.string :nombre_social
      t.string :nombre
      t.string :apellido
      t.string :telefono
      t.string :celular
      t.belongs_to :usuarios, foreign_key: true
      t.timestamps

    end
  end
end

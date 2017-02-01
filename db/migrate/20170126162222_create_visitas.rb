class CreateVisitas < ActiveRecord::Migration[5.0]
  def change
    create_table :visitas do |t|
      t.belongs_to :locales, foreign_key: true
      t.belongs_to :usuarios, foreign_key: true
      t.belongs_to :roles, foreign_key: true
      t.datetime :futuro_pago
      t.timestamps

    end
  end
end

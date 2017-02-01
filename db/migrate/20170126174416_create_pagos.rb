class CreatePagos < ActiveRecord::Migration[5.0]
  def change
    create_table :pagos do |t|

      t.belongs_to :usuarios, foreign_key: true
      t.belongs_to :local, foreign_key: true
      t.belongs_to :metodos_pagos, foreign_key: true
      t.integer :pagado

      t.timestamps
    end
  end
end

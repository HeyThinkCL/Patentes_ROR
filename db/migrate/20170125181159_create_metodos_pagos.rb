class CreateMetodosPagos < ActiveRecord::Migration[5.0]
  def change
    create_table :metodos_pagos do |t|
      t.string :metodo
      t.integer :comision
      t.datetime :fin_servicio


      t.timestamps
    end
  end
end

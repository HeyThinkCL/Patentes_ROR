class CreatePatentes < ActiveRecord::Migration[5.0]
  def change
    create_table :patentes do |t|
      t.string :nombre
      t.string :tipo

      t.timestamps
    end
  end
end

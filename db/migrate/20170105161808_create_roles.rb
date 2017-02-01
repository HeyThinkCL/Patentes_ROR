class CreateRoles < ActiveRecord::Migration[5.0]
  def change
    create_table :roles do |t|
      t.string :nombre
      t.integer :permiso

      t.timestamps
    end
  end
end

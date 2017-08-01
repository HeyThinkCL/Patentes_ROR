class ChangeTableUsuario < ActiveRecord::Migration[5.0]
  def change
    change_table :usuarios do |t|
      t.remove :passwd
      t.string :password_digest
    end
  end
end

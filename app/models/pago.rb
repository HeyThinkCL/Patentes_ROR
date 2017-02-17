class Pago < ApplicationRecord
  belongs_to :local, foreign_key: 'local_id'
  belongs_to :usuario, foreign_key: 'usuarios_id'
end

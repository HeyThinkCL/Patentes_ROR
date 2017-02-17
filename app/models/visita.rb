class Visita < ApplicationRecord
  belongs_to :local, foreign_key: 'locales_id'
  belongs_to :usuario, foreign_key: 'usuarios_id'
end

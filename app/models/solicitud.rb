class Solicitud < ApplicationRecord
  belongs_to :representante, foreign_key: 'representantes_id'
  belongs_to :patente, foreign_key: 'patentes_id'
end

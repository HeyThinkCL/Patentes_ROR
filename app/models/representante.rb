class Representante < ApplicationRecord
  has_many :locales, foreign_key: 'representantes_id'
  has_many :solicitudes, foreign_key: 'representantes_id'
end

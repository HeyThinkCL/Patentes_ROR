class Representante < ApplicationRecord
  has_many :locales, foreign_key: 'representantes_id'
end

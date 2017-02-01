class Local < ApplicationRecord
  belongs_to :representante, foreign_key: 'representantes_id'
end

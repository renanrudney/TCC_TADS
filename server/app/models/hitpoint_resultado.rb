class HitpointResultado < ApplicationRecord
  self.table_name = "resultado_hitpoint"
  belongs_to :usuario, class_name: "Usuario::Base"
end

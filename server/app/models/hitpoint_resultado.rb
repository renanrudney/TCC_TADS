class HitpointResultado < ApplicationRecord
  self.table_name = "resultado_hitpoint"
  has_many :hit_data, foreign_key: "resultado_hitpoint_id"
  belongs_to :usuario, class_name: "Usuario::Base"

  accepts_nested_attributes_for :hit_data
end

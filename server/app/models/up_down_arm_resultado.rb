class UpDownArmResultado < ApplicationRecord
  self.table_name = "resultado_updownarm"
  has_many :accelerometers, as: :reference
  has_many :gyroscopes, as: :reference
  belongs_to :usuario, class_name: "Usuario::Base"

  accepts_nested_attributes_for :accelerometers, :gyroscopes
end

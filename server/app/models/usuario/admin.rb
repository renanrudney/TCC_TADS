class Usuario::Admin < ApplicationRecord
  self.table_name = "admin"
  belongs_to :usuario, class_name: "Usuario::Base", optional: true
end

class Usuario::Comum < ApplicationRecord
  self.table_name = "usu_comum"
  belongs_to :usuario, class_name: "Usuario::Base", optional: true
end

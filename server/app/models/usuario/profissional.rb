class Usuario::Profissional < ApplicationRecord
  self.table_name = "usu_profissional"
  belongs_to :usuario, class_name: "Usuario::Base", optional: true
end

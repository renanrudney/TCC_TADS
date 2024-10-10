class Usuario::Base < ApplicationRecord
  self.table_name = "usuario"
  has_secure_password :senha, validations: false

  has_one :comum, class_name: "Usuario::Comum", foreign_key: :usuario_id
  has_one :profissional, class_name: "Usuario::Profissional", foreign_key: :usuario_id

  validates :cpf, presence: true, uniqueness: true
  validates :nome, presence: true
  validates :login, presence: true, uniqueness: true
  validates :senha, presence: true

  accepts_nested_attributes_for :comum, allow_destroy: true
  accepts_nested_attributes_for :profissional, allow_destroy: true

  enum :tipo, { comum: 0, profissional: 1 }
end

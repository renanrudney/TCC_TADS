class Usuario < ApplicationRecord
  has_secure_password :senha, validations: false

  validates :cpf, presence: true, uniqueness: true
  validates :nome, presence: true
  validates :login, presence: true, uniqueness: true
  validates :senha, presence: true

  enum :tipo, { comum: 0 }
end

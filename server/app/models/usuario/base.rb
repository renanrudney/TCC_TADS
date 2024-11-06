class Usuario::Base < ApplicationRecord
  self.table_name = "usuario"
  has_secure_password :senha, validations: false

  before_create :check_role

  has_one :comum, class_name: "Usuario::Comum", foreign_key: :usuario_id, dependent: :destroy
  has_one :profissional, class_name: "Usuario::Profissional", foreign_key: :usuario_id, dependent: :destroy
  has_one :admin, class_name: "Usuario::Admin", foreign_key: :usuario_id, dependent: :destroy
  has_many :resultado_hitpoint, class_name: "HitpointResultado", foreign_key: :usuario_id, dependent: :destroy
  has_many :resultado_heel_rise, class_name: "HeelRiseResultado", foreign_key: :usuario_id, dependent: :destroy
  has_many :resultado_up_down_arm, class_name: "UpDownArmResultado", foreign_key: :usuario_id, dependent: :destroy

  validates :cpf, presence: true, uniqueness: true
  validates :nome, presence: true
  validates :login, presence: true, uniqueness: true
  # validates :senha, presence: true

  accepts_nested_attributes_for :comum, allow_destroy: true
  accepts_nested_attributes_for :profissional, allow_destroy: true

  enum :tipo, { comum: 0, profissional: 1, admin: 2 }

  private

  def check_role
    case tipo&.to_sym
    when :admin
      self.admin = Usuario::Admin.new
    when :profissional
      self.profissional ||= Usuario::Profissional.new
    else
      self.comum ||= Usuario::Comum.new
      self.tipo ||= :comum
    end
  end
end

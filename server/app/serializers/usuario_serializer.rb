class UsuarioSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :cpf, :tipo, :nome, :sobrenome, :nascimento, :genero, :nivel_sintoma, :links

  def nivel_sintoma = object.comum&.nivel_sintoma

  def genero = object.comum&.genero

  def links = []
end

class ProfissionalSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :cpf, :login, :nome, :sobrenome, :nascimento, :tipo_registro, :registro, :especialidade, :links

  def tipo_registro = object.profissional.tipo_registro

  def registro = object.profissional.registro

  def especialidade = object.profissional.especialidade

  def links
    [
      {
        "rel": "self",
        "href": profissional_path(object)
      }
    ]
  end
end

class HeelRiseResultadoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :realizado, :accelerometers, :gyroscopes, :usuario, :tipo, :created_at, :updated_at, :links

  def usuario = ActiveModel::SerializableResource.new(object.usuario, serializer: UsuarioSerializer)

  def tipo = 'heel_rise'

  def links
    [
      {
        "rel": "self",
        "href": heel_rise_resultado_path(object)
      }
    ]
  end
end

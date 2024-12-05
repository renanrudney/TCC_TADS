class UpDownArmResultadoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :realizado, :accelerometers, :gyroscopes, :usuario, :tipo, :created_at, :updated_at, :links

  def usuario = ActiveModel::SerializableResource.new(object.usuario, serializer: UsuarioSerializer)

  def tipo = 'up_down_arm'

  def links
    [
      {
        "rel": "self",
        "href": up_down_arm_resultado_path(object)
      }
    ]
  end
end

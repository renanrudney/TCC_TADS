class HitpointResultadoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :qtd_toque, :intervalo_medio, :realizado, :usuario, :hit_data, :tipo, :created_at, :updated_at, :links

  def usuario = ActiveModel::SerializableResource.new(object.usuario, serializer: UsuarioSerializer)

  def tipo = 'hitpoint'

  def links
    [
      {
        "rel": "self",
        "href": hitpoint_resultado_path(object)
      }
    ]
  end
end

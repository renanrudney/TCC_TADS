class HitpointResultadoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :qtd_toque, :intervalo_toque, :realizado, :usuario_id, :created_at, :updated_at, :links

  def links
    [
      {
        "rel": "self",
        "href": hitpoint_resultado_path(object)
      }
    ]
  end
end

class HitpointResultadoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :qtd_toque, :intervalo_medio, :realizado, :usuario, :hit_data, :created_at, :updated_at, :links

  def links
    [
      {
        "rel": "self",
        "href": hitpoint_resultado_path(object)
      }
    ]
  end
end

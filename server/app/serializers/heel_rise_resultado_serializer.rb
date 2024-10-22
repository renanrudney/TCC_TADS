class HeelRiseResultadoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :realizado, :accelerometers, :gyroscopes, :usuario_id, :created_at, :updated_at, :links

  def links
    [
      {
        "rel": "self",
        "href": heel_rise_resultado_path(object)
      }
    ]
  end
end

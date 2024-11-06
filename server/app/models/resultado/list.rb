class Resultado::List
  Item = Struct.new(
    :id, :qtd_toque, :intervalo_toque, :realizado, :usuario_id, :created_at, :updated_at, :accelerometers, :gyroscopes, :links, :type, keyword_init: true
  ) do
    def initialize(*)
      super
      self.accelerometers ||= []
      self.gyroscopes ||= []
      self.links = build_links
    end

    def build_links
      self.type.present? && id.present? or return []

      url =
        case self.type
        when :hitpoint
          "/hitpoint_resultados/#{id}"
        when :up_down_arm
          "/up_down_arm_resultados/#{id}"
        when :heel_rise
          "/heel_rise_resultados/#{id}"
        end
      [{
        "rel": "self",
        "href": url
      }]
    end
  end

  def self.call(usuario_id:)
    resultados = []
    ::HitpointResultado.where(usuario_id: ).each do |hp|
      attributes = hp.attributes.merge(type: :hitpoint)
      resultados << Item.new(attributes)
    end
    ::UpDownArmResultado.where(usuario_id:).each do |ud|
      attributes = ud.attributes.merge(type: :up_down_arm)
      attributes = attributes.merge(accelerometers: ud.accelerometers, gyroscopes: ud.gyroscopes)
      resultados << Item.new(attributes)
    end
    ::HeelRiseResultado.where(usuario_id:).each do |ud|
      attributes = ud.attributes.merge(type: :heel_rise)
      attributes = attributes.merge(accelerometers: ud.accelerometers, gyroscopes: ud.gyroscopes)
      resultados << Item.new(attributes)
    end
    resultados
  end
end

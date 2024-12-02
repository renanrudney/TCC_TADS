class Resultado::List
  Item = Struct.new(
    :id, :qtd_toque, :intervalo_medio, :realizado, :usuario_id, :created_at, :updated_at, :links, :type,
    :qtd_accelerometers, :qtd_gyroscopes, keyword_init: true
  ) do
    def initialize(*)
      super
      self.qtd_accelerometers ||= 0
      self.qtd_gyroscopes ||= 0
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
      [ {
        "rel": "self",
        "href": url
      } ]
    end
  end

  def self.call(usuario_id:, date:, type:)
    format_date = date.present? ? date.in_time_zone("America/Sao_Paulo") : nil
    @resultados = []
    if type.blank?
      updownarm(usuario_id:, realizado: format_date)
      heelrise(usuario_id:, realizado: format_date)
      hitpoint(usuario_id:, realizado: format_date)
    else
      case type.to_sym
      when :up_down_arm
        updownarm(usuario_id:, realizado: format_date)
      when :heel_rise
        heelrise(usuario_id:, realizado: format_date)
      when :hitpoint
        hitpoint(usuario_id:, realizado: format_date)
      end
    end

    @resultados
  end

  def self.hitpoint(usuario_id:, realizado:)
    query = ::HitpointResultado.where(realizado: realizado&.beginning_of_day..realizado&.end_of_day)
    query = query.where(usuario_id:) if usuario_id.present?

    query.find_each do |hp|
      attributes = hp.attributes.merge(type: :hitpoint)
      @resultados << Item.new(attributes)
    end
  end

  def self.updownarm(usuario_id:, realizado:)
    query = ::UpDownArmResultado.where(realizado: realizado&.beginning_of_day..realizado&.end_of_day)
    query = query.where(usuario_id:) if usuario_id.present?

    query.find_each do |ud|
      attributes = ud.attributes.merge(type: :up_down_arm)
      attributes = attributes.merge(qtd_accelerometers: ud.accelerometers.count, qtd_gyroscopes: ud.gyroscopes.count)
      @resultados << Item.new(attributes)
    end
  end

  def self.heelrise(usuario_id:, realizado:)
    query = ::HeelRiseResultado.where(realizado: realizado&.beginning_of_day..realizado&.end_of_day)
    query = query.where(usuario_id:) if usuario_id.present?

    query.find_each do |hr|
      attributes = hr.attributes.merge(type: :heel_rise)
      attributes = attributes.merge(qtd_accelerometers: ud.accelerometers.count, qtd_gyroscopes: ud.gyroscopes.count)
      @resultados << Item.new(attributes)
    end
  end
end

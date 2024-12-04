class Resultado::List
  Item = Struct.new(
    :id, :qtd_toque, :intervalo_medio, :realizado, :usuario_id, :usuario, :created_at, :updated_at, :links, :type,
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

  def self.call(usuario_id:, date:, date_to:, type:, nivel:, sexo:, nome:, sobrenome:)
    format_date = date.present? ? date.in_time_zone("America/Sao_Paulo") : nil
    format_date_to = date_to.present? ? date_to.in_time_zone("America/Sao_Paulo") : format_date
    date_param = [format_date, format_date_to]
    @resultados = []
    if type.blank?
      updownarm(query: build_query(entity: ::UpDownArmResultado, usuario_id:, realizado: date_param, nivel:, sexo:, nome:, sobrenome:))
      heelrise(query: build_query(entity: ::HeelRiseResultado, usuario_id:, realizado: date_param, nivel:, sexo:, nome:, sobrenome:))
      hitpoint(query: build_query(entity: ::HitpointResultado, usuario_id:, realizado: date_param, nivel:, sexo:, nome:, sobrenome:))
    else
      case type.to_sym
      when :up_down_arm
        updownarm(query: build_query(entity: ::UpDownArmResultado, usuario_id:, realizado: date_param, nivel:, sexo:, nome:, sobrenome:))
      when :heel_rise
        heelrise(query: build_query(entity: ::HeelRiseResultado, usuario_id:, realizado: date_param, nivel:, sexo:, nome:, sobrenome:))
      when :hitpoint
        hitpoint(query: build_query(entity: ::HitpointResultado, usuario_id:, realizado: date_param, nivel:, sexo:, nome:, sobrenome:))
      end
    end

    @resultados
  end

  def self.build_query(entity:, usuario_id:, realizado: date_param, nivel:, sexo:, nome:, sobrenome:)
    query = entity.where(realizado: realizado[0]&.beginning_of_day..realizado[1]&.end_of_day)
    query = query.where(usuario_id:) if usuario_id.present?
    if (nivel.present? || sexo.present? || nome.present? || sobrenome.present?)
      query = query.joins(usuario: :comum)
      query = query.where("LOWER(usuario.nome) LIKE LOWER('%#{nome}%')") if nome.present?
      query = query.where("LOWER(usuario.sobrenome) LIKE LOWER('%#{sobrenome}%')") if sobrenome.present?
      query = query.where('LOWER("usu_comum"."genero") = LOWER(?)', sexo) if sexo.present?
      query = query.where(usuario: { usu_comum: { nivel_sintoma: nivel }}) if nivel.present?
    end
    query
  end

  def self.hitpoint(query:)
    query.find_each do |hp|
      usuario = hp.usuario.attributes.merge(comum: hp.usuario&.comum)
      attributes = hp.attributes.merge(type: :hitpoint, usuario: usuario)
      @resultados << Item.new(attributes)
    end
  end

  def self.updownarm(query:)
    query.find_each do |ud|
      usuario = ud.usuario.attributes.merge(comum: ud.usuario&.comum)
      attributes = ud.attributes.merge(type: :up_down_arm, usuario: usuario)
      attributes = attributes.merge(qtd_accelerometers: ud.accelerometers.count, qtd_gyroscopes: ud.gyroscopes.count)
      @resultados << Item.new(attributes)
    end
  end

  def self.heelrise(query:)
    query.find_each do |hr|
      usuario = hr.usuario.attributes.merge(comum: hr.usuario&.comum)
      attributes = hr.attributes.merge(type: :heel_rise, usuario: usuario)
      attributes = attributes.merge(qtd_accelerometers: hr.accelerometers.count, qtd_gyroscopes: hr.gyroscopes.count)
      @resultados << Item.new(attributes)
    end
  end
end

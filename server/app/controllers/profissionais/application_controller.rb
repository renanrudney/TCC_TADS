class Profissionais::ApplicationController < ::ApplicationController
  before_action :autenticar_usuario
  before_action :check_profissional

  private

  def check_profissional
    return if @usuario_atual.profissional?

    render json: { errors: [ "Sem permissão para realizar essa ação." ] }, status: :forbidden
  end
end

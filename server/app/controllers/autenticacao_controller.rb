class AutenticacaoController < ApplicationController
  skip_before_action :autenticar_usuario

  # POST /login
  def login
    @usuario = Usuario.find_by_login(params[:login])
    if @usuario&.authenticate_senha(params[:senha])
      token = JwtToken.encode({ usuario_id: @usuario.id })
      time = Time.now + 7.days.to_i
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"), login: @usuario.login }, status: :ok
    else
      render json: { errors: [ "Erro ao logar. Verifique suas informações de login e tente novamente." ] }, status: :unauthorized
    end
  end
end

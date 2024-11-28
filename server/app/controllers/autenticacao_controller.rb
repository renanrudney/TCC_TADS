class AutenticacaoController < ApplicationController
  skip_before_action :autenticar_usuario, only: :login

  # POST /login
  def login
    @usuario = Usuario::Base.find_by_login(params[:login])
    if @usuario&.authenticate_senha(params[:senha])
      token = JwtToken.encode({ usuario_id: @usuario.id, nome: @usuario.nome })
      time = Time.now + 7.days.to_i
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"), login: @usuario.login, role: @usuario.tipo }, status: :ok
    else
      render json: { errors: [ "Erro ao logar. Verifique suas informações de login e tente novamente." ] }, status: :unauthorized
    end
  end

  def nova_senha
    if @usuario_atual.authenticate_senha(params[:senha_antiga])
      if params[:senha_nova].blank?
        render json: { errors: [ "Senha nova não pode ficar em branco." ] }, status: :unprocessable_entity
      else
        @usuario_atual.update(senha: params[:senha_nova])
        render json: {}, status: :no_content
      end
    else
      render json: { errors: [ "Erro ao alterar senha. Verifique suas informações de login e tente novamente." ] }, status: :unauthorized
    end
  end
end

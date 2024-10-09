class ApplicationController < ActionController::API
  include JwtToken
  include Pagy::Backend

  before_action :autenticar_usuario

  private

  def autenticar_usuario
    header = request.headers["Authorization"]
    header = header.split(" ").last if header
    begin
      @decoded = JwtToken.decode(header)
      @usuario_atual = Usuario.find(@decoded[:usuario_id])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render json: { errors: [ "Token inválido. Verifique suas informações de login e tente novamente." ] }, status: :unauthorized
    end
  end
end

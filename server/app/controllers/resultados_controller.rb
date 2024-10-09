class ResultadosController < ApplicationController
  skip_before_action :autenticar_usuario

  def index
    @resultados = Resultado::List.call
    render json: @resultados, status: :ok
  end
end

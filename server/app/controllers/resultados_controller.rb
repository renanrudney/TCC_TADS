class ResultadosController < ApplicationController
  skip_before_action :autenticar_usuario

  def index
    resultados = Resultado::List.call
    @pagy, @records = pagy_array(resultados)
    render json: { records: @records, meta: pagy_metadata(@pagy)}, status: :ok
  end
end

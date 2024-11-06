class ResultadosController < ApplicationController
  def index
    resultados = Resultado::List.call(usuario_id: @usuario_atual.id)
    @pagy, @records = pagy_array(resultados)
    render json: { records: @records, meta: pagy_metadata(@pagy)}, status: :ok
  end
end

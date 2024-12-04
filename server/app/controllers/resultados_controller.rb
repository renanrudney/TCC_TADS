class ResultadosController < ApplicationController
  def index
    usuario_id = @usuario_atual.profissional? ? nil : @usuario_atual.id
    resultados = Resultado::List.call(usuario_id: usuario_id, date: params[:date], date_to: params[:date_to], type: params[:type], nivel: params[:nivel], sexo: params[:sexo], nome: params[:nome], sobrenome: params[:sobrenome])
    resultados = resultados&.sort_by(&:created_at)&.reverse
    @pagy, @records = pagy_array(resultados)
    render json: { records: @records, meta: pagy_metadata(@pagy) }, status: :ok
  end
end

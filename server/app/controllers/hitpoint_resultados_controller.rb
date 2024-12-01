class HitpointResultadosController < ApplicationController
  before_action :set_hitpoint_resultado, only: %i[ show update destroy ]

  # GET /hitpoint_resultados
  def index
    resultados = HitpointResultado.where(usuario_id: @usuario_atual.id)

    @pagy, @records = pagy(resultados)
    render json: { records: ActiveModel::Serializer::CollectionSerializer.new(@records, serializer: HitpointResultadoSerializer), meta: pagy_metadata(@pagy) }, status: :ok
  end

  # GET /hitpoint_resultados/1
  def show
    render json: @hitpoint_resultado
  end

  # POST /hitpoint_resultados
  def create
    @hitpoint_resultado = HitpointResultado.new(hitpoint_resultado_params)

    if @hitpoint_resultado.save
      render json: @hitpoint_resultado, status: :created, location: @hitpoint_resultado
    else
      render json: @hitpoint_resultado.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /hitpoint_resultados/1
  def update
    if @hitpoint_resultado.update(hitpoint_resultado_params)
      render json: @hitpoint_resultado
    else
      render json: @hitpoint_resultado.errors, status: :unprocessable_entity
    end
  end

  # DELETE /hitpoint_resultados/1
  def destroy
    @hitpoint_resultado.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hitpoint_resultado
      @hitpoint_resultado = HitpointResultado.find_by!(id: params[:id], usuario_id: @usuario_atual.id)
    end

    # Only allow a list of trusted parameters through.
    def hitpoint_resultado_params
      params.require(:resultado).permit([
        :qtd_toque, :intervalo_medio, :realizado, hit_data_attributes: [ :hit_number, :timestamp ]
      ]).merge(usuario_id: @usuario_atual.id)
    end
end

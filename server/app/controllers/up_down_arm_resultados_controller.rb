class UpDownArmResultadosController < ApplicationController
  before_action :set_up_down_arm_resultado, only: %i[ show update destroy ]

  # GET /up_down_arm_resultados
  def index
    resultados = UpDownArmResultado.where(usuario_id: @usuario_atual.id)

    @pagy, @records = pagy(resultados)
    render json: { records: ActiveModel::Serializer::CollectionSerializer.new(@records, serializer: UpDownArmResultadoSerializer), meta: pagy_metadata(@pagy) }, status: :ok
  end

  # GET /up_down_arm_resultados/1
  def show
    render json: @up_down_arm_resultado
  end

  # POST /up_down_arm_resultados
  def create
    @up_down_arm_resultado = UpDownArmResultado.new(up_down_arm_resultado_params)

    if @up_down_arm_resultado.save
      render json: @up_down_arm_resultado, status: :created, location: @up_down_arm_resultado
    else
      render json: @up_down_arm_resultado.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /up_down_arm_resultados/1
  def update
    if @up_down_arm_resultado.update(up_down_arm_resultado_params)
      render json: @up_down_arm_resultado
    else
      render json: @up_down_arm_resultado.errors, status: :unprocessable_entity
    end
  end

  # DELETE /up_down_arm_resultados/1
  def destroy
    @up_down_arm_resultado.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_up_down_arm_resultado
      @up_down_arm_resultado = UpDownArmResultado.find_by!(id: params[:id], usuario_id: @usuario_atual.id)
    end

    # Only allow a list of trusted parameters through.
    def up_down_arm_resultado_params
      params.require(:resultado).permit([
        :realizado, accelerometers_attributes: [:x_axis, :y_axis, :z_axis, :realizado], gyroscopes_attributes: [:x_axis, :y_axis, :z_axis, :realizado]
      ]).merge(usuario_id: @usuario_atual.id)
    end
end

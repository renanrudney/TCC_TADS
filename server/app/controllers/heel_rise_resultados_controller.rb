class HeelRiseResultadosController < ApplicationController
  skip_before_action :autenticar_usuario
  before_action :set_heel_rise_resultado, only: %i[ show update destroy ]

  # GET /heel_rise_resultados
  def index
    resultados = HeelRiseResultado.all

    @pagy, @records = pagy(resultados)
    render json: { records: ActiveModel::Serializer::CollectionSerializer.new(@records, serializer: HeelRiseResultadoSerializer), meta: pagy_metadata(@pagy) }, status: :ok
  end

  # GET /heel_rise_resultados/1
  def show
    render json: @heel_rise_resultado
  end

  # POST /heel_rise_resultados
  def create
    @heel_rise_resultado = HeelRiseResultado.new(heel_rise_resultado_params)

    if @heel_rise_resultado.save
      render json: @heel_rise_resultado, status: :created, location: @heel_rise_resultado
    else
      render json: @heel_rise_resultado.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /heel_rise_resultados/1
  def update
    if @heel_rise_resultado.update(heel_rise_resultado_params)
      render json: @heel_rise_resultado
    else
      render json: @heel_rise_resultado.errors, status: :unprocessable_entity
    end
  end

  # DELETE /heel_rise_resultados/1
  def destroy
    @heel_rise_resultado.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_heel_rise_resultado
      @heel_rise_resultado = HeelRiseResultado.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def heel_rise_resultado_params
      params.require(:resultado).permit([
        :realizado, accelerometers_attributes: [:x_axis, :y_axis, :z_axis, :realizado], gyroscopes_attributes: [:x_axis, :y_axis, :z_axis, :realizado]
      ])
    end
end
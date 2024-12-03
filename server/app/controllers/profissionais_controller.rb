class ProfissionaisController < ApplicationController
  skip_before_action :autenticar_usuario
  before_action :set_usuario, only: [ :show, :update, :destroy ]
  # before_action :check_admin # TODO: Uncomment on add authentication on client side

  def index
    usuarios = Usuario::Base.where(tipo: :profissional)

    @pagy, @records = pagy(usuarios)
    render json: { records: ActiveModel::Serializer::CollectionSerializer.new(@records, serializer: ProfissionalSerializer), meta: pagy_metadata(@pagy) }, status: :ok
  end

  def show
    render json: @usuario, status: :ok, serializer: ProfissionalSerializer
  end

  def create
    @usuario = Usuario::Base.new(profissional_params)
    if @usuario.save
      render json: { status: :created }, status: :created
    else
      render json: { errors: @usuario.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @usuario.update(profissional_params)
      render json: @usuario, serializer: ProfissionalSerializer
    else
      render json: @usuario.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @usuario.destroy
  end

  private

  def usuario_params
    params.permit(:profissional, :cpf, :login, :senha, :nome, :sobrenome, :nascimento, :tipo_registro, :registro, :especialidade)
  end

  def profissional_params
    permitted_params = usuario_params
    {
      cpf: permitted_params[:cpf], login: permitted_params[:login], senha: permitted_params[:senha], tipo: :profissional,
      nome: permitted_params[:nome], sobrenome: permitted_params[:sobrenome], nascimento: permitted_params[:nascimento], profissional_attributes: {
        tipo_registro: permitted_params[:tipo_registro], registro: permitted_params[:registro], especialidade: permitted_params[:especialidade]
      }
    }
  end

  def set_usuario
    @usuario = Usuario::Base.find_by!(id: params[:id], tipo: :profissional)
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Profissional não encontrado."] }, status: :not_found
  end

  def check_admin
    return if @usuario_atual&.admin?

    render json: { errors: ["Sem permissão para realizar essa ação, disponível apenas para administradores."] }, status: :forbidden
  end
end

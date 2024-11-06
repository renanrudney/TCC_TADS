class RegistroController < ApplicationController
  skip_before_action :autenticar_usuario, only: :create

  def show
    render json: @usuario_atual, serializer: ComumSerializer
  end

  def create
    @usuario = Usuario::Base.new(create_params)
    if @usuario.save
      render json: { status: :created }, status: :created
    else
      render json: { errors: @usuario.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @usuario_atual.update(update_params)
      render json: @usuario_atual, serializer: ComumSerializer
    else
      render json: { errors: @usuario_atual.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def usuario_params
    params.permit(:registro, :cpf, :login, :senha, :nome, :sobrenome, :nascimento, :genero, :nivel_sintoma)
  end

  def create_params
    permitted_params = usuario_params
    {
      cpf: permitted_params[:cpf], login: permitted_params[:login], senha: permitted_params[:senha],
      nome: permitted_params[:nome], sobrenome: permitted_params[:sobrenome], nascimento: permitted_params[:nascimento],
      comum_attributes: {
        genero: permitted_params[:genero], nivel_sintoma: permitted_params[:nivel_sintoma]
      }
    }
  end

  def update_params
    permitted_params = params.permit(:registro, :email, :nome, :sobrenome, :nascimento, :nivel_sintoma)
    {
      login: permitted_params[:email], nome: permitted_params[:nome], sobrenome: permitted_params[:sobrenome], 
      nascimento: permitted_params[:nascimento], comum_attributes: {
        genero: permitted_params[:genero], nivel_sintoma: permitted_params[:nivel_sintoma]
      }
    }
  end
end

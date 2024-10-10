class RegistroController < ApplicationController
  skip_before_action :autenticar_usuario

  def create
    @usuario = Usuario::Base.new(create_params)
    if @usuario.save
      render json: { status: :created }, status: :created
    else
      render json: { errors: @usuario.errors.full_messages }, status: :unprocessable_entity
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
      nome: permitted_params[:nome], comum_attributes: {
        genero: permitted_params[:genero], nivel_sintoma: permitted_params[:nivel_sintoma]
      }
    }
  end
end

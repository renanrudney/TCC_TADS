class UsuariosController < ApplicationController
  skip_before_action :autenticar_usuario, only: :create
  before_action :set_usuario, only: [ :show, :update, :destroy ]

  def index
    @usuarios = Usuario.all
    render json: @usuarios, status: :ok
  end

  def show
    render json: @usuario, status: :ok
  end

  def create
    @usuario = Usuario.new(usuario_params)
    if @usuario.save
      render json: @usuario, status: :ok
    else
      render json: { errors: @usuario.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @usuario.update(usuario_params)
      render json: @usuario
    else
      render json: @usuario.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @usuario.destroy
  end

  private

  def usuario_params
    params.permit(:cpf, :nome, :sobrenome, :nascimento, :login, :senha)
  end

  def set_usuario
    @usuario = Usuario.find(params[:id])
  end
end

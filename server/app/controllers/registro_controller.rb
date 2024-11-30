class RegistroController < ApplicationController
  skip_before_action :autenticar_usuario, only: :create

  def show
    render json: @usuario_atual, serializer: ComumSerializer
  end

  def create
    @usuario = Usuario::Base.new(usuario_params)
    if @usuario.save
      render json: { status: :created }, status: :created
    else
      render json: { errors: @usuario.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @usuario_atual.update(usuario_params)
      render json: @usuario_atual, serializer: ComumSerializer
    else
      render json: { errors: @usuario_atual.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @usuario_atual.destroy
      render json: {}, status: :no_content
    else
      render json: { errors: @usuario_atual.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def usuario_params
    params.permit(
      :cpf, :login, :senha, :nome, :sobrenome, :nascimento,
      comum_attributes: [
        :genero, :nivel_sintoma
      ]
    )
  end
end

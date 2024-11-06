class Profissionais::RegistroController < Profissionais::ApplicationController
  skip_before_action :autenticar_usuario, only: :create
  skip_before_action :check_profissional, only: :create

  def show
    render json: @usuario_atual, serializer: ProfissionalSerializer
  end

  def create
    @usuario = ::Usuario::Base.new(create_params)
    if @usuario.save
      render json: @usuario, serializer: ProfissionalSerializer, status: :created
    else
      render json: { errors: @usuario.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @usuario_atual.update(update_params)
      render json: @usuario_atual, serializer: ProfissionalSerializer
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

  def profissional_params
    params.permit(:registro, :cpf, :login, :senha, :nome, :sobrenome, :nascimento, :tipo_registro, :registro, :especialidade)
  end

  def create_params
    permitted_params = profissional_params
    {
      cpf: permitted_params[:cpf], login: permitted_params[:login], senha: permitted_params[:senha],
      nome: permitted_params[:nome], sobrenome: permitted_params[:sobrenome], nascimento: permitted_params[:nascimento],
      profissional_attributes: {
        tipo_registro: permitted_params[:tipo_registro], registro: permitted_params[:registro], especialidade: permitted_params[:especialidade]
      }
    }.merge(tipo: :profissional)
  end

  def update_params
    permitted_params = params.permit(:registro, :email, :nome, :sobrenome, :nascimento, :tipo_registro, :registro, :especialidade)
    {
      login: permitted_params[:email], nome: permitted_params[:nome], sobrenome: permitted_params[:sobrenome], 
      nascimento: permitted_params[:nascimento], profissional_attributes: {
        tipo_registro: permitted_params[:tipo_registro], registro: permitted_params[:registro], especialidade: permitted_params[:especialidade]
      }
    }.merge(tipo: :profissional)
  end
end

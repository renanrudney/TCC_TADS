class CreateProfissionais < ActiveRecord::Migration[7.2]
  def change
    create_table :usu_profissional do |t|
      t.string :tipo_registro
      t.string :registro
      t.string :especialidade
      t.references :usuario, index: { unique: true }

      t.timestamps
    end
  end
end

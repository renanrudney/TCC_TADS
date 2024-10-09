class CreateHitpointResultados < ActiveRecord::Migration[7.2]
  def change
    create_table :hitpoint_resultados do |t|
      t.integer :qtd_toque
      t.integer :intervalo_toque
      t.timestamp :realizado
      t.references :usuario, index: true

      t.timestamps
    end
  end
end

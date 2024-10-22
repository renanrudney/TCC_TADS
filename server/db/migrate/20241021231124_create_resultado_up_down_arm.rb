class CreateResultadoUpDownArm < ActiveRecord::Migration[7.2]
  def change
    create_table :resultado_updownarm do |t|
      t.timestamp :realizado
      t.references :usuario, index: true

      t.timestamps
    end
  end
end

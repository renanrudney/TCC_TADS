class CreateComuns < ActiveRecord::Migration[7.2]
  def change
    create_table :usu_comum do |t|
      t.string :genero, limit: 1
      t.integer :nivel_sintoma, limit: 1
      t.references :usuario, index: { unique: true }

      t.timestamps
    end
  end
end

class CreateUsuarios < ActiveRecord::Migration[7.2]
  def change
    create_table :usuarios do |t|
      t.string :cpf, limit: 11, index: { unique: true }
      t.string :nome
      t.string :sobrenome
      t.date :nascimento
      t.string :login, index: { unique: true }
      t.string :senha_digest
      t.integer :tipo, limit: 2, default: 0

      t.timestamps
    end
  end
end

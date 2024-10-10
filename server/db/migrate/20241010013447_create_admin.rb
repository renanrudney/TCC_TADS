class CreateAdmin < ActiveRecord::Migration[7.2]
  def change
    create_table :admin do |t|
      t.references :usuario, index: { unique: true }
      t.timestamps
    end
  end
end

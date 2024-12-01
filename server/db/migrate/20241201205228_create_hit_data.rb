class CreateHitData < ActiveRecord::Migration[7.2]
  def change
    create_table :hit_data do |t|
      t.integer :hit_number
      t.timestamp :timestamp
      t.references :resultado_hitpoint, index: true
      t.timestamps
    end
  end
end

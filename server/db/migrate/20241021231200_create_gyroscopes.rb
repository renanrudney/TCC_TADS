class CreateGyroscopes < ActiveRecord::Migration[7.2]
  def change
    create_table :gyroscopes do |t|
      t.decimal :x_axis, precision: 30, scale: 25
      t.decimal :y_axis, precision: 30, scale: 25
      t.decimal :z_axis, precision: 30, scale: 25
      t.decimal :timestamp, precision: 30, scale: 25
      t.references :reference
      t.string :reference_type
      t.index ["reference_type", "reference_id"]

      t.timestamps
    end
  end
end

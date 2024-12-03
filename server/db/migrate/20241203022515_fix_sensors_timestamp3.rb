class FixSensorsTimestamp3 < ActiveRecord::Migration[7.2]
  def change
    remove_column(:accelerometers, :timestamp)
    remove_column(:gyroscopes, :timestamp)
    remove_column(:hit_data, :timestamp)
    add_column(:accelerometers, :timestamp, :string)
    add_column(:gyroscopes, :timestamp, :string)
    add_column(:hit_data, :timestamp, :string)
  end
end

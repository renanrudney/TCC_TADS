class UpDownArmResultado < ApplicationRecord
  self.table_name = "resultado_updownarm"
  has_many :accelerometers, as: :reference
  has_many :gyroscopes, as: :reference
  belongs_to :usuario, class_name: "Usuario::Base"

  accepts_nested_attributes_for :accelerometers, :gyroscopes

  private

  def autosave_associated_records_for_accelerometers
    return if accelerometers.empty?

    Accelerometer.insert_all(
      accelerometers.map { |a| a.attributes.slice(:x_axis, :y_axis, :z_axis, :timestamp) }, record_timestamps: true
    )
  end

  def autosave_associated_records_for_gyroscopes
    return if gyroscopes.empty?

    Gyroscope.insert_all(
      gyroscopes.map { |a| a.attributes.slice(:x_axis, :y_axis, :z_axis, :timestamp) }, record_timestamps: true
    )
  end
end

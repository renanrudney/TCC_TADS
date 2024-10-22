class Accelerometer < ApplicationRecord
  self.table_name = "accelerometers"
  belongs_to :reference, polymorphic: true
end

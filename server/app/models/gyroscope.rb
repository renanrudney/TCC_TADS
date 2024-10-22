class Gyroscope < ApplicationRecord
  self.table_name = "gyroscopes"
  belongs_to :reference, polymorphic: true
end

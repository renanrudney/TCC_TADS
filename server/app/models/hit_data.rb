class HitData < ApplicationRecord
  self.table_name = "hit_data"
  belongs_to :resultado, class_name: "HitpointResultado", optional: true
end

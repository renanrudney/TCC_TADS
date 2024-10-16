# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_10_10_013447) do
  create_table "admin", force: :cascade do |t|
    t.integer "usuario_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["usuario_id"], name: "index_admin_on_usuario_id", unique: true
  end

  create_table "resultado_hitpoint", force: :cascade do |t|
    t.integer "qtd_toque"
    t.integer "intervalo_toque"
    t.datetime "realizado"
    t.integer "usuario_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["usuario_id"], name: "index_resultado_hitpoint_on_usuario_id"
  end

  create_table "usu_comum", force: :cascade do |t|
    t.string "genero", limit: 1
    t.integer "nivel_sintoma", limit: 1
    t.integer "usuario_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["usuario_id"], name: "index_usu_comum_on_usuario_id", unique: true
  end

  create_table "usu_profissional", force: :cascade do |t|
    t.string "tipo_registro"
    t.string "registro"
    t.string "especialidade"
    t.integer "usuario_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["usuario_id"], name: "index_usu_profissional_on_usuario_id", unique: true
  end

  create_table "usuario", force: :cascade do |t|
    t.string "cpf", limit: 11
    t.string "nome"
    t.string "sobrenome"
    t.date "nascimento"
    t.string "login"
    t.string "senha_digest"
    t.integer "tipo", limit: 2, default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cpf"], name: "index_usuario_on_cpf", unique: true
    t.index ["login"], name: "index_usuario_on_login", unique: true
  end
end

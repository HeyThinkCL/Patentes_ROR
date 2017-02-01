# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170126174416) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "comunas", force: :cascade do |t|
    t.string    "nombre"
    t.geography "area",       limit: {:srid=>4326, :type=>"polygon", :geographic=>true}
    t.geography "ubicacion",  limit: {:srid=>4326, :type=>"point", :geographic=>true}
    t.datetime  "created_at",                                                            null: false
    t.datetime  "updated_at",                                                            null: false
  end

  create_table "locales", force: :cascade do |t|
    t.integer   "rol"
    t.integer   "pago"
    t.integer   "deuda"
    t.integer   "dia_1"
    t.integer   "dia_2"
    t.integer   "mes_1"
    t.integer   "mes_2"
    t.string    "direccion"
    t.string    "giro"
    t.boolean   "minimo",                                                                     default: false
    t.boolean   "deudor",                                                                     default: false
    t.boolean   "error",                                                                      default: false
    t.geography "ubicacion",         limit: {:srid=>4326, :type=>"point", :geographic=>true}
    t.integer   "patentes_id"
    t.integer   "representantes_id"
    t.integer   "usuarios_id"
    t.datetime  "created_at",                                                                                 null: false
    t.datetime  "updated_at",                                                                                 null: false
    t.index ["patentes_id"], name: "index_locales_on_patentes_id", using: :btree
    t.index ["representantes_id"], name: "index_locales_on_representantes_id", using: :btree
    t.index ["usuarios_id"], name: "index_locales_on_usuarios_id", using: :btree
  end

  create_table "metodos_pagos", force: :cascade do |t|
    t.string   "metodo"
    t.integer  "comision"
    t.datetime "fin_servicio"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "pagos", force: :cascade do |t|
    t.integer  "usuarios_id"
    t.integer  "local_id"
    t.integer  "metodos_pagos_id"
    t.integer  "pagado"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["local_id"], name: "index_pagos_on_local_id", using: :btree
    t.index ["metodos_pagos_id"], name: "index_pagos_on_metodos_pagos_id", using: :btree
    t.index ["usuarios_id"], name: "index_pagos_on_usuarios_id", using: :btree
  end

  create_table "patentes", force: :cascade do |t|
    t.string   "nombre"
    t.string   "tipo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "representantes", force: :cascade do |t|
    t.integer  "rut"
    t.string   "dv"
    t.string   "email"
    t.string   "passwd"
    t.string   "nombre_social"
    t.string   "nombre"
    t.string   "apellido"
    t.string   "telefono"
    t.string   "celular"
    t.integer  "usuarios_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["usuarios_id"], name: "index_representantes_on_usuarios_id", using: :btree
  end

  create_table "roles", force: :cascade do |t|
    t.string   "nombre"
    t.integer  "permiso"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "usuarios", force: :cascade do |t|
    t.string   "nombre"
    t.string   "apellido"
    t.integer  "rut"
    t.string   "email"
    t.string   "passwd"
    t.integer  "roles_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["roles_id"], name: "index_usuarios_on_roles_id", using: :btree
  end

  create_table "visitas", force: :cascade do |t|
    t.integer  "locales_id"
    t.integer  "usuarios_id"
    t.integer  "roles_id"
    t.datetime "futuro_pago"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["locales_id"], name: "index_visitas_on_locales_id", using: :btree
    t.index ["roles_id"], name: "index_visitas_on_roles_id", using: :btree
    t.index ["usuarios_id"], name: "index_visitas_on_usuarios_id", using: :btree
  end

  add_foreign_key "locales", "patentes", column: "patentes_id"
  add_foreign_key "locales", "representantes", column: "representantes_id"
  add_foreign_key "locales", "usuarios", column: "usuarios_id"
  add_foreign_key "pagos", "locales"
  add_foreign_key "pagos", "metodos_pagos", column: "metodos_pagos_id"
  add_foreign_key "pagos", "usuarios", column: "usuarios_id"
  add_foreign_key "representantes", "usuarios", column: "usuarios_id"
  add_foreign_key "usuarios", "roles", column: "roles_id"
  add_foreign_key "visitas", "locales", column: "locales_id"
  add_foreign_key "visitas", "roles", column: "roles_id"
  add_foreign_key "visitas", "usuarios", column: "usuarios_id"
end

# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format. Inflections
# are locale specific, and you may define rules for as many different
# locales as you wish. All of these examples are active by default:
ActiveSupport::Inflector.inflections(:en) do |inflect|
  # inflect.plural /^(ox)$/i, '\1en'
  # inflect.singular /^(ox)en/i, '\1'
  inflect.irregular 'local', 'locales'
  inflect.irregular 'usuario', 'usuarios'
  inflect.irregular 'rol', 'roles'
  inflect.irregular 'representante', 'representantes'
  inflect.irregular 'visita', 'visitas'
  inflect.irregular 'pago', 'pagos'
  inflect.irregular 'metodo_pago', 'metodos_pagos'
  inflect.irregular 'login', 'login'
  inflect.irregular 'densidad', 'densidades'
  inflect.irregular 'registrar_visita', 'registrar_visitas'
  inflect.irregular 'junta_vecinos', 'juntas_vecinos'
  inflect.irregular 'solicitud', 'solicitudes'

  # inflect.uncountable %w( fish sheep )
end

# These inflection rules are supported but not enabled by default:
# ActiveSupport::Inflector.inflections(:en) do |inflect|
#   inflect.acronym 'RESTful'
# end

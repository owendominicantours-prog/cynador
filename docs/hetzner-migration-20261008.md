# Cynador · migración a Hetzner

Producción comprobada antes de la migración: `cefb45fe9bdef80d500afa1b362822bdc420b731`.

Se mantienen todas las URLs, títulos, canonicals, galerías y formularios. La configuración privada conserva los accesos existentes. La imagen independiente incluye el sitio completo y sus archivos estáticos; no incluye archivos de entorno ni endpoints para exportar configuración.

El CRM usa `CRM_STORAGE_DIR` en Hetzner. El directorio debe persistir fuera del contenedor y pertenecer al usuario 1000. Se respaldó el CRM original antes de activar esta opción. Los archivos se escriben de forma atómica y las nuevas consultas se serializan para evitar perder registros simultáneos. Un archivo corrupto produce un error y no se reemplaza silenciosamente por datos vacíos. En Vercel se conserva el almacenamiento original mientras no se configure esta variable.

Validación: compilación Linux de 1.331 rutas; dos pruebas de persistencia, incluyendo 30 incorporaciones concurrentes; seis rutas públicas, JavaScript, schema, bloqueo de acceso anónimo al CRM, coincidencia del CRM con su respaldo y ausencia del endpoint de exportación. La revisión se realizó en localhost del servidor; no se enviaron correos ni se crearon prospectos de prueba en producción.

Antes del cambio de DNS: preparar HTTPS, comprobar el commit publicado, respaldar los registros DNS y actualizar el respaldo del CRM inmediatamente antes de la activación. Conservar Vercel como reversión hasta completar las comprobaciones públicas. No borrar proyectos ni datos antiguos durante esta migración.

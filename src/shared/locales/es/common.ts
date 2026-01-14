export default {
  actions: {
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    back: 'Volver',
    next: 'Siguiente',
    done: 'Listo',
    retry: 'Reintentar',
  },
  errors: {
    generic: 'Algo salió mal. Por favor, intenta de nuevo.',
    network: 'Error de conexión. Verifica tu internet.',
    notFound: 'No encontrado',
  },
  orderReceipt: {
    title: 'Confirmación de Estado de Orden',
    status: {
      filled: 'Orden Ejecutada',
      rejected: 'Orden Rechazada',
      pending: 'Orden Pendiente',
      default: 'Estado de Orden',
    },
    badge: {
      confirmed: 'CONFIRMADA',
      failed: 'FALLIDA',
      processing: 'PROCESANDO',
    },
    message: {
      filled:
        'Tu orden {{type}} para {{side}} {{ticker}} ha sido ejecutada completamente.',
      rejected: 'Tu orden {{type}} para {{side}} {{ticker}} fue rechazada.',
      pending:
        'Tu orden {{type}} para {{side}} {{ticker}} está siendo procesada.',
    },
    details: {
      orderId: 'ID de Orden',
      assetPair: 'Par de Activo',
      side: 'Lado',
      type: 'Tipo',
      quantity: 'Cantidad',
      avgPrice: 'Precio Promedio',
      shares: 'Acciones',
      order: 'Orden',
    },
    totalSpent: 'Total Gastado',
    backToMarkets: 'Regresar',
    viewPortfolio: 'Ver Portfolio',
  },
  toast: {
    favoriteAdded: 'Agregado a favoritos',
    favoriteRemoved: 'Eliminado de favoritos',
  },
};

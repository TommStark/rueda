export default {
  actions: {
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    clearAll: 'Limpiar todo',
    back: 'Volver',
    next: 'Siguiente',
    done: 'Listo',
    retry: 'Reintentar',
  },
  currency: {
    ars: 'ARS',
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
    values: {
      type: {
        market: 'mercado',
        limit: 'límite',
      },
      side: {
        buy: 'comprar',
        sell: 'vender',
      },
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
    screen: {
      missingIdTitle: 'No se pudo cargar el recibo',
      missingIdSubtitle: 'Falta el identificador de la orden.',
      loading: 'Cargando recibo…',
      notFound: 'Orden no encontrada',
      orderIdLabel: 'Order ID: {{orderId}}',
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
    viewPortfolio: 'Ir al home',
  },
  toast: {
    favoriteAdded: 'Agregado a favoritos',
    favoriteRemoved: 'Eliminado de favoritos',
    favoriteUpdateError: 'No se pudo actualizar el favorito.',
    storageLoadFailed: 'No se pudieron cargar los datos guardados.',
    storageSaveFailed: 'No se pudieron guardar los cambios.',
    storageClearFailed: 'No se pudieron limpiar los datos guardados.',
    debugActivated: 'Modo debug activado',
    dataCleared: 'Datos eliminados',
  },
};

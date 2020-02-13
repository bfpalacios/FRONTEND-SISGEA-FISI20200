export interface HelpText{
  textoFuncion?: string,
  isTextOnly?: boolean,
  isVideoOnly?: boolean
  isGIFOnly?: boolean
  pathGIF?: string
}

export const HELPS = {
  TIPO_CAMBIO: { isTextOnly: true, textoFuncion: 'Mantendor del tipo de cambio de un día específico', textoRestricciones: 'Solo se puede agregar un tipo de cambio por dia'}
}

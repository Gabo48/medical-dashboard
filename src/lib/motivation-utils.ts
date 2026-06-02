/**
 * Motivation utilities based on Readiness Ruler scale (1-5)
 * Based on Prochaska's Transtheoretical Model of Change
 */

export type MotivationLevel = 1 | 2 | 3 | 4 | 5

/**
 * Returns a short label for the motivation level
 */
export function getMotivationLabel(value: number): string {
  switch (value) {
    case 1:
      return "No preparado"
    case 2:
      return "Pensando"
    case 3:
      return "Quiere cambiar"
    case 4:
      return "Preparandose"
    case 5:
      return "Activo"
    default:
      return ""
  }
}

/**
 * Returns a detailed description of the patient's motivation state
 */
export function getMotivationDescription(value: number): string {
  switch (value) {
    case 1:
      return "El paciente no esta nada preparado para cambiar."
    case 2:
      return "El paciente esta pensando en cambiar, pero no ahora."
    case 3:
      return "El paciente quiere cambiar, pero no sabe como."
    case 4:
      return "El paciente se esta preparando para cambiar."
    case 5:
      return "El paciente esta tomando medidas activamente."
    default:
      return ""
  }
}

/**
 * Returns Tailwind classes for motivation level badge styling
 */
export function getMotivationColorClass(value: number): string {
  if (value >= 4) return "bg-success/20 text-success"
  if (value >= 3) return "bg-warning/20 text-warning"
  return "bg-destructive/20 text-destructive"
}

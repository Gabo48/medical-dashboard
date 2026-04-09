export interface Patient {
  id: string
  name: string
  age: number
  gender: "M" | "F"
  weight: number
  height: number
  initialWeight: number
  bmi: number
  initialBmi: number
  bmiChange: number
  adherence: number
  mood: number
  motivation: number
  appointmentsAttended: number
  appointmentsTotal: number
  appointmentRate: number
  cancelledEvents: number
  missedEvents: number
  symptomsCount: number
  symptomsSeverity: number
  abandonmentRisk: number
  treatmentRisk: number
  lastInteraction: string
  messagesCount: number
  treatmentDays: number
  avatar: string
}

export interface WeightHistory {
  date: string
  weight: number
  bmi: number
}

export interface AdherenceHistory {
  date: string
  adherence: number
}

export interface MoodHistory {
  date: string
  mood: number
  motivation: number
}

export interface SymptomReport {
  id: string
  patientId: string
  symptom: string
  severity: 1 | 2 | 3
  date: string
}

export const patients: Patient[] = [
  {
    id: "P001",
    name: "María García",
    age: 45,
    gender: "F",
    weight: 92,
    height: 1.65,
    initialWeight: 105,
    bmi: 33.8,
    initialBmi: 38.6,
    bmiChange: -12.4,
    adherence: 87,
    mood: 4,
    motivation: 4,
    appointmentsAttended: 12,
    appointmentsTotal: 14,
    appointmentRate: 86,
    cancelledEvents: 1,
    missedEvents: 1,
    symptomsCount: 2,
    symptomsSeverity: 1.5,
    abandonmentRisk: 1,
    treatmentRisk: 2,
    lastInteraction: "2024-01-15",
    messagesCount: 156,
    treatmentDays: 90,
    avatar: "MG"
  },
  {
    id: "P002",
    name: "Carlos Rodríguez",
    age: 52,
    gender: "M",
    weight: 118,
    height: 1.78,
    initialWeight: 125,
    bmi: 37.3,
    initialBmi: 39.5,
    bmiChange: -5.6,
    adherence: 65,
    mood: 3,
    motivation: 2,
    appointmentsAttended: 8,
    appointmentsTotal: 12,
    appointmentRate: 67,
    cancelledEvents: 2,
    missedEvents: 2,
    symptomsCount: 4,
    symptomsSeverity: 2.2,
    abandonmentRisk: 4,
    treatmentRisk: 3,
    lastInteraction: "2024-01-10",
    messagesCount: 45,
    treatmentDays: 75,
    avatar: "CR"
  },
  {
    id: "P003",
    name: "Ana Martínez",
    age: 38,
    gender: "F",
    weight: 78,
    height: 1.60,
    initialWeight: 95,
    bmi: 30.5,
    initialBmi: 37.1,
    bmiChange: -17.8,
    adherence: 95,
    mood: 5,
    motivation: 5,
    appointmentsAttended: 16,
    appointmentsTotal: 16,
    appointmentRate: 100,
    cancelledEvents: 0,
    missedEvents: 0,
    symptomsCount: 0,
    symptomsSeverity: 0,
    abandonmentRisk: 1,
    treatmentRisk: 1,
    lastInteraction: "2024-01-15",
    messagesCount: 234,
    treatmentDays: 120,
    avatar: "AM"
  },
  {
    id: "P004",
    name: "Roberto Sánchez",
    age: 61,
    gender: "M",
    weight: 102,
    height: 1.72,
    initialWeight: 108,
    bmi: 34.5,
    initialBmi: 36.5,
    bmiChange: -5.5,
    adherence: 72,
    mood: 3,
    motivation: 3,
    appointmentsAttended: 9,
    appointmentsTotal: 11,
    appointmentRate: 82,
    cancelledEvents: 1,
    missedEvents: 1,
    symptomsCount: 3,
    symptomsSeverity: 2.0,
    abandonmentRisk: 3,
    treatmentRisk: 3,
    lastInteraction: "2024-01-14",
    messagesCount: 78,
    treatmentDays: 60,
    avatar: "RS"
  },
  {
    id: "P005",
    name: "Laura Fernández",
    age: 29,
    gender: "F",
    weight: 85,
    height: 1.68,
    initialWeight: 85,
    bmi: 30.1,
    initialBmi: 30.1,
    bmiChange: 0,
    adherence: 45,
    mood: 2,
    motivation: 2,
    appointmentsAttended: 3,
    appointmentsTotal: 8,
    appointmentRate: 38,
    cancelledEvents: 3,
    missedEvents: 2,
    symptomsCount: 5,
    symptomsSeverity: 2.5,
    abandonmentRisk: 5,
    treatmentRisk: 4,
    lastInteraction: "2024-01-05",
    messagesCount: 12,
    treatmentDays: 45,
    avatar: "LF"
  },
  {
    id: "P006",
    name: "Miguel Torres",
    age: 48,
    gender: "M",
    weight: 95,
    height: 1.75,
    initialWeight: 110,
    bmi: 31.0,
    initialBmi: 35.9,
    bmiChange: -13.6,
    adherence: 82,
    mood: 4,
    motivation: 4,
    appointmentsAttended: 14,
    appointmentsTotal: 15,
    appointmentRate: 93,
    cancelledEvents: 1,
    missedEvents: 0,
    symptomsCount: 1,
    symptomsSeverity: 1.0,
    abandonmentRisk: 2,
    treatmentRisk: 2,
    lastInteraction: "2024-01-15",
    messagesCount: 189,
    treatmentDays: 100,
    avatar: "MT"
  }
]

export const getWeightHistory = (patientId: string): WeightHistory[] => {
  const baseData = [
    { weeks: 0, weightDiff: 0, bmiDiff: 0 },
    { weeks: 2, weightDiff: -1.5, bmiDiff: -0.5 },
    { weeks: 4, weightDiff: -3, bmiDiff: -1.0 },
    { weeks: 6, weightDiff: -4.5, bmiDiff: -1.5 },
    { weeks: 8, weightDiff: -6, bmiDiff: -2.0 },
    { weeks: 10, weightDiff: -8, bmiDiff: -2.7 },
    { weeks: 12, weightDiff: -10, bmiDiff: -3.4 },
  ]

  const patient = patients.find(p => p.id === patientId)
  if (!patient) return []

  const multiplier = patientId === "P005" ? 0 : patientId === "P002" ? 0.5 : 1

  return baseData.map((d, i) => ({
    date: `Sem ${d.weeks}`,
    weight: patient.initialWeight + (d.weightDiff * multiplier),
    bmi: patient.initialBmi + (d.bmiDiff * multiplier)
  }))
}

export const getAdherenceHistory = (patientId: string): AdherenceHistory[] => {
  const patient = patients.find(p => p.id === patientId)
  if (!patient) return []

  const variance = patient.adherence > 80 ? 5 : patient.adherence > 60 ? 15 : 25

  return Array.from({ length: 12 }, (_, i) => ({
    date: `Sem ${i + 1}`,
    adherence: Math.max(0, Math.min(100, patient.adherence + (Math.random() - 0.5) * variance * 2))
  }))
}

export interface DailyAdherence {
  date: string
  adherence: number
  completed: boolean
}

export const getDailyAdherenceHistory = (patientId: string): DailyAdherence[] => {
  const patient = patients.find(p => p.id === patientId)
  if (!patient) return []

  const baseAdherence = patient.adherence
  const variance = patient.adherence > 80 ? 10 : patient.adherence > 60 ? 20 : 30

  return Array.from({ length: 30 }, (_, i) => {
    const day = 30 - i
    const adherenceValue = Math.max(0, Math.min(100, baseAdherence + (Math.random() - 0.5) * variance))
    return {
      date: `Día ${day}`,
      adherence: Math.round(adherenceValue),
      completed: adherenceValue >= 50
    }
  }).reverse()
}

export interface WeeklyAdherence {
  week: string
  adherence: number
  target: number
}

export const getWeeklyAdherenceHistory = (patientId: string): WeeklyAdherence[] => {
  const patient = patients.find(p => p.id === patientId)
  if (!patient) return []

  const baseAdherence = patient.adherence
  const variance = patient.adherence > 80 ? 8 : patient.adherence > 60 ? 15 : 25

  return Array.from({ length: 8 }, (_, i) => ({
    week: `Sem ${i + 1}`,
    adherence: Math.round(Math.max(0, Math.min(100, baseAdherence + (Math.random() - 0.5) * variance))),
    target: 80
  }))
}

export interface SideEffectReport {
  name: string
  count: number
  severity: "mild" | "moderate" | "severe"
}

export const getSideEffectsReport = (patientId: string): SideEffectReport[] => {
  const patientSymptoms = getPatientSymptoms(patientId)
  
  const grouped = patientSymptoms.reduce((acc, s) => {
    if (!acc[s.symptom]) {
      acc[s.symptom] = { count: 0, maxSeverity: s.severity }
    }
    acc[s.symptom].count++
    if (s.severity > acc[s.symptom].maxSeverity) {
      acc[s.symptom].maxSeverity = s.severity
    }
    return acc
  }, {} as Record<string, { count: number; maxSeverity: number }>)

  return Object.entries(grouped).map(([name, data]) => ({
    name,
    count: data.count,
    severity: data.maxSeverity === 1 ? "mild" : data.maxSeverity === 2 ? "moderate" : "severe"
  })).sort((a, b) => b.count - a.count)
}

export const getMoodHistory = (patientId: string): MoodHistory[] => {
  const patient = patients.find(p => p.id === patientId)
  if (!patient) return []

  return Array.from({ length: 14 }, (_, i) => ({
    date: `Día ${i + 1}`,
    mood: Math.max(1, Math.min(5, patient.mood + (Math.random() - 0.5) * 2)),
    motivation: Math.max(1, Math.min(5, patient.motivation + (Math.random() - 0.5) * 2))
  }))
}

export const symptoms: SymptomReport[] = [
  { id: "S001", patientId: "P001", symptom: "Náuseas leves", severity: 1, date: "2024-01-14" },
  { id: "S002", patientId: "P001", symptom: "Fatiga", severity: 2, date: "2024-01-12" },
  { id: "S003", patientId: "P002", symptom: "Mareos", severity: 2, date: "2024-01-13" },
  { id: "S004", patientId: "P002", symptom: "Dolor de cabeza", severity: 2, date: "2024-01-11" },
  { id: "S005", patientId: "P002", symptom: "Estreñimiento", severity: 2, date: "2024-01-10" },
  { id: "S006", patientId: "P002", symptom: "Insomnio", severity: 3, date: "2024-01-09" },
  { id: "S007", patientId: "P004", symptom: "Náuseas", severity: 2, date: "2024-01-14" },
  { id: "S008", patientId: "P004", symptom: "Fatiga", severity: 2, date: "2024-01-13" },
  { id: "S009", patientId: "P004", symptom: "Diarrea", severity: 2, date: "2024-01-11" },
  { id: "S010", patientId: "P005", symptom: "Náuseas severas", severity: 3, date: "2024-01-05" },
  { id: "S011", patientId: "P005", symptom: "Vómitos", severity: 3, date: "2024-01-04" },
  { id: "S012", patientId: "P005", symptom: "Fatiga extrema", severity: 3, date: "2024-01-03" },
  { id: "S013", patientId: "P005", symptom: "Dolor abdominal", severity: 2, date: "2024-01-02" },
  { id: "S014", patientId: "P005", symptom: "Mareos", severity: 2, date: "2024-01-01" },
  { id: "S015", patientId: "P006", symptom: "Fatiga leve", severity: 1, date: "2024-01-10" },
]

export const getPatientSymptoms = (patientId: string) => 
  symptoms.filter(s => s.patientId === patientId)

export interface PatientInteraction {
  id: string
  patientId: string
  summary: string
  date: string
  type: "medication_report" | "symptom_report" | "appointment" | "chat" | "weight_log" | "mood_log"
  result: "completed" | "skipped" | "error" | "pending"
}

const interactionTypes = {
  medication_report: "Reporte de medicamento",
  symptom_report: "Reporte de síntomas",
  appointment: "Cita médica",
  chat: "Conversación",
  weight_log: "Registro de peso",
  mood_log: "Registro de ánimo"
}

const interactionResults = {
  completed: "Completado",
  skipped: "Omitido",
  error: "Error",
  pending: "Pendiente"
}

export const patientInteractions: PatientInteraction[] = [
  { id: "I001", patientId: "P001", summary: "Tomé mi dosis de la mañana sin problemas", date: "2024-01-15", type: "medication_report", result: "completed" },
  { id: "I002", patientId: "P001", summary: "Me siento con más energía hoy", date: "2024-01-15", type: "mood_log", result: "completed" },
  { id: "I003", patientId: "P001", summary: "Registré mi peso: 92kg", date: "2024-01-14", type: "weight_log", result: "completed" },
  { id: "I004", patientId: "P001", summary: "Consulta de seguimiento con Dr. Pérez", date: "2024-01-12", type: "appointment", result: "completed" },
  { id: "I005", patientId: "P002", summary: "Olvidé tomar la dosis de la noche", date: "2024-01-10", type: "medication_report", result: "skipped" },
  { id: "I006", patientId: "P002", summary: "Reporté mareos después del almuerzo", date: "2024-01-10", type: "symptom_report", result: "completed" },
  { id: "I007", patientId: "P002", summary: "No pude asistir a la cita", date: "2024-01-08", type: "appointment", result: "skipped" },
  { id: "I008", patientId: "P002", summary: "Pregunté sobre efectos secundarios", date: "2024-01-07", type: "chat", result: "completed" },
  { id: "I009", patientId: "P003", summary: "Completé mi rutina de ejercicios", date: "2024-01-15", type: "chat", result: "completed" },
  { id: "I010", patientId: "P003", summary: "Peso actual: 78kg, muy contenta", date: "2024-01-15", type: "weight_log", result: "completed" },
  { id: "I011", patientId: "P003", summary: "Todas las dosis completadas esta semana", date: "2024-01-14", type: "medication_report", result: "completed" },
  { id: "I012", patientId: "P003", summary: "Cita de control nutricional", date: "2024-01-13", type: "appointment", result: "completed" },
  { id: "I013", patientId: "P004", summary: "Tuve náuseas pero tomé el medicamento", date: "2024-01-14", type: "medication_report", result: "completed" },
  { id: "I014", patientId: "P004", summary: "Error al sincronizar datos de peso", date: "2024-01-13", type: "weight_log", result: "error" },
  { id: "I015", patientId: "P004", summary: "Reporté fatiga durante el día", date: "2024-01-12", type: "symptom_report", result: "completed" },
  { id: "I016", patientId: "P005", summary: "No me sentí bien para registrar", date: "2024-01-05", type: "medication_report", result: "skipped" },
  { id: "I017", patientId: "P005", summary: "Vómitos severos reportados", date: "2024-01-04", type: "symptom_report", result: "completed" },
  { id: "I018", patientId: "P005", summary: "Cancelé mi cita por malestar", date: "2024-01-03", type: "appointment", result: "skipped" },
  { id: "I019", patientId: "P005", summary: "Solicité hablar con un médico", date: "2024-01-02", type: "chat", result: "pending" },
  { id: "I020", patientId: "P006", summary: "Todo bien con la medicación", date: "2024-01-15", type: "medication_report", result: "completed" },
  { id: "I021", patientId: "P006", summary: "Mi ánimo está muy positivo", date: "2024-01-15", type: "mood_log", result: "completed" },
  { id: "I022", patientId: "P006", summary: "Registré 95kg, sigo bajando", date: "2024-01-14", type: "weight_log", result: "completed" },
]

export const getPatientInteractions = (patientId: string): PatientInteraction[] => {
  return patientInteractions
    .filter(i => i.patientId === patientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getInteractionTypeLabel = (type: PatientInteraction["type"]) => interactionTypes[type]
export const getInteractionResultLabel = (result: PatientInteraction["result"]) => interactionResults[result]

// Patient Intent Types
export type PatientIntentType = 
  | "report_adherence"
  | "report_non_adherence"
  | "report_symptom"
  | "negative_emotion"
  | "positive_emotion"
  | "show_resistance"
  | "request_help"
  | "express_doubt"
  | "confirm"
  | "partial_response"

export interface PatientIntentData {
  intent: PatientIntentType
  label: string
  count: number
  percentage: number
}

const intentLabels: Record<PatientIntentType, string> = {
  report_adherence: "Reportar adherencia",
  report_non_adherence: "Reportar no adherencia",
  report_symptom: "Reportar síntoma",
  negative_emotion: "Expresar emoción negativa",
  positive_emotion: "Expresar emoción positiva",
  show_resistance: "Mostrar resistencia",
  request_help: "Solicitar ayuda",
  express_doubt: "Expresar duda",
  confirm: "Confirmar",
  partial_response: "Responder parcialmente"
}

export const getPatientIntents = (patientId: string): PatientIntentData[] => {
  const patient = patients.find(p => p.id === patientId)
  if (!patient) return []

  // Generate intent distribution based on patient profile
  const totalMessages = patient.messagesCount
  const isHighAdherence = patient.adherence >= 80
  const isPositiveMood = patient.mood >= 4

  // Base distribution varies by patient profile
  const baseDistribution: Record<PatientIntentType, number> = {
    report_adherence: isHighAdherence ? 0.25 : 0.10,
    report_non_adherence: isHighAdherence ? 0.05 : 0.15,
    report_symptom: patient.symptomsCount > 2 ? 0.15 : 0.08,
    negative_emotion: isPositiveMood ? 0.05 : 0.15,
    positive_emotion: isPositiveMood ? 0.15 : 0.05,
    show_resistance: patient.abandonmentRisk >= 4 ? 0.10 : 0.03,
    request_help: 0.10,
    express_doubt: isHighAdherence ? 0.05 : 0.12,
    confirm: 0.15,
    partial_response: 0.07
  }

  // Normalize to 100%
  const total = Object.values(baseDistribution).reduce((a, b) => a + b, 0)
  
  return Object.entries(baseDistribution).map(([intent, ratio]) => {
    const normalizedRatio = ratio / total
    const count = Math.round(totalMessages * normalizedRatio)
    return {
      intent: intent as PatientIntentType,
      label: intentLabels[intent as PatientIntentType],
      count,
      percentage: Math.round(normalizedRatio * 100)
    }
  }).sort((a, b) => b.count - a.count)
}

export const getIntentLabel = (intent: PatientIntentType) => intentLabels[intent]

// Medical Events Frequency
export interface MedicalEventFrequency {
  eventsPerWeek: number
  scheduledEvents: number
  completedEvents: number
}

export const getMedicalEventFrequency = (patientId: string): MedicalEventFrequency => {
  const patient = patients.find(p => p.id === patientId)
  if (!patient) return { eventsPerWeek: 0, scheduledEvents: 0, completedEvents: 0 }

  const weeksInTreatment = Math.ceil(patient.treatmentDays / 7)
  const totalEvents = patient.appointmentsTotal + Math.floor(patient.treatmentDays / 7) * 2 // appointments + weekly check-ins
  
  return {
    eventsPerWeek: Math.round((totalEvents / weeksInTreatment) * 10) / 10,
    scheduledEvents: totalEvents,
    completedEvents: patient.appointmentsAttended + Math.floor(patient.adherence / 100 * patient.treatmentDays / 7) * 2
  }
}

export const aggregateMetrics = () => {
  const total = patients.length
  const avgAdherence = patients.reduce((sum, p) => sum + p.adherence, 0) / total
  const avgBmiChange = patients.reduce((sum, p) => sum + p.bmiChange, 0) / total
  const criticalPatients = patients.filter(p => p.abandonmentRisk >= 4 || p.treatmentRisk >= 4).length
  const totalSymptoms = patients.reduce((sum, p) => sum + p.symptomsCount, 0)
  const avgMood = patients.reduce((sum, p) => sum + p.mood, 0) / total
  const avgMotivation = patients.reduce((sum, p) => sum + p.motivation, 0) / total

  return {
    totalPatients: total,
    avgAdherence: Math.round(avgAdherence),
    avgBmiChange: avgBmiChange.toFixed(1),
    criticalPatients,
    totalSymptoms,
    avgMood: avgMood.toFixed(1),
    avgMotivation: avgMotivation.toFixed(1)
  }
}

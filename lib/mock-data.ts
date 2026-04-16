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

// ============================================
// NEW ENTITIES: Clinical Records, Medication Plans, Messages, Caregivers
// ============================================

// Caregiver (Red de Apoyo)
export interface Caregiver {
  id: string
  patientId: string
  name: string
  relationship: "spouse" | "parent" | "child" | "sibling" | "friend" | "other"
  phone: string
  email: string
  isPrimary: boolean
}

export const caregivers: Caregiver[] = [
  { id: "CG001", patientId: "P001", name: "Juan García", relationship: "spouse", phone: "+52 555 123 4567", email: "juan.garcia@email.com", isPrimary: true },
  { id: "CG002", patientId: "P001", name: "Sofia García", relationship: "child", phone: "+52 555 234 5678", email: "sofia.garcia@email.com", isPrimary: false },
  { id: "CG003", patientId: "P002", name: "Elena Rodríguez", relationship: "spouse", phone: "+52 555 345 6789", email: "elena.rodriguez@email.com", isPrimary: true },
  { id: "CG004", patientId: "P003", name: "Pedro Martínez", relationship: "parent", phone: "+52 555 456 7890", email: "pedro.martinez@email.com", isPrimary: true },
  { id: "CG005", patientId: "P004", name: "Carmen Sánchez", relationship: "spouse", phone: "+52 555 567 8901", email: "carmen.sanchez@email.com", isPrimary: true },
  { id: "CG006", patientId: "P005", name: "Roberto Fernández", relationship: "parent", phone: "+52 555 678 9012", email: "roberto.fernandez@email.com", isPrimary: true },
  { id: "CG007", patientId: "P005", name: "María Fernández", relationship: "parent", phone: "+52 555 789 0123", email: "maria.fernandez@email.com", isPrimary: false },
  { id: "CG008", patientId: "P006", name: "Laura Torres", relationship: "spouse", phone: "+52 555 890 1234", email: "laura.torres@email.com", isPrimary: true },
]

export const getPatientCaregivers = (patientId: string): Caregiver[] => 
  caregivers.filter(c => c.patientId === patientId)

export const getRelationshipLabel = (rel: Caregiver["relationship"]): string => {
  const labels = {
    spouse: "Cónyuge",
    parent: "Padre/Madre",
    child: "Hijo/a",
    sibling: "Hermano/a",
    friend: "Amigo/a",
    other: "Otro"
  }
  return labels[rel]
}

// Clinical Record (Ficha Clínica)
export interface ClinicalRecord {
  id: string
  patientId: string
  recordDate: string
  diagnosis: string
  comorbidities: string[]
  allergies: string[]
  bloodType: string
  notes: string
  externalSystemId?: string
  importedAt?: string
  lastUpdated: string
  physician: string
}

export const clinicalRecords: ClinicalRecord[] = [
  {
    id: "CR001",
    patientId: "P001",
    recordDate: "2023-10-15",
    diagnosis: "Obesidad grado I (IMC 30-34.9)",
    comorbidities: ["Hipertensión arterial", "Prediabetes"],
    allergies: ["Penicilina"],
    bloodType: "O+",
    notes: "Paciente con antecedentes familiares de diabetes tipo 2. Inicia tratamiento farmacológico con seguimiento quincenal.",
    externalSystemId: "EXT-2023-45678",
    importedAt: "2023-10-15T10:30:00",
    lastUpdated: "2024-01-15",
    physician: "Dr. Juan Pérez"
  },
  {
    id: "CR002",
    patientId: "P002",
    recordDate: "2023-11-01",
    diagnosis: "Obesidad grado II (IMC 35-39.9)",
    comorbidities: ["Diabetes tipo 2", "Apnea del sueño", "Artrosis de rodilla"],
    allergies: [],
    bloodType: "A+",
    notes: "Paciente con múltiples comorbilidades. Requiere monitoreo frecuente de glucosa. Considerar cirugía bariátrica si no hay respuesta al tratamiento en 6 meses.",
    externalSystemId: "EXT-2023-56789",
    importedAt: "2023-11-01T14:15:00",
    lastUpdated: "2024-01-10",
    physician: "Dr. Juan Pérez"
  },
  {
    id: "CR003",
    patientId: "P003",
    recordDate: "2023-09-20",
    diagnosis: "Obesidad grado I (IMC 30-34.9)",
    comorbidities: [],
    allergies: ["Sulfas"],
    bloodType: "B+",
    notes: "Excelente respuesta al tratamiento. Paciente muy motivada y comprometida con cambios de estilo de vida.",
    externalSystemId: "EXT-2023-34567",
    importedAt: "2023-09-20T09:00:00",
    lastUpdated: "2024-01-15",
    physician: "Dr. Juan Pérez"
  },
  {
    id: "CR004",
    patientId: "P004",
    recordDate: "2023-11-15",
    diagnosis: "Obesidad grado I (IMC 30-34.9)",
    comorbidities: ["Hipertensión arterial", "Hipotiroidismo"],
    allergies: ["Ibuprofeno"],
    bloodType: "AB+",
    notes: "Paciente de edad avanzada, requiere ajustes de dosis más conservadores. Monitorear función tiroidea.",
    lastUpdated: "2024-01-14",
    physician: "Dr. Juan Pérez"
  },
  {
    id: "CR005",
    patientId: "P005",
    recordDate: "2023-12-01",
    diagnosis: "Obesidad grado I (IMC 30-34.9)",
    comorbidities: ["Ansiedad", "Depresión leve"],
    allergies: [],
    bloodType: "O-",
    notes: "Paciente con componente emocional importante. Derivada a psicología para manejo conjunto. Alta incidencia de efectos secundarios.",
    lastUpdated: "2024-01-05",
    physician: "Dr. Juan Pérez"
  },
  {
    id: "CR006",
    patientId: "P006",
    recordDate: "2023-10-01",
    diagnosis: "Obesidad grado I (IMC 30-34.9)",
    comorbidities: ["Dislipidemia"],
    allergies: [],
    bloodType: "A-",
    notes: "Buena evolución. Lípidos mejorando con la pérdida de peso. Continuar con plan actual.",
    externalSystemId: "EXT-2023-23456",
    importedAt: "2023-10-01T11:45:00",
    lastUpdated: "2024-01-15",
    physician: "Dr. Juan Pérez"
  }
]

export const getPatientClinicalRecord = (patientId: string): ClinicalRecord | null => 
  clinicalRecords.find(r => r.patientId === patientId) || null

// Medication Plan
export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  schedule: string[]
  startDate: string
  endDate?: string
  instructions: string
  isActive: boolean
}

export interface MedicationPlan {
  id: string
  patientId: string
  medications: Medication[]
  createdAt: string
  updatedAt: string
  updatedBy: string
  notes: string
}

export const medicationPlans: MedicationPlan[] = [
  {
    id: "MP001",
    patientId: "P001",
    medications: [
      { id: "M001", name: "Semaglutida", dosage: "0.5mg", frequency: "Semanal", schedule: ["Lunes 08:00"], startDate: "2023-10-15", instructions: "Inyección subcutánea. Aplicar en abdomen, muslo o brazo.", isActive: true },
      { id: "M002", name: "Metformina", dosage: "850mg", frequency: "Diario", schedule: ["08:00", "20:00"], startDate: "2023-10-15", instructions: "Tomar con alimentos.", isActive: true }
    ],
    createdAt: "2023-10-15",
    updatedAt: "2024-01-10",
    updatedBy: "Dr. Juan Pérez",
    notes: "Paciente tolera bien la medicación. Considerar aumentar semaglutida a 1mg en próxima visita."
  },
  {
    id: "MP002",
    patientId: "P002",
    medications: [
      { id: "M003", name: "Semaglutida", dosage: "1.0mg", frequency: "Semanal", schedule: ["Miércoles 09:00"], startDate: "2023-11-01", instructions: "Inyección subcutánea.", isActive: true },
      { id: "M004", name: "Metformina", dosage: "1000mg", frequency: "Diario", schedule: ["07:00", "13:00", "20:00"], startDate: "2023-11-01", instructions: "Tomar con alimentos principales.", isActive: true },
      { id: "M005", name: "Atorvastatina", dosage: "20mg", frequency: "Diario", schedule: ["22:00"], startDate: "2023-11-01", instructions: "Tomar antes de dormir.", isActive: true }
    ],
    createdAt: "2023-11-01",
    updatedAt: "2024-01-08",
    updatedBy: "Dr. Juan Pérez",
    notes: "Paciente reporta mareos. Monitorear y considerar reducir dosis si persisten."
  },
  {
    id: "MP003",
    patientId: "P003",
    medications: [
      { id: "M006", name: "Semaglutida", dosage: "1.7mg", frequency: "Semanal", schedule: ["Viernes 07:00"], startDate: "2023-09-20", instructions: "Inyección subcutánea.", isActive: true }
    ],
    createdAt: "2023-09-20",
    updatedAt: "2024-01-12",
    updatedBy: "Dr. Juan Pérez",
    notes: "Excelente tolerancia. Dosis máxima alcanzada con muy buenos resultados."
  },
  {
    id: "MP004",
    patientId: "P004",
    medications: [
      { id: "M007", name: "Semaglutida", dosage: "0.5mg", frequency: "Semanal", schedule: ["Sábado 08:00"], startDate: "2023-11-15", instructions: "Inyección subcutánea. Iniciar con dosis baja por edad.", isActive: true },
      { id: "M008", name: "Levotiroxina", dosage: "75mcg", frequency: "Diario", schedule: ["06:00"], startDate: "2023-06-01", instructions: "Tomar en ayunas, 30 min antes del desayuno.", isActive: true },
      { id: "M009", name: "Losartán", dosage: "50mg", frequency: "Diario", schedule: ["08:00"], startDate: "2023-03-15", instructions: "Tomar con o sin alimentos.", isActive: true }
    ],
    createdAt: "2023-11-15",
    updatedAt: "2024-01-14",
    updatedBy: "Dr. Juan Pérez",
    notes: "Mantener dosis conservadora de semaglutida. Buen control de tiroides y presión arterial."
  },
  {
    id: "MP005",
    patientId: "P005",
    medications: [
      { id: "M010", name: "Semaglutida", dosage: "0.25mg", frequency: "Semanal", schedule: ["Domingo 09:00"], startDate: "2023-12-01", instructions: "Dosis mínima por intolerancia.", isActive: true },
      { id: "M011", name: "Omeprazol", dosage: "20mg", frequency: "Diario", schedule: ["07:00"], startDate: "2023-12-15", instructions: "Tomar en ayunas para protección gástrica.", isActive: true }
    ],
    createdAt: "2023-12-01",
    updatedAt: "2024-01-05",
    updatedBy: "Dr. Juan Pérez",
    notes: "PRECAUCIÓN: Paciente con múltiples efectos secundarios. No aumentar dosis sin evaluación presencial."
  },
  {
    id: "MP006",
    patientId: "P006",
    medications: [
      { id: "M012", name: "Semaglutida", dosage: "1.0mg", frequency: "Semanal", schedule: ["Martes 08:00"], startDate: "2023-10-01", instructions: "Inyección subcutánea.", isActive: true },
      { id: "M013", name: "Rosuvastatina", dosage: "10mg", frequency: "Diario", schedule: ["22:00"], startDate: "2023-10-01", instructions: "Tomar antes de dormir.", isActive: true }
    ],
    createdAt: "2023-10-01",
    updatedAt: "2024-01-15",
    updatedBy: "Dr. Juan Pérez",
    notes: "Buena evolución. Lípidos controlados. Considerar aumentar a 1.7mg si estanca pérdida de peso."
  }
]

export const getPatientMedicationPlan = (patientId: string): MedicationPlan | null =>
  medicationPlans.find(p => p.patientId === patientId) || null

// Messages
export type MessageRecipientType = "patient" | "caregiver"
export type MessageStatus = "sent" | "delivered" | "read" | "failed"
export type MessageChannel = "app" | "sms" | "email"

export interface Message {
  id: string
  patientId: string
  recipientType: MessageRecipientType
  recipientId: string
  recipientName: string
  channel: MessageChannel
  subject: string
  content: string
  sentAt: string
  status: MessageStatus
  sentBy: string
}

export const messages: Message[] = [
  { id: "MSG001", patientId: "P001", recipientType: "patient", recipientId: "P001", recipientName: "María García", channel: "app", subject: "Recordatorio de cita", content: "Recuerde su cita de seguimiento mañana a las 10:00 AM.", sentAt: "2024-01-14T08:00:00", status: "read", sentBy: "Dr. Juan Pérez" },
  { id: "MSG002", patientId: "P001", recipientType: "caregiver", recipientId: "CG001", recipientName: "Juan García", channel: "sms", subject: "Actualización de progreso", content: "María está mostrando excelente progreso en su tratamiento. Continúen apoyándola.", sentAt: "2024-01-10T15:30:00", status: "delivered", sentBy: "Dr. Juan Pérez" },
  { id: "MSG003", patientId: "P002", recipientType: "patient", recipientId: "P002", recipientName: "Carlos Rodríguez", channel: "app", subject: "Seguimiento de síntomas", content: "Hemos notado reportes de mareos. Por favor agende una consulta lo antes posible.", sentAt: "2024-01-11T09:15:00", status: "read", sentBy: "Dr. Juan Pérez" },
  { id: "MSG004", patientId: "P002", recipientType: "caregiver", recipientId: "CG003", recipientName: "Elena Rodríguez", channel: "email", subject: "Alerta de adherencia", content: "Carlos ha tenido dificultades con la adherencia al tratamiento. Su apoyo es fundamental.", sentAt: "2024-01-09T11:00:00", status: "read", sentBy: "Dr. Juan Pérez" },
  { id: "MSG005", patientId: "P003", recipientType: "patient", recipientId: "P003", recipientName: "Ana Martínez", channel: "app", subject: "Felicitaciones", content: "Excelente progreso! Ha alcanzado su meta de peso del mes.", sentAt: "2024-01-13T14:00:00", status: "read", sentBy: "Dr. Juan Pérez" },
  { id: "MSG006", patientId: "P005", recipientType: "patient", recipientId: "P005", recipientName: "Laura Fernández", channel: "app", subject: "Preocupación por síntomas", content: "Hemos notado síntomas severos. Es importante que nos contacte para ajustar el tratamiento.", sentAt: "2024-01-06T10:00:00", status: "delivered", sentBy: "Dr. Juan Pérez" },
  { id: "MSG007", patientId: "P005", recipientType: "caregiver", recipientId: "CG006", recipientName: "Roberto Fernández", channel: "sms", subject: "Alerta importante", content: "Laura necesita apoyo adicional. Por favor contacten a la clínica.", sentAt: "2024-01-05T16:30:00", status: "delivered", sentBy: "Dr. Juan Pérez" },
]

export const getPatientMessages = (patientId: string): Message[] =>
  messages.filter(m => m.patientId === patientId).sort((a, b) => 
    new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  )

export const getMessageStatusLabel = (status: MessageStatus): string => {
  const labels = { sent: "Enviado", delivered: "Entregado", read: "Leído", failed: "Fallido" }
  return labels[status]
}

export const getMessageChannelLabel = (channel: MessageChannel): string => {
  const labels = { app: "Aplicación", sms: "SMS", email: "Email" }
  return labels[channel]
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

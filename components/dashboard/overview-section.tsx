"use client"

import { PatientDetail } from "./patient-detail"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Patient, RiesgoCondicion } from "@/lib/mock-data"
import { 
  getRiesgoLabel,
  getRiesgoColor,
  getCondicionLabel
} from "@/lib/mock-data"
import { 
  Activity, 
  AlertTriangle, 
  TrendingDown,
  Clock,
  MessageSquare,
  ChevronRight
} from "lucide-react"
import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts"

interface OverviewSectionProps {
  patients: Patient[]
  treatmentLabel: string
  onSelectPatientWithTab?: (patient: Patient, tab: string) => void
}

// Alert types with their categories
type AlertType = 
  | "silencio_prolongado"
  | "adherencia_muy_baja"
  | "inasistencia_consecutiva"
  | "caida_brusca"
  | "ghq12_alto"
  | "ghq12_readiness_combo"
  | "readiness_prolongado"
  | "sintoma_severo"
  | "lenguaje_riesgo"

interface ActiveAlert {
  id: string
  patient: Patient
  type: AlertType
  category: "abandono" | "emocional" | "motivacion"
  description: string
  triggeredAt: Date
  severity: 1 | 2 | 3 // 1 = highest
}

const alertTypeConfig: Record<AlertType, { 
  label: string
  category: "abandono" | "emocional" | "motivacion"
  severity: 1 | 2 | 3
}> = {
  silencio_prolongado: { label: "Silencio >7 dias", category: "abandono", severity: 1 },
  adherencia_muy_baja: { label: "Adherencia <40%", category: "abandono", severity: 1 },
  inasistencia_consecutiva: { label: "2+ controles no asistidos", category: "abandono", severity: 2 },
  caida_brusca: { label: "Caida brusca de nivel", category: "abandono", severity: 1 },
  ghq12_alto: { label: "GHQ-12 >= 7", category: "emocional", severity: 1 },
  ghq12_readiness_combo: { label: "GHQ-12 >= 3 + Readiness <= 2", category: "emocional", severity: 2 },
  readiness_prolongado: { label: "Readiness <= 2 por 2+ semanas", category: "motivacion", severity: 2 },
  sintoma_severo: { label: "Sintoma con severidad >= 6", category: "motivacion", severity: 2 },
  lenguaje_riesgo: { label: "Lenguaje de riesgo detectado", category: "motivacion", severity: 1 }
}

const categoryLabels = {
  abandono: "Abandono activo",
  emocional: "Estado emocional",
  motivacion: "Motivacion y sintomas"
}

const categoryColors = {
  abandono: "border-destructive/30 bg-destructive/5",
  emocional: "border-warning/30 bg-warning/5",
  motivacion: "border-orange-500/30 bg-orange-500/5"
}

export function OverviewSection({ patients: filteredPatients, treatmentLabel, onSelectPatientWithTab }: OverviewSectionProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  // Calculate metrics for the 4 counter cards
  const metrics = useMemo(() => {
    const riesgoMuyAlto = filteredPatients.filter(p => p.riesgoAbandono.nivel === 1).length
    const riesgoAlto = filteredPatients.filter(p => p.riesgoAbandono.nivel === 2).length
    const silencio7Dias = filteredPatients.filter(p => 
      p.riesgoAbandono.condicionesActivas.includes("silencio_prolongado")
    ).length
    const caidaBrusca = filteredPatients.filter(p => 
      p.riesgoAbandono.condicionesActivas.includes("caida_brusca")
    ).length

    return { riesgoMuyAlto, riesgoAlto, silencio7Dias, caidaBrusca }
  }, [filteredPatients])

  // Generate stacked bar chart data for last 8 weeks
  const weeklyRiskData = useMemo(() => {
    const weeks = []
    const now = new Date()
    
    for (let i = 7; i >= 0; i--) {
      const weekDate = new Date(now)
      weekDate.setDate(weekDate.getDate() - (i * 7))
      const weekLabel = `Sem ${8 - i}`
      
      // Simulate data distribution with some variance based on current data
      const baseDistribution = {
        nivel1: filteredPatients.filter(p => p.riesgoAbandono.nivel === 1).length,
        nivel2: filteredPatients.filter(p => p.riesgoAbandono.nivel === 2).length,
        nivel3: filteredPatients.filter(p => p.riesgoAbandono.nivel === 3).length,
        nivel4: filteredPatients.filter(p => p.riesgoAbandono.nivel === 4).length,
        nivel5: filteredPatients.filter(p => p.riesgoAbandono.nivel === 5).length
      }
      
      // Add variance for historical weeks
      const variance = Math.floor(Math.random() * 2) - 1
      weeks.push({
        week: weekLabel,
        "Muy alto (1)": Math.max(0, baseDistribution.nivel1 + (i > 4 ? variance + 1 : variance)),
        "Alto (2)": Math.max(0, baseDistribution.nivel2 + (i > 3 ? variance : 0)),
        "Moderado (3)": Math.max(0, baseDistribution.nivel3 + variance),
        "Bajo (4)": Math.max(0, baseDistribution.nivel4 + (i < 4 ? variance : -variance)),
        "Muy bajo (5)": Math.max(0, baseDistribution.nivel5 + (i < 3 ? 1 : 0))
      })
    }
    
    return weeks
  }, [filteredPatients])

  // Generate active alerts from patient data
  const activeAlerts = useMemo((): ActiveAlert[] => {
    const alerts: ActiveAlert[] = []
    const now = new Date()
    
    filteredPatients.forEach(patient => {
      // Check for abandono alerts
      if (patient.riesgoAbandono.condicionesActivas.includes("silencio_prolongado")) {
        alerts.push({
          id: `${patient.id}-silencio`,
          patient,
          type: "silencio_prolongado",
          category: "abandono",
          description: alertTypeConfig.silencio_prolongado.label,
          triggeredAt: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          severity: 1
        })
      }
      
      if (patient.riesgoAbandono.condicionesActivas.includes("adherencia_muy_baja")) {
        alerts.push({
          id: `${patient.id}-adherencia`,
          patient,
          type: "adherencia_muy_baja",
          category: "abandono",
          description: alertTypeConfig.adherencia_muy_baja.label,
          triggeredAt: new Date(now.getTime() - Math.random() * 14 * 24 * 60 * 60 * 1000),
          severity: 1
        })
      }
      
      if (patient.riesgoAbandono.condicionesActivas.includes("inasistencia_alta")) {
        alerts.push({
          id: `${patient.id}-inasistencia`,
          patient,
          type: "inasistencia_consecutiva",
          category: "abandono",
          description: alertTypeConfig.inasistencia_consecutiva.label,
          triggeredAt: new Date(now.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000),
          severity: 2
        })
      }
      
      if (patient.riesgoAbandono.condicionesActivas.includes("caida_brusca")) {
        alerts.push({
          id: `${patient.id}-caida`,
          patient,
          type: "caida_brusca",
          category: "abandono",
          description: alertTypeConfig.caida_brusca.label,
          triggeredAt: new Date(now.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000),
          severity: 1
        })
      }
      
      // Check for emotional alerts
      if (patient.riesgoAbandono.condicionesActivas.includes("ghq12_alto")) {
        alerts.push({
          id: `${patient.id}-ghq12`,
          patient,
          type: "ghq12_alto",
          category: "emocional",
          description: alertTypeConfig.ghq12_alto.label,
          triggeredAt: new Date(now.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000),
          severity: 1
        })
      }
      
      if (patient.riesgoAbandono.condicionesActivas.includes("ghq12_moderado") && 
          patient.riesgoAbandono.condicionesActivas.includes("readiness_bajo")) {
        alerts.push({
          id: `${patient.id}-combo`,
          patient,
          type: "ghq12_readiness_combo",
          category: "emocional",
          description: alertTypeConfig.ghq12_readiness_combo.label,
          triggeredAt: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          severity: 2
        })
      }
      
      // Check for motivation alerts
      if (patient.riesgoAbandono.condicionesActivas.includes("readiness_bajo")) {
        alerts.push({
          id: `${patient.id}-readiness`,
          patient,
          type: "readiness_prolongado",
          category: "motivacion",
          description: alertTypeConfig.readiness_prolongado.label,
          triggeredAt: new Date(now.getTime() - Math.random() * 14 * 24 * 60 * 60 * 1000),
          severity: 2
        })
      }
      
      // Check for severe symptoms
      if (patient.symptomsSeverity >= 6) {
        alerts.push({
          id: `${patient.id}-sintoma`,
          patient,
          type: "sintoma_severo",
          category: "motivacion",
          description: alertTypeConfig.sintoma_severo.label,
          triggeredAt: new Date(now.getTime() - Math.random() * 4 * 24 * 60 * 60 * 1000),
          severity: 2
        })
      }
    })
    
    // Sort by severity, then by date
    return alerts.sort((a, b) => {
      if (a.severity !== b.severity) return a.severity - b.severity
      return b.triggeredAt.getTime() - a.triggeredAt.getTime()
    })
  }, [filteredPatients])

  // Group alerts by category
  const alertsByCategory = useMemo(() => {
    return {
      abandono: activeAlerts.filter(a => a.category === "abandono"),
      emocional: activeAlerts.filter(a => a.category === "emocional"),
      motivacion: activeAlerts.filter(a => a.category === "motivacion")
    }
  }, [activeAlerts])

  // Helper to format time ago
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    
    if (diffDays > 0) return `hace ${diffDays}d`
    if (diffHours > 0) return `hace ${diffHours}h`
    return "hace poco"
  }

  // Handle contact button click
  const handleContact = (patient: Patient) => {
    if (onSelectPatientWithTab) {
      onSelectPatientWithTab(patient, "communications")
    } else {
      setSelectedPatient(patient)
    }
  }

  if (selectedPatient) {
    return (
      <div className="space-y-4">
        <PatientDetail 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)} 
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alertas y Riesgos</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-muted-foreground">
              Monitoreo de pacientes en riesgo
            </p>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Activity className="h-3 w-3" />
              {treatmentLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Riesgo muy alto */}
        <Card className="bg-card border-destructive/30 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground truncate">Riesgo muy alto</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{metrics.riesgoMuyAlto}</p>
                <p className="text-xs text-muted-foreground">nivel 1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Riesgo alto */}
        <Card className="bg-card border-orange-500/30 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-orange-500/10">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground truncate">Riesgo alto</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{metrics.riesgoAlto}</p>
                <p className="text-xs text-muted-foreground">nivel 2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Silencio +7 dias */}
        <Card className="bg-card border-warning/30 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground truncate">Silencio +7 dias</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{metrics.silencio7Dias}</p>
                <p className="text-xs text-muted-foreground">sin respuesta</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Caida brusca */}
        <Card className="bg-card border-destructive/30 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-destructive/10">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground truncate">Caida brusca</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{metrics.caidaBrusca}</p>
                <p className="text-xs text-muted-foreground">en 7 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stacked Bar Chart */}
      <Card className="border-border" style={{ backgroundColor: "var(--chart-panel-bg)" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Distribucion de riesgo de abandono — ultimas 8 semanas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRiskData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="var(--chart-grid)" 
                  strokeOpacity={0.3}
                  vertical={false} 
                />
                <XAxis 
                  dataKey="week" 
                  tick={{ fill: "var(--chart-grid)", fontSize: 11 }}
                  axisLine={{ stroke: "var(--chart-grid)", strokeOpacity: 0.5 }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: "var(--chart-grid)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--foreground)"
                  }}
                  labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "10px" }}
                  formatter={(value) => <span style={{ color: "var(--foreground)", fontSize: "11px" }}>{value}</span>}
                />
                <Bar dataKey="Muy alto (1)" stackId="a" fill="#dc6868" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Alto (2)" stackId="a" fill="#e09560" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Moderado (3)" stackId="a" fill="#d4a84a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Bajo (4)" stackId="a" fill="#9cb87a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Muy bajo (5)" stackId="a" fill="#7aab7a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts Section */}
      <div>
        <div className="flex flex-col gap-1 mb-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Alertas activas
          </h2>
          <p className="text-sm text-muted-foreground">
            {activeAlerts.length} {activeAlerts.length === 1 ? "alerta" : "alertas"} ordenadas por severidad
          </p>
        </div>

        {activeAlerts.length > 0 ? (
          <div className="space-y-6">
            {/* Abandono activo */}
            {alertsByCategory.abandono.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-destructive" />
                  <h3 className="text-sm font-semibold text-foreground">{categoryLabels.abandono}</h3>
                  <span className="text-xs text-muted-foreground">
                    ({alertsByCategory.abandono.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {alertsByCategory.abandono.map(alert => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert} 
                      onContact={() => handleContact(alert.patient)}
                      formatTimeAgo={formatTimeAgo}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Estado emocional */}
            {alertsByCategory.emocional.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-warning" />
                  <h3 className="text-sm font-semibold text-foreground">{categoryLabels.emocional}</h3>
                  <span className="text-xs text-muted-foreground">
                    ({alertsByCategory.emocional.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {alertsByCategory.emocional.map(alert => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert} 
                      onContact={() => handleContact(alert.patient)}
                      formatTimeAgo={formatTimeAgo}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Motivacion y sintomas */}
            {alertsByCategory.motivacion.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-orange-500" />
                  <h3 className="text-sm font-semibold text-foreground">{categoryLabels.motivacion}</h3>
                  <span className="text-xs text-muted-foreground">
                    ({alertsByCategory.motivacion.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {alertsByCategory.motivacion.map(alert => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert} 
                      onContact={() => handleContact(alert.patient)}
                      formatTimeAgo={formatTimeAgo}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <div className="rounded-full bg-success/10 p-4 w-fit mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-medium text-foreground">Sin alertas activas</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Todos los pacientes estan dentro de parametros seguros
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Alert Card Component
function AlertCard({ 
  alert, 
  onContact,
  formatTimeAgo
}: { 
  alert: ActiveAlert
  onContact: () => void
  formatTimeAgo: (date: Date) => string
}) {
  const severityColors = {
    1: "border-l-destructive",
    2: "border-l-orange-500",
    3: "border-l-warning"
  }

  return (
    <div className={cn(
      "flex items-center gap-4 p-3 rounded-lg border border-border bg-card border-l-4",
      severityColors[alert.severity]
    )}>
      {/* Patient Avatar */}
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
          {alert.patient.avatar}
        </AvatarFallback>
      </Avatar>

      {/* Alert Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground truncate">
            {alert.patient.name}
          </p>
          <span className={cn(
            "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold",
            getRiesgoColor(alert.patient.riesgoAbandono.nivel)
          )}>
            {alert.patient.riesgoAbandono.nivel}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {alert.description}
        </p>
      </div>

      {/* Time */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
        <Clock className="h-3 w-3" />
        {formatTimeAgo(alert.triggeredAt)}
      </div>

      {/* Contact Button */}
      <Button 
        size="sm" 
        variant="outline"
        className="flex-shrink-0 gap-1.5"
        onClick={onContact}
      >
        <MessageSquare className="h-3.5 w-3.5" />
        Contactar
      </Button>
    </div>
  )
}

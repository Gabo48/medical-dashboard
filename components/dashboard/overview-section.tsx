"use client"

import { KPICard } from "./kpi-card"
import { PatientsTable } from "./patients-table"
import { PatientDetail } from "./patient-detail"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { patients, aggregateMetrics } from "@/lib/mock-data"
import type { Patient } from "@/lib/mock-data"
import { 
  Users, 
  TrendingDown, 
  Activity, 
  AlertTriangle, 
  Stethoscope,
  Heart,
  Brain
} from "lucide-react"
import { useState } from "react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts"

export function OverviewSection() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const metrics = aggregateMetrics()

  const riskDistribution = [
    { name: "Muy bajo", value: patients.filter(p => p.abandonmentRisk === 1).length, color: "hsl(var(--success))" },
    { name: "Bajo", value: patients.filter(p => p.abandonmentRisk === 2).length, color: "hsl(var(--chart-2))" },
    { name: "Moderado", value: patients.filter(p => p.abandonmentRisk === 3).length, color: "hsl(var(--warning))" },
    { name: "Alto", value: patients.filter(p => p.abandonmentRisk === 4).length, color: "hsl(var(--chart-4))" },
    { name: "Crítico", value: patients.filter(p => p.abandonmentRisk === 5).length, color: "hsl(var(--destructive))" },
  ]

  const bmiCategories = [
    { name: "IMC 30-32", value: patients.filter(p => p.bmi >= 30 && p.bmi < 32).length },
    { name: "IMC 32-35", value: patients.filter(p => p.bmi >= 32 && p.bmi < 35).length },
    { name: "IMC 35-38", value: patients.filter(p => p.bmi >= 35 && p.bmi < 38).length },
    { name: "IMC 38+", value: patients.filter(p => p.bmi >= 38).length },
  ]

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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard de Obesidad</h1>
        <p className="text-sm text-muted-foreground">
          Monitoreo de pacientes con tratamiento para obesidad
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <KPICard
          title="Pacientes"
          value={metrics.totalPatients}
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          title="Adherencia Prom."
          value={`${metrics.avgAdherence}%`}
          trend={Number(metrics.avgAdherence) >= 80 ? "up" : "down"}
          trendValue="Meta: 80%"
          icon={<Activity className="h-4 w-4" />}
        />
        <KPICard
          title="Cambio IMC Prom."
          value={`${metrics.avgBmiChange}%`}
          trend="down"
          trendValue="Reducción"
          icon={<TrendingDown className="h-4 w-4" />}
          variant="success"
          invertTrendColor
        />
        <KPICard
          title="Pacientes Críticos"
          value={metrics.criticalPatients}
          subtitle="Requieren atención"
          icon={<AlertTriangle className="h-4 w-4" />}
          variant={metrics.criticalPatients > 0 ? "danger" : "default"}
        />
        <KPICard
          title="Síntomas Totales"
          value={metrics.totalSymptoms}
          icon={<Stethoscope className="h-4 w-4" />}
        />
        <KPICard
          title="Ánimo Prom."
          value={`${metrics.avgMood}/5`}
          icon={<Heart className="h-4 w-4" />}
        />
        <KPICard
          title="Motivación Prom."
          value={`${metrics.avgMotivation}/5`}
          icon={<Brain className="h-4 w-4" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Risk Distribution */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Distribución de Riesgo de Abandono
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskDistribution} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false}
                    width={55}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))"
                    }}
                    formatter={(value: number) => [`${value} pacientes`, "Cantidad"]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* BMI Categories */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Distribución por IMC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bmiCategories} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} 
                    axisLine={{ stroke: "hsl(var(--border))" }} 
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))"
                    }}
                    formatter={(value: number) => [`${value} pacientes`, "Cantidad"]}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patients Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Lista de Pacientes</h2>
          <p className="text-sm text-muted-foreground">
            Haz clic en un paciente para ver detalles
          </p>
        </div>
        <PatientsTable 
          patients={patients} 
          onSelectPatient={setSelectedPatient}
          selectedPatientId={selectedPatient?.id}
        />
      </div>
    </div>
  )
}

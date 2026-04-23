"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ClinicalNotes, type ClinicalNote } from "./clinical-notes"
import { Heart, Activity, Droplets, Gauge, Zap } from "lucide-react"
import type { Patient } from "@/lib/mock-data"

interface ClinicalConditions {
  cardiovasculares: string[]
  metabolicas: string[]
  antropomedicas: string[]
  funcionales: string[]
  hepaticas: string[]
}

interface ClinicalProfileTabProps {
  patient: Patient
}

const defaultConditions: ClinicalConditions = {
  cardiovasculares: ["Presión arterial elevada", "Colesterol alto"],
  metabolicas: ["Diabetes tipo 2", "Resistencia a la insulina"],
  antropomedicas: ["Obesidad", "Circunferencia de cintura aumentada"],
  funcionales: ["Disnea de esfuerzo leve", "Cansancio frecuente"],
  hepaticas: ["Hígado graso no alcohólico"]
}

const conditionIcons = {
  cardiovasculares: Heart,
  metabolicas: Droplets,
  antropomedicas: Gauge,
  funcionales: Activity,
  hepaticas: Zap
}

const conditionColors = {
  cardiovasculares: "text-red-500 bg-red-50",
  metabolicas: "text-blue-500 bg-blue-50",
  antropomedicas: "text-orange-500 bg-orange-50",
  funcionales: "text-green-500 bg-green-50",
  hepaticas: "text-purple-500 bg-purple-50"
}

const conditionLabels = {
  cardiovasculares: "Cardiovasculares",
  metabolicas: "Metabólicas",
  antropomedicas: "Antropomédicas",
  funcionales: "Funcionales",
  hepaticas: "Hepáticas"
}

export function ClinicalProfileTab({ patient }: ClinicalProfileTabProps) {
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([
    {
      id: "1",
      content: "Paciente presenta buena tolerancia al tratamiento actual. Se recomienda continuar con el plan de medicación.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      archived: false
    },
    {
      id: "2",
      content: "Seguimiento: El paciente ha logrado reducir 13 kg desde el inicio del tratamiento. IMC mejorado de 38.6 a 33.8.",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      archived: false
    }
  ])

  const handleAddNote = (content: string) => {
    const newNote: ClinicalNote = {
      id: Date.now().toString(),
      content,
      date: new Date().toISOString(),
      archived: false
    }
    setClinicalNotes([newNote, ...clinicalNotes])
  }

  const handleDeleteNote = (noteId: string) => {
    setClinicalNotes(clinicalNotes.filter(n => n.id !== noteId))
  }

  const handleArchiveNote = (noteId: string) => {
    setClinicalNotes(clinicalNotes.map(n =>
      n.id === noteId ? { ...n, archived: !n.archived } : n
    ))
  }

  return (
    <div className="space-y-6">
      {/* Clinical Conditions Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(defaultConditions) as Array<keyof ClinicalConditions>).map((key) => {
          const Icon = conditionIcons[key]
          const color = conditionColors[key]
          const label = conditionLabels[key]
          const conditions = defaultConditions[key]

          return (
            <Card key={key} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${color.split(" ")[0]}`} />
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {conditions.map((condition, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-sm text-foreground">{condition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Separator className="bg-border" />

      {/* Current Weight and Measurements */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground">Medidas Actuales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Peso Actual</p>
              <p className="text-2xl font-bold text-foreground">{patient.weight} kg</p>
              <p className="text-xs text-success mt-1">
                -{patient.initialWeight - patient.weight} kg
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">IMC Actual</p>
              <p className="text-2xl font-bold text-foreground">{patient.bmi.toFixed(1)}</p>
              <p className="text-xs text-success mt-1">
                -{(patient.initialBmi - patient.bmi).toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Altura</p>
              <p className="text-2xl font-bold text-foreground">{patient.height} m</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Cambio IMC</p>
              <p className="text-2xl font-bold text-success">{patient.bmiChange.toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="bg-border" />

      {/* Clinical Notes Section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Ficha Clínica</h3>
        <ClinicalNotes
          notes={clinicalNotes}
          onAddNote={handleAddNote}
          onDeleteNote={handleDeleteNote}
          onArchiveNote={handleArchiveNote}
        />
      </div>
    </div>
  )
}

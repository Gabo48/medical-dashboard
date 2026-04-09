"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { SymptomReport } from "@/lib/mock-data"
import { AlertCircle } from "lucide-react"

interface SymptomsListProps {
  symptoms: SymptomReport[]
  title?: string
}

const severityConfig = {
  1: { label: "Leve", color: "bg-success/20 text-success border-success/30" },
  2: { label: "Moderado", color: "bg-warning/20 text-warning border-warning/30" },
  3: { label: "Severo", color: "bg-destructive/20 text-destructive border-destructive/30" }
}

export function SymptomsList({ symptoms, title = "Síntomas Reportados" }: SymptomsListProps) {
  if (symptoms.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="rounded-full bg-success/10 p-3 mb-3">
              <AlertCircle className="h-5 w-5 text-success" />
            </div>
            <p className="text-sm text-muted-foreground">Sin síntomas reportados</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          {title}
          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
            {symptoms.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
          {symptoms.map((symptom) => {
            const config = severityConfig[symptom.severity]
            return (
              <div 
                key={symptom.id}
                className={cn(
                  "flex items-center justify-between p-2 rounded-lg border",
                  config.color
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-current" />
                  <span className="text-sm font-medium">{symptom.symptom}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-80">{config.label}</span>
                  <span className="text-xs opacity-60">{symptom.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

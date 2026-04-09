"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { AlertBadge, MoodBadge } from "./alert-badge"
import type { Patient } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface PatientsTableProps {
  patients: Patient[]
  onSelectPatient?: (patient: Patient) => void
  selectedPatientId?: string
}

export function PatientsTable({ patients, onSelectPatient, selectedPatientId }: PatientsTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="text-muted-foreground font-medium">Paciente</TableHead>
            <TableHead className="text-muted-foreground font-medium text-center">IMC</TableHead>
            <TableHead className="text-muted-foreground font-medium text-center">Cambio IMC</TableHead>
            <TableHead className="text-muted-foreground font-medium">Adherencia</TableHead>
            <TableHead className="text-muted-foreground font-medium text-center">Estado</TableHead>
            <TableHead className="text-muted-foreground font-medium text-center">Riesgo Abandono</TableHead>
            <TableHead className="text-muted-foreground font-medium text-center">Riesgo Tratamiento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow 
              key={patient.id}
              className={cn(
                "cursor-pointer transition-colors",
                selectedPatientId === patient.id && "bg-primary/10"
              )}
              onClick={() => onSelectPatient?.(patient)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-primary/20 text-primary">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-medium">
                      {patient.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {patient.age} años · {patient.gender === "M" ? "Masculino" : "Femenino"}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className="font-mono text-foreground">{patient.bmi.toFixed(1)}</span>
              </TableCell>
              <TableCell className="text-center">
                <span className={cn(
                  "font-mono",
                  patient.bmiChange < 0 ? "text-success" : patient.bmiChange > 0 ? "text-destructive" : "text-muted-foreground"
                )}>
                  {patient.bmiChange > 0 ? "+" : ""}{patient.bmiChange.toFixed(1)}%
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={patient.adherence} 
                    className="h-2 w-16 bg-muted"
                  />
                  <span className="text-xs text-muted-foreground w-8">{patient.adherence}%</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <MoodBadge value={patient.mood} />
                  <MoodBadge value={patient.motivation} />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <AlertBadge level={patient.abandonmentRisk} type="abandonment" />
              </TableCell>
              <TableCell className="text-center">
                <AlertBadge level={patient.treatmentRisk} type="treatment" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

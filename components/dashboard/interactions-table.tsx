"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { PatientInteraction } from "@/lib/mock-data"
import { getInteractionTypeLabel, getInteractionResultLabel } from "@/lib/mock-data"
import { 
  MessageSquare, 
  Pill, 
  Stethoscope, 
  Calendar, 
  Scale, 
  Heart,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock
} from "lucide-react"

interface InteractionsTableProps {
  interactions: PatientInteraction[]
  title?: string
}

const typeIcons = {
  medication_report: Pill,
  symptom_report: Stethoscope,
  appointment: Calendar,
  chat: MessageSquare,
  weight_log: Scale,
  mood_log: Heart
}

const resultConfig = {
  completed: { 
    icon: CheckCircle, 
    color: "bg-success/10 text-success",
    badgeColor: "bg-success text-success-foreground"
  },
  skipped: { 
    icon: XCircle, 
    color: "bg-warning/10 text-warning",
    badgeColor: "bg-warning text-warning-foreground"
  },
  error: { 
    icon: AlertCircle, 
    color: "bg-destructive/10 text-destructive",
    badgeColor: "bg-destructive text-destructive-foreground"
  },
  pending: { 
    icon: Clock, 
    color: "bg-muted text-muted-foreground",
    badgeColor: "bg-muted text-foreground"
  }
}

export function InteractionsTable({ interactions, title = "Historial de Interacciones" }: InteractionsTableProps) {
  if (interactions.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="rounded-full bg-muted/50 p-3 mb-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Sin interacciones registradas</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          {title}
          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
            {interactions.length} registros
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider py-2">Resumen</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-center py-2">Fecha</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-center py-2">Tipo</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-center py-2">Resultado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interactions.map((interaction) => {
                const TypeIcon = typeIcons[interaction.type]
                const resultConf = resultConfig[interaction.result]
                const ResultIcon = resultConf.icon

                return (
                  <TableRow key={interaction.id} className="hover:bg-muted/20">
                    <TableCell className="py-3">
                      <div className="flex items-start gap-2 max-w-xs">
                        <div className={cn("p-1.5 rounded-lg shrink-0", resultConf.color)}>
                          <TypeIcon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm text-foreground line-clamp-2">{interaction.summary}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <span className="text-sm text-muted-foreground">{interaction.date}</span>
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {getInteractionTypeLabel(interaction.type)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                        resultConf.badgeColor
                      )}>
                        <ResultIcon className="h-3 w-3" />
                        {getInteractionResultLabel(interaction.result)}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

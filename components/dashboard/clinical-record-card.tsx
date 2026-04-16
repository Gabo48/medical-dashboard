"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  FileText, 
  Download, 
  Upload, 
  RefreshCw,
  Droplets,
  AlertCircle,
  Stethoscope,
  Calendar,
  User,
  ExternalLink
} from "lucide-react"
import type { ClinicalRecord, Patient } from "@/lib/mock-data"

interface ClinicalRecordCardProps {
  record: ClinicalRecord | null
  patient: Patient
  onImport?: (externalId: string) => void
  onRefresh?: () => void
}

export function ClinicalRecordCard({ record, patient, onImport, onRefresh }: ClinicalRecordCardProps) {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [externalId, setExternalId] = useState("")
  const [isImporting, setIsImporting] = useState(false)

  const handleImport = async () => {
    if (!externalId.trim()) return
    setIsImporting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    onImport?.(externalId)
    setIsImporting(false)
    setIsImportDialogOpen(false)
    setExternalId("")
  }

  if (!record) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Ficha Clínica
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              No hay ficha clínica registrada para este paciente
            </p>
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Importar desde sistema externo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Importar Ficha Clínica</DialogTitle>
                  <DialogDescription>
                    Ingrese el ID del expediente en el sistema externo para importar los datos clínicos del paciente.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="externalId">ID de Sistema Externo</Label>
                    <Input
                      id="externalId"
                      placeholder="Ej: EXT-2024-12345"
                      value={externalId}
                      onChange={(e) => setExternalId(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Se conectará al sistema HIS/EMR configurado para obtener los datos del paciente.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleImport} disabled={!externalId.trim() || isImporting}>
                    {isImporting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Importando...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Importar
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Ficha Clínica
          </CardTitle>
          <div className="flex items-center gap-2">
            {record.externalSystemId && (
              <Badge variant="outline" className="text-xs gap-1">
                <ExternalLink className="h-3 w-3" />
                {record.externalSystemId}
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2"
              onClick={onRefresh}
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Diagnosis */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Stethoscope className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Diagnóstico Principal</span>
          </div>
          <p className="text-sm font-medium text-foreground">{record.diagnosis}</p>
        </div>

        <Separator className="bg-border" />

        {/* Comorbidities */}
        {record.comorbidities.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <span className="text-xs font-medium text-muted-foreground">Comorbilidades</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {record.comorbidities.map((c, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Allergies */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="text-xs font-medium text-muted-foreground">Alergias</span>
          </div>
          {record.allergies.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {record.allergies.map((a, i) => (
                <Badge key={i} variant="destructive" className="text-xs">
                  {a}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Sin alergias conocidas</span>
          )}
        </div>

        {/* Blood Type */}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="h-4 w-4 text-destructive" />
              <span className="text-xs font-medium text-muted-foreground">Tipo de Sangre</span>
            </div>
            <Badge variant="outline" className="font-mono font-bold">
              {record.bloodType}
            </Badge>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Notes */}
        {record.notes && (
          <div>
            <span className="text-xs font-medium text-muted-foreground">Notas Clínicas</span>
            <p className="text-sm text-foreground mt-1 p-3 rounded-md bg-muted/50">
              {record.notes}
            </p>
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {record.physician}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Actualizado: {record.lastUpdated}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

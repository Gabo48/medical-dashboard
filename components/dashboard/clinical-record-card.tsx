"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  ExternalLink,
  Pencil,
  X,
  Check,
  Plus,
  Trash2
} from "lucide-react"
import type { ClinicalRecord, ClinicalNote, Patient } from "@/lib/mock-data"

interface ClinicalRecordCardProps {
  record: ClinicalRecord | null
  patient: Patient
  onImport?: (externalId: string) => void
  onRefresh?: () => void
  onSave?: (record: ClinicalRecord) => void
}

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const

export function ClinicalRecordCard({ record, patient, onImport, onRefresh, onSave }: ClinicalRecordCardProps) {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [externalId, setExternalId] = useState("")
  const [isImporting, setIsImporting] = useState(false)
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false)
  const [editedRecord, setEditedRecord] = useState<ClinicalRecord | null>(null)
  
  // New condition/allergy input state
  const [newCondition, setNewCondition] = useState("")
  const [newAllergy, setNewAllergy] = useState("")
  
  // New note state
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNoteContent, setNewNoteContent] = useState("")
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editingNoteContent, setEditingNoteContent] = useState("")

  const handleImport = async () => {
    if (!externalId.trim()) return
    setIsImporting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    onImport?.(externalId)
    setIsImporting(false)
    setIsImportDialogOpen(false)
    setExternalId("")
  }

  const handleStartEdit = () => {
    if (record) {
      setEditedRecord({ ...record, notes: [...record.notes], comorbidities: [...record.comorbidities], allergies: [...record.allergies] })
      setIsEditing(true)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedRecord(null)
    setNewCondition("")
    setNewAllergy("")
    setIsAddingNote(false)
    setNewNoteContent("")
    setEditingNoteId(null)
    setEditingNoteContent("")
  }

  const handleSaveEdit = () => {
    if (editedRecord) {
      onSave?.(editedRecord)
      setIsEditing(false)
      setEditedRecord(null)
    }
  }

  const handleAddCondition = () => {
    if (newCondition.trim() && editedRecord) {
      setEditedRecord({
        ...editedRecord,
        comorbidities: [...editedRecord.comorbidities, newCondition.trim()]
      })
      setNewCondition("")
    }
  }

  const handleRemoveCondition = (index: number) => {
    if (editedRecord) {
      setEditedRecord({
        ...editedRecord,
        comorbidities: editedRecord.comorbidities.filter((_, i) => i !== index)
      })
    }
  }

  const handleAddAllergy = () => {
    if (newAllergy.trim() && editedRecord) {
      setEditedRecord({
        ...editedRecord,
        allergies: [...editedRecord.allergies, newAllergy.trim()]
      })
      setNewAllergy("")
    }
  }

  const handleRemoveAllergy = (index: number) => {
    if (editedRecord) {
      setEditedRecord({
        ...editedRecord,
        allergies: editedRecord.allergies.filter((_, i) => i !== index)
      })
    }
  }

  const handleAddNote = () => {
    if (newNoteContent.trim() && editedRecord) {
      const newNote: ClinicalNote = {
        id: `N${Date.now()}`,
        author: record?.physician || "Dr. Juan Pérez",
        date: new Date().toISOString().split('T')[0],
        content: newNoteContent.trim()
      }
      setEditedRecord({
        ...editedRecord,
        notes: [newNote, ...editedRecord.notes]
      })
      setNewNoteContent("")
      setIsAddingNote(false)
    }
  }

  const handleEditNote = (noteId: string) => {
    const note = editedRecord?.notes.find(n => n.id === noteId)
    if (note) {
      setEditingNoteId(noteId)
      setEditingNoteContent(note.content)
    }
  }

  const handleSaveNoteEdit = () => {
    if (editingNoteId && editedRecord) {
      setEditedRecord({
        ...editedRecord,
        notes: editedRecord.notes.map(note => 
          note.id === editingNoteId 
            ? { ...note, content: editingNoteContent } 
            : note
        )
      })
      setEditingNoteId(null)
      setEditingNoteContent("")
    }
  }

  const handleDeleteNote = (noteId: string) => {
    if (editedRecord) {
      setEditedRecord({
        ...editedRecord,
        notes: editedRecord.notes.filter(note => note.id !== noteId)
      })
    }
  }

  // Use edited record when editing, otherwise use original
  const displayRecord = isEditing ? editedRecord : record

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
            {displayRecord?.externalSystemId && !isEditing && (
              <Badge variant="outline" className="text-xs gap-1">
                <ExternalLink className="h-3 w-3" />
                {displayRecord.externalSystemId}
              </Badge>
            )}
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 px-2 gap-1"
                  onClick={handleCancelEdit}
                >
                  <X className="h-3.5 w-3.5" />
                  Cancelar
                </Button>
                <Button 
                  size="sm" 
                  className="h-7 px-2 gap-1"
                  onClick={handleSaveEdit}
                >
                  <Check className="h-3.5 w-3.5" />
                  Guardar
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 px-2 gap-1"
                  onClick={handleStartEdit}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Editar ficha
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2"
                  onClick={onRefresh}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </>
            )}
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
          {isEditing && editedRecord ? (
            <Input
              value={editedRecord.diagnosis}
              onChange={(e) => setEditedRecord({ ...editedRecord, diagnosis: e.target.value })}
              className="text-sm"
            />
          ) : (
            <p className="text-sm font-medium text-foreground">{displayRecord?.diagnosis}</p>
          )}
        </div>

        <Separator className="bg-border" />

        {/* Conditions (formerly Comorbidities) */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-warning" />
            <span className="text-xs font-medium text-muted-foreground">Condiciones asociadas</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(displayRecord?.comorbidities || []).map((c, i) => (
              <Badge key={i} variant="secondary" className="text-xs gap-1">
                {c}
                {isEditing && (
                  <button 
                    onClick={() => handleRemoveCondition(i)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
            {(displayRecord?.comorbidities || []).length === 0 && !isEditing && (
              <span className="text-sm text-muted-foreground">Sin condiciones asociadas</span>
            )}
          </div>
          {isEditing && (
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Nueva condición..."
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCondition()}
                className="text-sm h-8"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-2"
                onClick={handleAddCondition}
                disabled={!newCondition.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Allergies */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="text-xs font-medium text-muted-foreground">Alergias</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(displayRecord?.allergies || []).map((a, i) => (
              <Badge key={i} variant="destructive" className="text-xs gap-1">
                {a}
                {isEditing && (
                  <button 
                    onClick={() => handleRemoveAllergy(i)}
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
            {(displayRecord?.allergies || []).length === 0 && !isEditing && (
              <span className="text-sm text-muted-foreground">Sin alergias conocidas</span>
            )}
          </div>
          {isEditing && (
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Nueva alergia..."
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddAllergy()}
                className="text-sm h-8"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-2"
                onClick={handleAddAllergy}
                disabled={!newAllergy.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Blood Type */}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="h-4 w-4 text-destructive" />
              <span className="text-xs font-medium text-muted-foreground">Tipo de Sangre</span>
            </div>
            {isEditing && editedRecord ? (
              <Select
                value={editedRecord.bloodType}
                onValueChange={(value) => setEditedRecord({ ...editedRecord, bloodType: value })}
              >
                <SelectTrigger className="w-24 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Badge variant="outline" className="font-mono font-bold">
                {displayRecord?.bloodType}
              </Badge>
            )}
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Clinical Notes - Redesigned */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">Notas Clínicas</span>
            {isEditing && !isAddingNote && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2 gap-1"
                onClick={() => setIsAddingNote(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                Nueva nota
              </Button>
            )}
          </div>

          {/* New note form */}
          {isEditing && isAddingNote && (
            <div className="mb-3 p-3 rounded-md border border-border bg-muted/30">
              <Textarea
                placeholder="Escribir nueva nota clínica..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="text-sm min-h-20 mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setIsAddingNote(false)
                    setNewNoteContent("")
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleAddNote}
                  disabled={!newNoteContent.trim()}
                >
                  Agregar
                </Button>
              </div>
            </div>
          )}

          {/* Notes list */}
          <div className="space-y-3">
            {(displayRecord?.notes || []).map((note) => (
              <div 
                key={note.id} 
                className="p-3 rounded-md bg-muted/50 border border-border/50"
              >
                {editingNoteId === note.id ? (
                  <>
                    <Textarea
                      value={editingNoteContent}
                      onChange={(e) => setEditingNoteContent(e.target.value)}
                      className="text-sm min-h-20 mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setEditingNoteId(null)
                          setEditingNoteContent("")
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleSaveNoteEdit}
                      >
                        Guardar
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {note.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {note.date}
                        </span>
                      </div>
                      {isEditing && (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleEditNote(note.id)}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-foreground">{note.content}</p>
                  </>
                )}
              </div>
            ))}
            {(displayRecord?.notes || []).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay notas clínicas registradas
              </p>
            )}
          </div>
        </div>

        {/* Metadata */}
        {!isEditing && (
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {displayRecord?.physician}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Actualizado: {displayRecord?.lastUpdated}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

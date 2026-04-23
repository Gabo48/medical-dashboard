"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Trash2, Pin, MessageSquare, Eye } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export interface ClinicalNote {
  id: string
  content: string
  date: string
  archived: boolean
}

interface ClinicalNotesProps {
  notes: ClinicalNote[]
  onAddNote: (content: string) => void
  onDeleteNote: (noteId: string) => void
  onArchiveNote: (noteId: string) => void
}

export function ClinicalNotes({
  notes,
  onAddNote,
  onDeleteNote,
  onArchiveNote
}: ClinicalNotesProps) {
  const [newNoteContent, setNewNoteContent] = useState("")
  const [selectedNote, setSelectedNote] = useState<ClinicalNote | null>(null)

  const activeNotes = notes.filter(n => !n.archived)
  const archivedNotes = notes.filter(n => n.archived)

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      onAddNote(newNoteContent)
      setNewNoteContent("")
    }
  }

  return (
    <div className="space-y-4">
      {/* Add New Note */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Agregar Nueva Nota
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Escriba una nueva nota clínica..."
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            className="min-h-24 resize-none bg-muted/50"
          />
          <Button
            onClick={handleAddNote}
            disabled={!newNoteContent.trim()}
            className="w-full sm:w-auto"
          >
            Agregar Nota
          </Button>
        </CardContent>
      </Card>

      {/* Active Notes */}
      {activeNotes.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground">
              Notas Clínicas Activas ({activeNotes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeNotes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      {format(new Date(note.date), "dd MMMM yyyy, HH:mm", { locale: es })}
                    </p>
                    <p className="text-sm text-foreground line-clamp-2">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedNote(note)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">Ver nota completa</TooltipContent>
                        </Tooltip>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 max-h-96 overflow-y-auto" side="left">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground font-medium mb-2">
                              {format(new Date(note.date), "dd MMMM yyyy, HH:mm", { locale: es })}
                            </p>
                            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                              {note.content}
                            </p>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onArchiveNote(note.id)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-warning hover:bg-warning/10"
                        >
                          <Pin className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">Archivar nota</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteNote(note.id)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">Eliminar nota</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Archived Notes */}
      {archivedNotes.length > 0 && (
        <Card className="bg-card border-border opacity-75">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Notas Archivadas ({archivedNotes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {archivedNotes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      {format(new Date(note.date), "dd MMMM yyyy, HH:mm", { locale: es })}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Badge variant="outline" className="text-xs">
                      Archivada
                    </Badge>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedNote(note)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">Ver nota completa</TooltipContent>
                        </Tooltip>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 max-h-96 overflow-y-auto" side="left">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground font-medium mb-2">
                              {format(new Date(note.date), "dd MMMM yyyy, HH:mm", { locale: es })}
                            </p>
                            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                              {note.content}
                            </p>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteNote(note.id)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">Eliminar nota</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {notes.length === 0 && (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
          <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No hay notas clínicas registradas</p>
        </div>
      )}
    </div>
  )
}

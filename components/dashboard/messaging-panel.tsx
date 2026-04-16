"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  MessageSquare, 
  Send,
  Mail,
  Smartphone,
  User,
  Users,
  Clock,
  Check,
  CheckCheck,
  AlertCircle,
  Phone
} from "lucide-react"
import type { Message, Caregiver, Patient, MessageChannel, MessageRecipientType } from "@/lib/mock-data"
import { getRelationshipLabel, getMessageStatusLabel, getMessageChannelLabel } from "@/lib/mock-data"

interface MessagingPanelProps {
  patient: Patient
  messages: Message[]
  caregivers: Caregiver[]
  onSendMessage?: (message: {
    recipientType: MessageRecipientType
    recipientId: string
    channel: MessageChannel
    subject: string
    content: string
  }) => void
}

const messageTemplates = [
  { id: "reminder", subject: "Recordatorio de cita", content: "Le recordamos su próxima cita programada. Por favor confirme su asistencia." },
  { id: "adherence", subject: "Seguimiento de adherencia", content: "Hemos notado que la adherencia al tratamiento ha disminuido. ¿Hay algo en lo que podamos ayudarle?" },
  { id: "symptoms", subject: "Seguimiento de síntomas", content: "Queremos dar seguimiento a los síntomas que reportó recientemente. ¿Cómo se ha sentido?" },
  { id: "encouragement", subject: "Mensaje de apoyo", content: "Queremos felicitarle por su progreso en el tratamiento. Siga así!" },
  { id: "caregiver_update", subject: "Actualización de progreso", content: "Le compartimos una actualización sobre el progreso del paciente en su tratamiento." },
  { id: "caregiver_alert", subject: "Alerta importante", content: "Es importante que estén al tanto de la situación actual del paciente. Por favor comuníquense con nosotros." },
]

export function MessagingPanel({ patient, messages, caregivers, onSendMessage }: MessagingPanelProps) {
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [recipientType, setRecipientType] = useState<MessageRecipientType>("patient")
  const [selectedRecipient, setSelectedRecipient] = useState<string>("")
  const [channel, setChannel] = useState<MessageChannel>("app")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find(t => t.id === templateId)
    if (template) {
      setSubject(template.subject)
      setContent(template.content)
    }
    setSelectedTemplate(templateId)
  }

  const handleSend = () => {
    if (!selectedRecipient || !subject.trim() || !content.trim()) return
    
    onSendMessage?.({
      recipientType,
      recipientId: selectedRecipient,
      channel,
      subject: subject.trim(),
      content: content.trim()
    })
    
    setIsComposeOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setRecipientType("patient")
    setSelectedRecipient("")
    setChannel("app")
    setSubject("")
    setContent("")
    setSelectedTemplate("")
  }

  const patientMessages = messages.filter(m => m.recipientType === "patient")
  const caregiverMessages = messages.filter(m => m.recipientType === "caregiver")

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent": return <Check className="h-3 w-3 text-muted-foreground" />
      case "delivered": return <CheckCheck className="h-3 w-3 text-muted-foreground" />
      case "read": return <CheckCheck className="h-3 w-3 text-success" />
      case "failed": return <AlertCircle className="h-3 w-3 text-destructive" />
    }
  }

  const getChannelIcon = (ch: MessageChannel) => {
    switch (ch) {
      case "app": return <MessageSquare className="h-3 w-3" />
      case "sms": return <Smartphone className="h-3 w-3" />
      case "email": return <Mail className="h-3 w-3" />
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            Mensajería
          </CardTitle>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-7 gap-1">
                <Send className="h-3.5 w-3.5" />
                Nuevo mensaje
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Enviar Mensaje</DialogTitle>
                <DialogDescription>
                  Envíe un mensaje al paciente o a su red de apoyo.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Recipient Type */}
                <div className="space-y-2">
                  <Label>Tipo de destinatario</Label>
                  <Select 
                    value={recipientType} 
                    onValueChange={(v) => {
                      setRecipientType(v as MessageRecipientType)
                      setSelectedRecipient("")
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Paciente
                        </div>
                      </SelectItem>
                      <SelectItem value="caregiver">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Red de apoyo
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Recipient Selection */}
                <div className="space-y-2">
                  <Label>Destinatario</Label>
                  {recipientType === "patient" ? (
                    <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={patient.id}>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {patient.name}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar familiar/cuidador" />
                      </SelectTrigger>
                      <SelectContent>
                        {caregivers.length === 0 ? (
                          <SelectItem value="" disabled>
                            No hay cuidadores registrados
                          </SelectItem>
                        ) : (
                          caregivers.map(cg => (
                            <SelectItem key={cg.id} value={cg.id}>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {cg.name} ({getRelationshipLabel(cg.relationship)})
                                {cg.isPrimary && <Badge variant="secondary" className="text-xs ml-1">Principal</Badge>}
                              </div>
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Channel Selection */}
                <div className="space-y-2">
                  <Label>Canal de envío</Label>
                  <Select value={channel} onValueChange={(v) => setChannel(v as MessageChannel)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="app">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Aplicación
                        </div>
                      </SelectItem>
                      <SelectItem value="sms">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          SMS
                        </div>
                      </SelectItem>
                      <SelectItem value="email">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Template Selection */}
                <div className="space-y-2">
                  <Label>Plantilla (opcional)</Label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plantilla..." />
                    </SelectTrigger>
                    <SelectContent>
                      {messageTemplates.map(t => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label>Asunto</Label>
                  <Input 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Asunto del mensaje"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label>Mensaje</Label>
                  <Textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escriba su mensaje aquí..."
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSend} 
                  disabled={!selectedRecipient || !subject.trim() || !content.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-3">
            <TabsTrigger value="patient" className="text-xs gap-1">
              <User className="h-3 w-3" />
              Paciente ({patientMessages.length})
            </TabsTrigger>
            <TabsTrigger value="caregivers" className="text-xs gap-1">
              <Users className="h-3 w-3" />
              Red de apoyo ({caregiverMessages.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patient">
            <MessageList messages={patientMessages} getStatusIcon={getStatusIcon} getChannelIcon={getChannelIcon} />
          </TabsContent>

          <TabsContent value="caregivers">
            {caregivers.length === 0 ? (
              <div className="text-center py-6 text-sm text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                No hay red de apoyo registrada
              </div>
            ) : (
              <>
                {/* Caregivers List */}
                <div className="mb-3 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Contactos registrados:</p>
                  <div className="flex flex-wrap gap-2">
                    {caregivers.map(cg => (
                      <Badge key={cg.id} variant="outline" className="text-xs flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {cg.name}
                        <span className="text-muted-foreground">({getRelationshipLabel(cg.relationship)})</span>
                        {cg.isPrimary && (
                          <Badge variant="secondary" className="text-[10px] px-1 py-0 ml-1">Principal</Badge>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator className="my-3" />
                <MessageList messages={caregiverMessages} getStatusIcon={getStatusIcon} getChannelIcon={getChannelIcon} />
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Message List Component
function MessageList({ 
  messages, 
  getStatusIcon, 
  getChannelIcon 
}: { 
  messages: Message[]
  getStatusIcon: (status: Message["status"]) => React.ReactNode
  getChannelIcon: (channel: MessageChannel) => React.ReactNode
}) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-muted-foreground">
        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
        No hay mensajes enviados
      </div>
    )
  }

  return (
    <ScrollArea className="h-[250px]">
      <div className="space-y-3 pr-3">
        {messages.map((message) => (
          <div key={message.id} className="p-3 rounded-lg border border-border bg-muted/30">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getChannelIcon(message.channel)}
                <span className="font-medium text-sm text-foreground">{message.subject}</span>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(message.status)}
                <span className="text-xs text-muted-foreground">{getMessageStatusLabel(message.status)}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{message.content}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                Para: {message.recipientName}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(message.sentAt).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

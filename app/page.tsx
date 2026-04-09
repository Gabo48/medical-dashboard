"use client"

import { useState, useMemo } from "react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { OverviewSection } from "@/components/dashboard/overview-section"
import { PatientsTable } from "@/components/dashboard/patients-table"
import { PatientDetail } from "@/components/dashboard/patient-detail"
import { KPICard } from "@/components/dashboard/kpi-card"
import { patients, aggregateMetrics } from "@/lib/mock-data"
import type { Patient } from "@/lib/mock-data"
import { 
  Calendar, 
  Menu,
  Heart,
  Search
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Patients Section with Search
function PatientsSection({ onSelectPatient }: { onSelectPatient: (patient: Patient) => void }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return patients
    const query = searchQuery.toLowerCase().trim()
    return patients.filter(p => p.name.toLowerCase().includes(query))
  }, [searchQuery])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pacientes</h1>
          <p className="text-sm text-muted-foreground">
            Gestión y seguimiento de todos los pacientes
          </p>
        </div>
        
        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>
      </div>

      {filteredPatients.length > 0 ? (
        <PatientsTable 
          patients={filteredPatients} 
          onSelectPatient={onSelectPatient}
        />
      ) : (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <Search className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">Sin resultados</h3>
          <p className="text-sm text-muted-foreground mt-1">
            No se encontraron pacientes con el nombre &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const metrics = aggregateMetrics()

  const renderContent = () => {
    if (selectedPatient) {
      return (
        <PatientDetail 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)} 
        />
      )
    }

    switch (activeSection) {
      case "overview":
        return <OverviewSection />
      
      case "patients":
        return <PatientsSection onSelectPatient={setSelectedPatient} />
      
      case "appointments":
        return (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Citas Médicas</h1>
              <p className="text-sm text-muted-foreground">
                Gestión de eventos y citas programadas
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <KPICard
                title="Citas Totales"
                value={patients.reduce((sum, p) => sum + p.appointmentsTotal, 0)}
                icon={<Calendar className="h-4 w-4" />}
              />
              <KPICard
                title="Asistencia Promedio"
                value={`${Math.round(patients.reduce((sum, p) => sum + p.appointmentRate, 0) / patients.length)}%`}
                trend="up"
                trendValue="Buen cumplimiento"
                variant="success"
              />
              <KPICard
                title="Citas Perdidas"
                value={patients.reduce((sum, p) => sum + p.missedEvents + p.cancelledEvents, 0)}
                variant="warning"
              />
            </div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Asistencia por Paciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patients.map(patient => (
                    <div 
                      key={patient.id} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                          {patient.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {patient.appointmentsAttended}/{patient.appointmentsTotal} citas asistidas
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={cn(
                            "font-mono text-sm",
                            patient.appointmentRate >= 80 ? "text-success" : 
                            patient.appointmentRate >= 60 ? "text-warning" : "text-destructive"
                          )}>
                            {patient.appointmentRate}%
                          </p>
                          <p className="text-xs text-muted-foreground">Asistencia</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarNav 
          activeSection={activeSection} 
          onSectionChange={(section) => {
            setActiveSection(section)
            setSelectedPatient(null)
          }} 
        />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-sidebar border-b border-sidebar-border z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/20">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="text-lg font-bold text-foreground">Sarah</span>
              <p className="text-xs text-muted-foreground">Dashboards</p>
            </div>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-sidebar border-sidebar-border p-0">
              <SidebarNav 
                activeSection={activeSection} 
                onSectionChange={(section) => {
                  setActiveSection(section)
                  setSelectedPatient(null)
                  setMobileMenuOpen(false)
                }} 
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="md:ml-56 pt-16 md:pt-0">
        <div className="p-4 md:p-6 max-w-7xl">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

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
import type { PatientIntentData } from "@/lib/mock-data"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface IntentsByTypeProps {
  data: PatientIntentData[]
  totalMessages: number
}

const intentColors: Record<string, string> = {
  report_adherence: "hsl(var(--success))",
  report_non_adherence: "hsl(var(--destructive))",
  report_symptom: "hsl(var(--warning))",
  negative_emotion: "hsl(var(--chart-4))",
  positive_emotion: "hsl(var(--chart-2))",
  show_resistance: "hsl(var(--destructive))",
  request_help: "hsl(var(--primary))",
  express_doubt: "hsl(var(--chart-3))",
  confirm: "hsl(var(--success))",
  partial_response: "hsl(var(--muted-foreground))"
}

export function IntentsByType({ data, totalMessages }: IntentsByTypeProps) {
  if (data.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            Interacciones por Intención
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-muted-foreground">Sin datos de intenciones</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
          Interacciones por Intención
          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
            {totalMessages} mensajes totales
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Horizontal Bar Chart */}
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              layout="vertical" 
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                dataKey="label" 
                type="category" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} 
                axisLine={false} 
                tickLine={false}
                width={115}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value: number, name: string, props: { payload: PatientIntentData }) => [
                  `${value} mensajes (${props.payload.percentage}%)`, 
                  "Cantidad"
                ]}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.intent} fill={intentColors[entry.intent] || "hsl(var(--primary))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Data Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider py-2">Intención</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-center py-2">Mensajes</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-center py-2">Porcentaje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.intent} className="hover:bg-muted/20">
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: intentColors[item.intent] || "hsl(var(--primary))" }}
                      />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-2">
                    <span className="text-sm font-medium text-foreground">{item.count}</span>
                  </TableCell>
                  <TableCell className="text-center py-2">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                      item.percentage >= 15 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      {item.percentage}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

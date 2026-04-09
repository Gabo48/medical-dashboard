"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from "recharts"
import type { AdherenceHistory } from "@/lib/mock-data"

interface AdherenceChartProps {
  data: AdherenceHistory[]
  title?: string
}

export function AdherenceChart({ data, title = "Adherencia al Tratamiento" }: AdherenceChartProps) {
  return (
    <Card className="border-border" style={{ backgroundColor: "var(--chart-panel-bg)" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="adherenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-adherence)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--chart-adherence)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--chart-grid)" 
                strokeOpacity={0.3}
                vertical={true} 
              />
              <XAxis 
                dataKey="date" 
                tick={{ fill: "var(--chart-grid)", fontSize: 11 }}
                axisLine={{ stroke: "var(--chart-grid)", strokeOpacity: 0.5 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: "var(--chart-grid)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--foreground)"
                }}
                labelStyle={{ color: "var(--foreground)" }}
                formatter={(value: number) => [`${value.toFixed(0)}%`, "Adherencia"]}
              />
              <Legend 
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => <span style={{ color: "var(--foreground)", fontSize: "12px" }}>{value}</span>}
              />
              <ReferenceLine 
                y={80} 
                stroke="var(--chart-target)" 
                strokeDasharray="3 3"
                strokeWidth={2}
                label={{ value: 'Meta 80%', position: 'right', fill: 'var(--chart-target)', fontSize: 10 }}
              />
              <Area 
                type="monotone" 
                dataKey="adherence"
                name="Adherencia"
                stroke="var(--chart-adherence)" 
                strokeWidth={2}
                fill="url(#adherenceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

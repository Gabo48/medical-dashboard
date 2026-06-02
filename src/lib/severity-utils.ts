/**
 * Severity utilities for symptoms, side effects, and clinical metrics
 * Supports both numeric (0-7) and string ("mild", "moderate", "severe") scales
 */

import { SEVERITY_THRESHOLDS } from "./thresholds"

export type SeverityLevel = "mild" | "moderate" | "severe"

export interface SeverityConfig {
  label: string
  bgColor: string
  textColor: string
  badgeColor: string
}

// ─── Numeric Severity (0-7 scale) ────────────────────────────────────────────

/**
 * Get severity configuration for numeric severity (0-7 scale)
 * Used in symptoms-list and clinical metrics
 */
export function getSeverityConfig(severity: number): SeverityConfig {
  if (severity <= SEVERITY_THRESHOLDS.MILD_MAX) {
    return {
      label: "Leve",
      bgColor: "bg-success/15",
      textColor: "text-success",
      badgeColor: "bg-success text-success-foreground",
    }
  } else if (severity <= SEVERITY_THRESHOLDS.MODERATE_MAX) {
    return {
      label: "Moderado",
      bgColor: "bg-warning/15",
      textColor: "text-warning",
      badgeColor: "bg-warning text-warning-foreground",
    }
  } else {
    return {
      label: "Severo",
      bgColor: "bg-destructive/15",
      textColor: "text-destructive",
      badgeColor: "bg-destructive text-destructive-foreground",
    }
  }
}

/**
 * Get badge color classes for numeric severity
 * Returns Tailwind classes for consistent badge styling
 */
export function getSeverityBadgeColor(severity: number): string {
  if (severity === 0) return "bg-success/20 text-success"
  if (severity <= SEVERITY_THRESHOLDS.MILD_MAX) return "bg-success/20 text-success"
  if (severity <= SEVERITY_THRESHOLDS.MODERATE_MAX - 1) return "bg-warning/20 text-warning"
  if (severity === SEVERITY_THRESHOLDS.MODERATE_MAX) return "bg-orange-500/20 text-orange-600"
  return "bg-destructive/20 text-destructive"
}

/**
 * Get CSS color variable for numeric severity
 * Used in charts (Recharts)
 */
export function getSeverityColorVar(severity: number): string {
  if (severity <= SEVERITY_THRESHOLDS.MILD_MAX) return "var(--success)"
  if (severity <= SEVERITY_THRESHOLDS.MODERATE_MAX) return "var(--warning)"
  return "var(--destructive)"
}

// ─── String Severity ("mild", "moderate", "severe") ──────────────────────────

/**
 * Get CSS color variable for string severity
 * Used in side-effects-chart
 */
export function getSeverityColorVarFromString(severity: string): string {
  if (severity === "mild") return "var(--success)"
  if (severity === "moderate") return "var(--warning)"
  return "var(--destructive)"
}

/**
 * Convert numeric severity to string level
 */
export function numericToSeverityLevel(severity: number): SeverityLevel {
  if (severity <= SEVERITY_THRESHOLDS.MILD_MAX) return "mild"
  if (severity <= SEVERITY_THRESHOLDS.MODERATE_MAX) return "moderate"
  return "severe"
}

/**
 * Check if severity triggers an alert
 */
export function isSeverityAlert(severity: number): boolean {
  return severity >= SEVERITY_THRESHOLDS.ALERT_THRESHOLD
}

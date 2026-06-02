/**
 * Business thresholds and constants for clinical metrics
 * Centralized to ensure consistency across the application
 */

// ─── Adherence Thresholds ────────────────────────────────────────────────────
export const ADHERENCE_THRESHOLDS = {
  /** High adherence - patient is on track */
  HIGH: 80,
  /** Medium adherence - needs monitoring */
  MEDIUM: 60,
  /** Alternative threshold for stacked bars */
  GOOD: 75,
  /** Alternative threshold for stacked bars */
  MODERATE: 50,
} as const

// ─── Severity Thresholds (0-7 scale) ─────────────────────────────────────────
export const SEVERITY_THRESHOLDS = {
  /** Maximum severity for "mild" classification */
  MILD_MAX: 2,
  /** Maximum severity for "moderate" classification */
  MODERATE_MAX: 5,
  /** Threshold that triggers escalation alerts */
  ALERT_THRESHOLD: 6,
  /** Maximum possible severity value */
  MAX_VALUE: 7,
} as const

// ─── GHQ-12 Thresholds (Estado Emocional) ────────────────────────────────────
export const GHQ12_THRESHOLDS = {
  /** Maximum score for "sin malestar" (no distress) */
  NO_DISTRESS_MAX: 2,
  /** Maximum score for "malestar moderado" */
  MODERATE_DISTRESS_MAX: 6,
  /** Score that triggers clinical alert */
  ALERT_THRESHOLD: 7,
  /** Maximum possible GHQ-12 score */
  MAX_VALUE: 12,
} as const

// ─── Readiness Ruler Thresholds (Motivation) ─────────────────────────────────
export const READINESS_THRESHOLDS = {
  /** Score at or below which patient is considered at risk */
  LOW_MOTIVATION: 2,
  /** Score at or above which patient is considered engaged */
  HIGH_MOTIVATION: 4,
  /** Minimum possible score */
  MIN_VALUE: 1,
  /** Maximum possible score */
  MAX_VALUE: 5,
} as const

// ─── Risk Level Configuration ────────────────────────────────────────────────
export const RISK_LEVELS = {
  /** Very high risk - immediate escalation needed */
  VERY_HIGH: 1,
  /** High risk - intervention required this week */
  HIGH: 2,
  /** Moderate risk - enhanced monitoring */
  MODERATE: 3,
  /** Low risk - standard follow-up */
  LOW: 4,
  /** Very low risk - patient stable */
  VERY_LOW: 5,
} as const

// ─── Time-based Thresholds ───────────────────────────────────────────────────
export const TIME_THRESHOLDS = {
  /** Days of silence that trigger alert */
  SILENCE_ALERT_DAYS: 7,
  /** Weeks of low readiness that trigger protocol */
  LOW_READINESS_WEEKS: 2,
} as const

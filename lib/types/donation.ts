/**
 * Donation Database Schema Types
 * 
 * These types represent the structure for storing donations in the database.
 * Adapt these to your database ORM (Prisma, TypeORM, Mongoose, etc.)
 */

export interface Donation {
  id: string // UUID
  reference: string // Unique Paystack reference
  email: string
  amount: number // Amount in GHS
  currency: string // e.g., "GHS"
  status: DonationStatus
  anonymous: boolean
  metadata: DonationMetadata
  payment_channel: string // e.g., "card", "bank", "mobile_money"
  created_at: Date
  verified_at?: Date
  paid_at?: Date
  gateway_response?: string
  event_id?: string // Webhook event ID for idempotency
}

export type DonationStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED"

export interface DonationMetadata {
  donation_type?: string
  campaign?: string
  donor_name?: string
  anonymous?: boolean
  custom_fields?: Array<{
    display_name: string
    variable_name: string
    value: string
  }>
  [key: string]: any
}

/**
 * Example Prisma Schema:
 * 
 * model Donation {
 *   id            String   @id @default(uuid())
 *   reference     String   @unique
 *   email         String
 *   amount        Float
 *   currency      String   @default("GHS")
 *   status        String   @default("PENDING")
 *   anonymous     Boolean  @default(false)
 *   metadata      Json
 *   payment_channel String?
 *   created_at    DateTime @default(now())
 *   verified_at   DateTime?
 *   paid_at       DateTime?
 *   gateway_response String?
 *   event_id      String?
 * 
 *   @@index([reference])
 *   @@index([email])
 *   @@index([status])
 *   @@index([created_at])
 * }
 */

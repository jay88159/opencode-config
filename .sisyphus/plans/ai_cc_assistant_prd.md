# Product Requirements Document (PRD): "CreditWhisper" AI Assistant

**Version:** 1.0
**Status:** Draft
**Platform:** Mobile App (iOS/Android)
**Core Focus:** Semantic Analysis (Benefit & Fine Print Decoding)

---

## 1. Executive Summary
**CreditWhisper** is an AI-powered mobile concierge that helps US consumers maximize their credit card utility not by tracking every penny of debt, but by **decoding the complex fine print of benefits, insurance, and terms**.

Unlike traditional trackers (Mint, YNAB) that focus on *math* (budgeting), CreditWhisper focuses on *language* (benefits). It solves the problem: "I have premium cards, but I forget to use the perks or don't know if I'm covered."

## 2. Target Audience
*   **The "Benefit-Blind" Premium User:** Holds cards with annual fees (Amex Platinum, CSR) but forgets to use monthly credits (Uber, Dining).
*   **The Anxious Traveler:** Needs instant answers about travel insurance, rental waivers, and lost luggage coverage without digging through PDF guides.
*   **The Privacy Advocate:** Wants AI assistance but refuses to link bank credentials via Plaid.

## 3. User Stories
1.  **As a user**, I want to take a photo of my physical card carrier or statement so that the app knows what benefits I have without manual entry.
2.  **As a traveler**, I want to ask "Which of my cards gives me free checked bags on United?" and get an immediate, accurate answer.
3.  **As a spender**, I want to upload a "Terms Update" letter from my bank to know if my APR or fees have changed.
4.  **As an applicant**, I want to find a new card specifically to fill a "benefit gap" (e.g., "I need a card with cell phone protection") rather than just generic points.

## 4. Functional Requirements

### 4.1. Data Ingestion (The "Manual" Pipeline)
*   **Camera Scan (OCR):**
    *   Ability to scan physical paper statements, "Terms Change" letters, and card carrier pamphlets.
    *   On-device OCR to extract text before processing.
*   **File Import:**
    *   Support for PDF upload (via iOS/Android Share Sheet) for digital statements and "Guide to Benefits" documents.
*   **Card Recognition:**
    *   Visual recognition of card design to auto-populate baseline public benefits (e.g., recognizing a "Chase Sapphire Reserve" visually).

### 4.2. The "Semantic" AI Engine (Core Value)
*   **Benefit Knowledge Graph:**
    *   AI maps extracted text to standardized categories: *Travel Insurance*, *Purchase Protection*, *Extended Warranty*, *Lounge Access*, *Monthly Credits*.
*   **Fine Print Decoder:**
    *   Translates "Secondary Collision Damage Waiver" into plain English: "This covers your rental car only AFTER your personal insurance pays."
*   **Natural Language Search:**
    *   Users can type/speak queries: "Does my Citigard cover a stolen iPhone?" -> AI checks specific Guide to Benefits.

### 4.3. Advisory & Management
*   **"Perk Reminders":**
    *   Notifications for "Use it or lose it" benefits (e.g., "You haven't used your $10 dining credit this month").
    *   *Trigger:* Manual check-in or user-set reminder (since no real-time transaction feed).
*   **Statement Audit (Security):**
    *   User uploads monthly PDF -> AI highlights:
        *   Unexpected fee codes.
        *   Interest rate changes.
        *   Membership renewal warnings.

### 4.4. Application Assistance
*   **Gap Analysis:**
    *   AI analyzes current portfolio benefits and suggests cards that offer *missing* protections (e.g., "You have no cards with Primary Rental Insurance. Consider the Chase Sapphire Preferred.").
*   **Application Prep:**
    *   Provides a "Pre-flight Checklist" for applications based on user's self-reported data (Income, Housing cost) to improve approval odds.

## 5. Non-Functional Requirements
*   **Privacy & Security:**
    *   **Zero-Knowledge Architecture:** OCR occurs on-device or via ephemeral cloud instances. No data is sold to third parties.
    *   **Redaction:** Auto-redact full account numbers from uploaded PDFs before analysis.
*   **Performance:**
    *   OCR + Analysis latency < 5 seconds per document.
    *   Offline mode for viewing cached "Guide to Benefits."

## 6. Roadmap / Phases
*   **Phase 1 (MVP):** iOS App, Card Recognition, "Guide to Benefits" Chatbot.
*   **Phase 2:** PDF Statement Audit for fees/interest.
*   **Phase 3:** "Gap Analysis" for new card recommendations.

## 7. Success Metrics
*   **Engagement:** % of users who ask at least 1 "Benefit Query" per week.
*   **Retention:** Monthly uploads of statements (habit formation).
*   **Value:** Est. dollar value of "Redeemed Perks" discovered by AI.

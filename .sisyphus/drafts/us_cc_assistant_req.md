# Draft: US Credit Card AI Concierge - Product Requirement Document (PRD)

## Project Overview
**Goal**: Create a medium-length, actionable PRD for an AI-powered Credit Card Assistant for the US Market.
**Core Value**: meaningful management and application assistance (beyond generic advice).

## 1. User Personas (Confirmed)
*   **The Privacy-Conscious Hybrid User:** Wants insights on both debt and rewards but refuses to link bank credentials. Willing to upload PDFs/Screenshots for "offline" analysis.

## 2. Core Feature Areas (Refined)
### A. Data Ingestion (The "Manual" Constraint)
- [ ] **Smart OCR / Document Intelligence**: Extract transactions, APRs, and fees from PDF statements and screenshots.
- [ ] **Privacy-First Storage**: Local-only or encrypted-at-rest data handling.

### B. Management (Advisory)
- [ ] **Statement Audit**: AI analyzes uploaded statements to flag:
    - Recurring subscriptions (forgotten trials).
    - Anomalous spending (potential fraud).
    - High-interest alerts (if carrying balance).
- [ ] **Natural Language Query**: "How much did I spend on Uber across all cards last month?"
- [ ] **"Next Payment" Strategy**: Calculator showing optimal payment distribution to maximize score improvement or minimize interest.

### C. Application Assistance (Advisory)
- [ ] **Portfolio Gap Analysis**: "Based on your spending (extracted from PDFs), you are missing 2% back on Dining."
- [ ] **Eligibility Estimator**: Heuristic-based approval odds (e.g., checking 5/24 status based on open dates found in statements).
- [ ] **Application Prep**: AI generates a "Cheat Sheet" of income/housing figures to help user fill out forms manually.

## 3. Technical Strategy
- **Frontend**: Mobile-First (Camera for statements/receipts).
- **AI Processing**: LLM with Vision capabilities (for screenshots/PDFs).
- **Security**: No banking credentials stored.

## Open Questions
1.  **Specific "AI" Magic**: Should the AI focus on *financial analysis* (numbers) or *semantic analysis* (reading fine print/benefits)?
2.  **Platform**: Mobile App (iOS/Android) or Web Portal?

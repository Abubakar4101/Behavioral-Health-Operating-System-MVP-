# Technology Stack: Costs & Accounts Breakdown

To maintain and deploy the **BHOS / Ventally** platform, here is the breakdown of the services used and their associated costs. 

### 1. Hosting & Deployment (Vercel)
*   **Service**: [Vercel](https://vercel.com/)
*   **Purpose**: Hosting the frontend, API routes, and database connections.
*   **Status**: Currently running in development.
*   **Cost**: 
    *   **Hobby Plan**: $0/mo (Good for initial demo/testing).
    *   **Pro Plan**: $20/mo per user (Recommended for production to get better performance and custom domains).
*   **Account Access Required**: You will need to create a Vercel account and link it to the GitHub repository.

### 2. Domain Name
*   **Service**: Namecheap, Google Domains, or GoDaddy.
*   **Purpose**: The web address (e.g., `www.ventally.com`).
*   **Cost**: ~$10 - $20 per year.
*   **Account Access Required**: Login details for the registrar where the domain is purchased.

### 3. Payment Processing (Stripe)
*   **Service**: [Stripe](https://stripe.com/)
*   **Purpose**: Handles all clinic billing and patient payments shown in the "Billing" section.
*   **Status**: Currently using "MOCK" mode for the demo.
*   **Cost**: Pay-as-you-go (2.9% + 30¢ per successful transaction). No monthly fee.
*   **Account Access Required**: A Stripe account will need to be connected via API Keys.

### 4. Telehealth & Video (Daily.co or Mux)
*   **Service**: Recommended [Daily.co](https://www.daily.co/) or [Mux](https://www.mux.com/).
*   **Purpose**: Powers the real-time video sessions.
*   **Status**: Currently using a simulated video UI.
*   **Cost**: 
    *   **Daily.co**: First 10,000 minutes free/mo, then ~$0.0015/min.
*   **Account Access Required**: API Dashboard access.

### 5. Frontend Framework (Open Source - FREE)
*   **Services**: Next.js 15, Tailwind CSS, Framer Motion, Lucide Icons.
*   **Cost**: $0. These are professional, open-source libraries with no licensing fees.

---

### Summary of Immediate Monthly Costs
| Item | Cost (Hobby/Start) | Cost (Professional) |
| :--- | :--- | :--- |
| **Hosting (Vercel)** | $0 | $20 |
| **Domain** | $1.50 (avg) | $1.50 (avg) |
| **Stripe** | $0 (Transfers only) | $0 (Transfers only) |
| **Video API** | $0 (First 10k mins) | ~$15 (Usage based) |
| **TOTAL** | **~$1.50 / mo** | **~$35 - $40 / mo** |

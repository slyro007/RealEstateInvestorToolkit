import { PromptTemplate } from 'langchain/prompts';

export const dealAnalysisPrompt = new PromptTemplate({
  template: `You are an expert real estate investment analyst. Analyze the following property deal:

Address: {address}
Purchase Price: ${purchasePrice}
Rehab Estimate: ${rehabEstimate}

Additional Information:
{additionalInfo}

Please analyze this deal considering:
1. Market conditions and trends
2. Comparable sales in the area
3. Potential after-repair value (ARV)
4. Estimated holding costs
5. Financing options and costs
6. Potential ROI and cash-on-cash return
7. Risk factors and mitigation strategies

Format your response as a structured JSON object with the following schema:
{
  "address": string,
  "purchasePrice": number,
  "arv": number,
  "rehabCost": number,
  "holdingCosts": number,
  "roi": number,
  "cashOnCash": number,
  "capRate": number,
  "comps": [
    {
      "address": string,
      "price": number,
      "sqft": number,
      "distance": number // in miles
    }
  ]
}

Include detailed explanations for your calculations and assumptions.`,
  inputVariables: ['address', 'purchasePrice', 'rehabEstimate', 'additionalInfo'],
}); 
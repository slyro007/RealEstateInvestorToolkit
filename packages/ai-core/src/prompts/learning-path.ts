import { PromptTemplate } from 'langchain/prompts';

export const learningPathPrompt = new PromptTemplate({
  template: `You are an expert real estate investment coach. Create a personalized learning path for a {level} investor with the following goals:
{goals}

The investor can dedicate {weeklyHours} hours per week to learning.

Consider the following aspects in your response:
1. Core concepts and fundamentals
2. Market analysis and due diligence
3. Deal structuring and financing
4. Property management and operations
5. Risk management and legal considerations

Format your response as a structured JSON object with the following schema:
{
  "level": "beginner|intermediate|advanced",
  "goals": string[],
  "weeklyHours": number,
  "modules": [
    {
      "title": string,
      "description": string,
      "duration": number, // in hours
      "resources": [
        {
          "title": string,
          "url": string,
          "type": "article|video|course|book"
        }
      ]
    }
  ]
}`,
  inputVariables: ['level', 'goals', 'weeklyHours'],
}); 
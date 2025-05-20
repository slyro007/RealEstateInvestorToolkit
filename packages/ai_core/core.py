"""
Core AI functionality for interacting with OpenAI and other LLM services
"""

import json
from typing import Dict, Any, Optional
import openai
import structlog

logger = structlog.getLogger()

class AICore:
    """
    Core AI functionality for interacting with OpenAI and other LLM services
    """
    
    def __init__(self, api_key: str):
        """
        Initialize the AI Core with the OpenAI API key
        """
        self.api_key = api_key
        self.client = openai.OpenAI(api_key=api_key)
        self.schemas = __import__("packages.ai_core.schemas", fromlist=["*"])
    
    async def chatCompletion(
        self,
        prompt: str,
        model: str = "gpt-4",
        temperature: float = 0.7,
        max_tokens: int = 1000,
    ) -> str:
        """
        Get a completion from the OpenAI chat API
        """
        try:
            response = self.client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": "You are a helpful AI assistant for real estate investors."},
                    {"role": "user", "content": prompt}
                ],
                temperature=temperature,
                max_tokens=max_tokens
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            logger.error("chat_completion_failed", error=str(e))
            raise
    
    async def parseStructuredOutput(
        self,
        prompt: str,
        schema: Dict[str, Any],
        model: str = "gpt-4",
        temperature: float = 0.7,
        max_tokens: int = 1000,
    ) -> Dict[str, Any]:
        """
        Get a structured output from the OpenAI API based on the provided schema
        """
        try:
            schema_str = json.dumps(schema, indent=2)
            
            completion_prompt = f"""
            {prompt}
            
            Respond with a valid JSON object following this schema:
            {schema_str}
            """
            
            response = await self.chatCompletion(
                prompt=completion_prompt,
                model=model,
                temperature=temperature,
                max_tokens=max_tokens
            )
            
            # Parse JSON response
            try:
                result = json.loads(response)
                return result
            except json.JSONDecodeError:
                # Try to extract JSON from the response if it's embedded in markdown or other text
                try:
                    json_match = response.strip().split("```json")[1].split("```")[0].strip()
                    return json.loads(json_match)
                except (IndexError, json.JSONDecodeError):
                    logger.error("json_parsing_failed", response=response)
                    raise ValueError("Failed to parse JSON response")
                
        except Exception as e:
            logger.error("structured_output_failed", error=str(e))
            raise 
"""
JSON schemas for structured output from AI
"""

# Learning path schema
learningPath = {
    "type": "object",
    "properties": {
        "level": {
            "type": "string",
            "description": "Skill level (beginner, intermediate, advanced)"
        },
        "goals": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "Learning goals"
        },
        "weekly_hours": {
            "type": "integer",
            "description": "Hours per week dedicated to learning"
        },
        "modules": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Module title"
                    },
                    "description": {
                        "type": "string",
                        "description": "Module description"
                    },
                    "estimated_time": {
                        "type": "string",
                        "description": "Estimated time to complete"
                    },
                    "resources": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "type": "string",
                                    "description": "Resource title"
                                },
                                "type": {
                                    "type": "string",
                                    "description": "Resource type (article, video, book, etc.)"
                                },
                                "url": {
                                    "type": "string",
                                    "description": "URL to the resource"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "required": ["level", "goals", "weekly_hours", "modules"]
}

# Deal analysis schema
dealAnalysis = {
    "type": "object",
    "properties": {
        "address": {
            "type": "string",
            "description": "Property address"
        },
        "purchase_price": {
            "type": "number",
            "description": "Purchase price of the property"
        },
        "rehab_estimate": {
            "type": "number",
            "description": "Estimated rehabilitation costs"
        },
        "arv": {
            "type": "number",
            "description": "After Repair Value - estimated value after renovations"
        },
        "rental_income": {
            "type": "number",
            "description": "Estimated monthly rental income"
        },
        "monthly_expenses": {
            "type": "object",
            "properties": {
                "property_tax": {"type": "number"},
                "insurance": {"type": "number"},
                "property_management": {"type": "number"},
                "maintenance": {"type": "number"},
                "utilities": {"type": "number"},
                "vacancy": {"type": "number"}
            }
        },
        "cash_flow": {
            "type": "number",
            "description": "Estimated monthly cash flow"
        },
        "cap_rate": {
            "type": "number",
            "description": "Capitalization rate"
        },
        "roi": {
            "type": "number",
            "description": "Return on investment"
        },
        "recommendation": {
            "type": "string",
            "description": "Investment recommendation"
        }
    },
    "required": [
        "address", "purchase_price", "rehab_estimate", "arv", 
        "rental_income", "monthly_expenses", "cash_flow", 
        "cap_rate", "roi", "recommendation"
    ]
} 
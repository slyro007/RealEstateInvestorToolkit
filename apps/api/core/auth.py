from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import httpx
import structlog
from opentelemetry import trace
from apps.api.core.config import settings
import os

logger = structlog.getLogger()
tracer = trace.get_tracer(__name__)
security = HTTPBearer()

class User:
    def __init__(self, id: str, email: str, first_name: str, last_name: str):
        self.id = id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name

async def verify_token(token: str) -> dict:
    """
    Verify the JWT token with Clerk's API
    """
    # During development, if we're running the app locally without a frontend
    # and need to test the API without proper auth, enable this
    if os.environ.get('API_ENV') == 'development':
        logger.warning("Using development authentication mode")
        return {
            "id": "dev_user_123",
            "email_addresses": [{"email_address": "dev@example.com"}],
            "first_name": "Dev",
            "last_name": "User"
        }
        
    span = tracer.start_span("verify_token")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.clerk.dev/v1/me",
                headers={
                    "Authorization": f"Bearer {token}",
                    "Content-Type": "application/json"
                }
            )
            
            if response.status_code != 200:
                logger.error(
                    "token_verification_failed",
                    status_code=response.status_code,
                    response=response.text
                )
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication credentials"
                )
            
            return response.json()
            
    except Exception as e:
        logger.error("token_verification_error", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    finally:
        span.end()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> User:
    """
    Get the current authenticated user
    """
    span = tracer.start_span("get_current_user")
    
    try:
        # Verify the token
        user_data = await verify_token(credentials.credentials)
        
        # Create user object
        user = User(
            id=user_data["id"],
            email=user_data["email_addresses"][0]["email_address"],
            first_name=user_data["first_name"],
            last_name=user_data["last_name"]
        )
        
        logger.info(
            "user_authenticated",
            user_id=user.id,
            email=user.email
        )
        
        return user
        
    except Exception as e:
        logger.error("user_authentication_failed", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    finally:
        span.end() 
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
import structlog
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer()
    ]
)
logger = structlog.getLogger()

# Configure OpenTelemetry
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

if os.getenv("OTEL_ENDPOINT"):
    otlp_exporter = OTLPSpanExporter(
        endpoint=os.getenv("OTEL_ENDPOINT"),
        insecure=True
    )
    span_processor = BatchSpanProcessor(otlp_exporter)
    trace.get_tracer_provider().add_span_processor(span_processor)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("starting_up")
    yield
    # Shutdown
    logger.info("shutting_down")

app = FastAPI(
    title="AI Real Estate Investor Hub API",
    description="API for the AI Real Estate Investor Hub platform",
    version="0.1.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instrument FastAPI with OpenTelemetry
FastAPIInstrumentor.instrument_app(app)

# Import and include routers
from apps.api.routers import (
    education,
    marketing,
    sales,
    analysis,
    finance,
    operations
)

app.include_router(education.router, prefix="/api/education", tags=["Education"])
app.include_router(marketing.router, prefix="/api/marketing", tags=["Marketing"])
app.include_router(sales.router, prefix="/api/sales", tags=["Sales"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["Analysis"])
app.include_router(finance.router, prefix="/api/finance", tags=["Finance"])
app.include_router(operations.router, prefix="/api/operations", tags=["Operations"])

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 
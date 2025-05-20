from sqlalchemy import Column, String, Integer, ForeignKey, Float, Enum, JSON
from sqlalchemy.orm import relationship
import enum
from apps.api.models.base import Base

class DealStatus(str, enum.Enum):
    PROSPECT = "prospect"
    UNDER_CONTRACT = "under_contract"
    IN_REHAB = "in_rehab"
    FOR_SALE = "for_sale"
    SOLD = "sold"
    ARCHIVED = "archived"

class LeadSource(str, enum.Enum):
    WEBSITE = "website"
    REFERRAL = "referral"
    COLD_CALL = "cold_call"
    DRIVING_FOR_DOLLARS = "driving_for_dollars"
    SOCIAL_MEDIA = "social_media"
    OTHER = "other"

class Deal(Base):
    """
    Deal model for tracking real estate investment deals
    """
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    zip_code = Column(String, nullable=False)
    purchase_price = Column(Float, nullable=False)
    rehab_estimate = Column(Float)
    arv = Column(Float)  # After Repair Value
    status = Column(Enum(DealStatus), default=DealStatus.PROSPECT)
    analysis = Column(JSON)  # Store AI analysis results
    notes = Column(String)
    
    # Relationships
    user = relationship("User", back_populates="deals")
    lead = relationship("Lead", back_populates="deal", uselist=False)
    tasks = relationship("Task", back_populates="deal")
    
    def __repr__(self):
        return f"<Deal {self.address}>"

class Lead(Base):
    """
    Lead model for tracking potential deals and seller leads
    """
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    deal_id = Column(Integer, ForeignKey('deal.id'))
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    phone = Column(String)
    source = Column(Enum(LeadSource), nullable=False)
    status = Column(String, default="new")  # new, contacted, qualified, unqualified
    notes = Column(String)
    last_contact = Column(String)  # JSON with contact history
    
    # Relationships
    user = relationship("User", back_populates="leads")
    deal = relationship("Deal", back_populates="lead")
    tasks = relationship("Task", back_populates="lead")
    
    def __repr__(self):
        return f"<Lead {self.first_name} {self.last_name}>"

class Task(Base):
    """
    Task model for tracking deal and lead-related tasks
    """
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    deal_id = Column(Integer, ForeignKey('deal.id'))
    lead_id = Column(Integer, ForeignKey('lead.id'))
    title = Column(String, nullable=False)
    description = Column(String)
    due_date = Column(String)  # ISO format date
    status = Column(String, default="pending")  # pending, completed, cancelled
    priority = Column(String, default="medium")  # low, medium, high
    
    # Relationships
    deal = relationship("Deal", back_populates="tasks")
    lead = relationship("Lead", back_populates="tasks")
    
    def __repr__(self):
        return f"<Task {self.title}>" 
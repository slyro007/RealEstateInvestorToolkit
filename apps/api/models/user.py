from sqlalchemy import Column, String, Integer, ForeignKey, Table, Enum
from sqlalchemy.orm import relationship
import enum
from apps.api.models.base import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    INVESTOR = "investor"
    AGENT = "agent"
    CONTRACTOR = "contractor"

# Association table for user preferences
user_preferences = Table(
    'user_preferences',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id'), primary_key=True),
    Column('preference_id', Integer, ForeignKey('preference.id'), primary_key=True)
)

class User(Base):
    """
    User model representing a platform user
    """
    id = Column(Integer, primary_key=True)
    clerk_id = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    role = Column(Enum(UserRole), default=UserRole.INVESTOR)
    
    # Relationships
    preferences = relationship("Preference", secondary=user_preferences, back_populates="users")
    learning_paths = relationship("LearningPath", back_populates="user")
    deals = relationship("Deal", back_populates="user")
    leads = relationship("Lead", back_populates="user")
    
    def __repr__(self):
        return f"<User {self.email}>"

class Preference(Base):
    """
    User preferences model
    """
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    value = Column(String)
    
    # Relationships
    users = relationship("User", secondary=user_preferences, back_populates="preferences")
    
    def __repr__(self):
        return f"<Preference {self.name}>"

class LearningPath(Base):
    """
    Learning path model for tracking user education progress
    """
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    level = Column(String, nullable=False)  # beginner, intermediate, advanced
    goals = Column(String, nullable=False)  # JSON array of goals
    weekly_hours = Column(Integer, nullable=False)
    modules = Column(String, nullable=False)  # JSON array of modules
    progress = Column(Integer, default=0)  # Percentage complete
    
    # Relationships
    user = relationship("User", back_populates="learning_paths")
    
    def __repr__(self):
        return f"<LearningPath {self.user.email} - {self.level}>" 
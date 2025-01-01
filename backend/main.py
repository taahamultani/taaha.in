# .\venv\Scripts\activate  
# uvicorn main:app --reload 


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import re
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import pytz
from datetime import datetime

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Database setup
DATABASE = "final-db.sqlite"

# Define the data model for the request
class ResumeRequest(BaseModel):
    name: str
    email: EmailStr
    location: dict
    role: str

# Helper function to check email format with regex
def is_valid_email(email: str) -> bool:
    email_regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    return re.match(email_regex, email) is not None

# Function to send email with resume.txt attachment
def send_email(to_email: str):
    from_email = "automator.taaha@gmail.com"  # Replace with your email
    password = "cceouzmplrekhyyq"  # Replace with your email password
    subject = "Your Resume"
    body = "Please find your resume attached."

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Attach the resume.txt file
    filename = "resume.txt"
    with open(filename, "rb") as attachment:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f"attachment; filename= {filename}")
        msg.attach(part)

    # Send the email
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)  # For Gmail, use SMTP
        server.starttls()
        server.login(from_email, password)
        text = msg.as_string()
        server.sendmail(from_email, to_email, text)
        server.quit()
    except Exception as e:
        print(f"Error sending email: {e}")

# Create a database table if not exists with an additional column for location and role
def create_table():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS resumes (
                        name TEXT, 
                        email TEXT, 
                        location TEXT, 
                        role TEXT,
                        datetime TEXT)''')
    conn.commit()
    conn.close()

# Endpoint to accept resume data
@app.post("/resume")
async def submit_resume(resume: ResumeRequest):
    # Check if the email is valid
    if not is_valid_email(resume.email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    # Get current datetime in IST
    ist = pytz.timezone('Asia/Kolkata')
    current_datetime = datetime.now(ist)
    current_date = current_datetime.strftime('%Y-%m-%d')

    # Check if an email has already been sent today
    if resume.email != "devtaaha@gmail.com":
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM resumes WHERE email = ? AND datetime LIKE ?", (resume.email, f"{current_date}%"))
        if cursor.fetchone():
            conn.close()
            raise HTTPException(status_code=400, detail="Email already sent.")
        conn.close()

    # Store the data in the SQLite database
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO resumes (name, email, location, role, datetime) VALUES (?, ?, ?, ?, ?)", 
                   (resume.name, resume.email, str(resume.location), resume.role, current_datetime.strftime('%Y-%m-%d %H:%M:%S')))
    conn.commit()
    conn.close()

    # Send email with resume.txt
    send_email(resume.email)

    # Return success response
    return {"message": "Resume submitted successfully and email sent."}

# Create the table on startup
@app.on_event("startup")
def startup():
    create_table()

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

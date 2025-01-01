import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Zoho Mail credentials
email_user = "tm@taaha.in"
app_password = "SLEgzwVkrvEg"

# Email details
email_to = "devtaaha@gmail.com"
subject = "Automated Email via Python"
body = "Hello,\n\nThis is a test email sent using Zoho Mail and Python.\n\nBest regards,\nPython Script"

# Create the email
msg = MIMEMultipart()
msg["From"] = email_user
msg["To"] = email_to
msg["Subject"] = subject
msg.attach(MIMEText(body, "plain"))

try:
    # Connect to Zoho's SMTP server
    smtp_server = "smtp.zoho.com"
    smtp_port = 587

    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # Start TLS encryption
    server.login(email_user, app_password)  # Log in to the SMTP server

    # Send the email
    server.sendmail(email_user, email_to, msg.as_string())
    print("Email sent successfully!")
except Exception as e:
    print(f"Failed to send email: {e}")
finally:
    server.quit()  # Close the connection

from flask import Flask
import pandas as pd

app = Flask(__name__)

# Load dataset
df = pd.read_csv("data/Amazon Sales.csv", encoding="latin1")

print("Dataset Loaded Successfully!")
print(df.head())
print(df.columns)

@app.route("/")
def home():
    return "Backend Server Running"

if __name__ == "__main__":
    app.run(debug=True)
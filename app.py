from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import requests

app = Flask(__name__)

dataset = pd.read_csv(r'Crop_recommendation.csv')
X= dataset.iloc[:,:-1].values
y= dataset.iloc[:,-1].values

label_encoder = LabelEncoder()
y=label_encoder.fit_transform(y)

from sklearn.model_selection import train_test_split
X_train,X_test,Y_train,Y_test = train_test_split(X,y,test_size=0.2,random_state=0)

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

with open('random_forest_model.pkl', 'rb') as model_file:
    loaded_classifier = pickle.load(model_file)

@app.route('/')
def login():
    return render_template('login.html')
@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/mainsec')
def mainsec():
    return render_template('mainpage.html')
# Make sure the filename matches exactly
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/predict', methods=['POST'])
def predict():
   
    N = float(request.form['N'])
    P = float(request.form['P'])
    K = float(request.form['K'])
    temperature = float(request.form['temperature'])
    humidity = float(request.form['humidity'])
    ph = float(request.form['ph'])
    rainfall = float(request.form['rainfall'])
    input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    input_data_scaled = sc.transform(input_data)
    prediction_encoded = loaded_classifier.predict(input_data_scaled)
    prediction_label = label_encoder.inverse_transform(prediction_encoded)

    return render_template('result.html', prediction=prediction_label[0])

if __name__ == "__main__": 
    app.run(debug=True)

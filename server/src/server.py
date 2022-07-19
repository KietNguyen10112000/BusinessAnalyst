from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import pandas as pd

import pickle

model = pickle.load(open('model.bin', 'rb'))
pipe = pickle.load(open('pipe.bin', 'rb'))

app = Flask(__name__)
cors = CORS(app)
#app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api', methods=['GET'])
#@cross_origin()
def api():
  args = request.args
  fields = ['Age', 'BusinessTravel', 'DailyRate', 'Department', 'DistanceFromHome',
            'Education', 'EducationField', 'EmployeeNumber',
            'EnvironmentSatisfaction', 'Gender', 'HourlyRate', 'JobInvolvement',
            'JobLevel', 'JobRole', 'JobSatisfaction', 'MaritalStatus',
            'MonthlyIncome', 'MonthlyRate', 'NumCompaniesWorked', 'OverTime',
            'PercentSalaryHike', 'PerformanceRating', 'RelationshipSatisfaction',
            'StockOptionLevel', 'TotalWorkingYears', 'TrainingTimesLastYear',
            'WorkLifeBalance', 'YearsAtCompany', 'YearsInCurrentRole',
            'YearsSinceLastPromotion', 'YearsWithCurrManager']

  item = dict()

  for field in fields:
    val = args[field]
    if val.isdigit():
      val = int(val)
    item[field] = [val]

  l_df = pd.DataFrame.from_dict(item)
  l_data = pipe.transform(l_df)
  predictions = model.predict(l_data)
  
  return jsonify({ 'Attrition' : int(predictions[0]) })

app.run()
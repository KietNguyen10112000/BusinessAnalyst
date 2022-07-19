
import pandas as pd
import numpy as np

from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.model_selection import RepeatedStratifiedKFold
from sklearn.model_selection import RandomizedSearchCV
from sklearn.metrics import precision_score, recall_score, f1_score

import warnings
warnings.filterwarnings("ignore")

import pickle

#from prettytable import PrettyTable


df = pd.read_csv('data/WA_Fn-UseC_-HR-Employee-Attrition.csv')

cat_cols = df.select_dtypes(include=object).columns.tolist()
num_cols = df.select_dtypes(include=np.number).columns.tolist()

# Constant features (có std = 0 hoặc chỉ có 1 giá trị phân loại)
const_list = ['EmployeeCount', 'Over18', 'StandardHours']
# Drop constant features
df.drop(const_list, axis=1, inplace=True)

cat_cols.remove('Over18')
cat_cols.remove('Attrition')
num_cols.remove('EmployeeCount')
num_cols.remove('StandardHours')

df['Attrition'] = np.where(df['Attrition'] == 'Yes', 1, 0)
data = df.drop('Attrition', axis = 1)

pipe = ColumnTransformer([
     ('cat', OneHotEncoder(), cat_cols),
     ('num', StandardScaler() , num_cols)
])

print(data)

data_tofit = pipe.fit_transform(data)

X_train, X_test, y_train, y_test = train_test_split(data_tofit, df.Attrition,
                                                   train_size = 0.7,
                                                   random_state = 42)

print(data.columns)

def train_ml_model(model_type):
    if model_type == 'logreg':
        model = LogisticRegression()
    elif model_type == 'tree':
        model = DecisionTreeClassifier(random_state = 42)
    elif model_type == 'knn':
        model = KNeighborsClassifier()
    elif model_type == 'rf':
        model = RandomForestClassifier(random_state = 42)
    elif model_type == 'xgb':
        model = XGBClassifier()

    model.fit(X_train, y_train)

    return model


def model_evaluate(model, x, y):
    predictions = model.predict(x)
    precision = precision_score(y, predictions)
    recall = recall_score(y, predictions)
    f1 = f1_score(y, predictions)
    return [precision, recall, f1]

#model_logreg = train_ml_model('logreg')
#model_tree = train_ml_model('tree')
#model_knn = train_ml_model('knn')
#model_rf = train_ml_model('rf')
#model_xgb = train_ml_model('xgb')

def make_model():
  # define model
  model = LogisticRegression()

  # define evaluation
  cv = RepeatedStratifiedKFold(n_splits=10, n_repeats=3, random_state=1)

  # define search space
  space = dict()
  space['solver'] = ['newton-cg', 'lbfgs', 'liblinear']
  space['penalty'] = ['none', 'l1', 'l2', 'elasticnet']
  space['C'] = [100, 10, 1, 0.1, 0.01]

  # define search
  random_search = RandomizedSearchCV(model, space, n_iter=500, scoring='recall', n_jobs=-1, cv=cv, random_state=1)

  # execute search
  result = random_search.fit(X_train, y_train)

  random_search.best_estimator_.fit(X_train, y_train)
  #y_pred_random = random_search.best_estimator_.predict(X_test)

  #bsummary = PrettyTable(['Model', 'PRECISION', 'RECALL', 'F1'])
  #bsummary.add_row(['LOGREG']+model_evaluate(result.best_estimator_, X_test, y_test))
  #print(bsummary)

  return result.best_estimator_


if __name__ == '__main__':
    model = make_model()
    pickle.dump(model, open('model.bin', 'wb'))
    pickle.dump(pipe, open('pipe.bin', 'wb'))
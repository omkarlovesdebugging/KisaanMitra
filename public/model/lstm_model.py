import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout


# ===============================
# 1. LOAD DATASET
# ===============================
DATASET_PATH = "/mnt/data/merged_crop_demand.csv"

df = pd.read_csv(DATASET_PATH)
print("Columns:", df.columns)

# CHANGE THIS COLUMN NAME IF NEEDED
TARGET_COLUMN = "price"   # or demand / arrivals / modal_price

data = df[[TARGET_COLUMN]].values


# ===============================
# 2. NORMALIZE DATA
# ===============================
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(data)


# ===============================
# 3. CREATE SEQUENCES
# ===============================
def create_sequences(data, time_steps=10):
    X, y = [], []
    for i in range(len(data) - time_steps):
        X.append(data[i:i + time_steps])
        y.append(data[i + time_steps])
    return np.array(X), np.array(y)

TIME_STEPS = 10
X, y = create_sequences(scaled_data, TIME_STEPS)


# ===============================
# 4. TRAIN / TEST SPLIT
# ===============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, shuffle=False
)


# ===============================
# 5. BUILD LSTM MODEL
# ===============================
model = Sequential()

model.add(LSTM(64, return_sequences=True, input_shape=(X_train.shape[1], 1)))
model.add(Dropout(0.2))

model.add(LSTM(64))
model.add(Dropout(0.2))

model.add(Dense(1))

model.compile(
    optimizer="adam",
    loss="mean_squared_error"
)

model.summary()


# ===============================
# 6. TRAIN MODEL
# ===============================
history = model.fit(
    X_train,
    y_train,
    epochs=30,
    batch_size=32,
    validation_split=0.1
)


# ===============================
# 7. PREDICT & EVALUATE
# ===============================
predictions = model.predict(X_test)

predictions = scaler.inverse_transform(predictions)
y_test_actual = scaler.inverse_transform(y_test)


# ===============================
# 8. PLOT RESULTS
# ===============================
plt.figure(figsize=(10, 5))
plt.plot(y_test_actual, label="Actual")
plt.plot(predictions, label="Predicted")
plt.title("LSTM Crop Demand / Price Prediction")
plt.xlabel("Time")
plt.ylabel(TARGET_COLUMN)
plt.legend()
plt.show()


# ===============================
# 9. SAVE MODEL
# ===============================
model.save("crop_lstm_model.h5")
print("Model saved as crop_lstm_model.h5")

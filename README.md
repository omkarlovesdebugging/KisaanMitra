**AgriConnect Pro**

AgriConnect Pro is a Vite + React + TypeScript front-end for visualizing and forecasting crop demand using historical agricultural datasets. The repository includes a lightweight demand forecasting service (TypeScript) that ingests CSVs and a reference LSTM training script (Python/TensorFlow) in `public/model` for advanced time-series modeling.

**Quick Summary**
- **Stack:** Vite, React, TypeScript, Tailwind CSS, React Router, TanStack Query, Recharts.
- **Client:** Single-page app located in `src/` with routes defined in `src/App.tsx`.
- **Data:** CSV datasets are served from `public/dataset/` (e.g., `5_years_merged_crop_demand.csv`).
- **Model (reference):** `public/model/lstm_model.py` is an example Keras LSTM training script; `public/model/crop_demand_model.h5` is a saved model artifact (if present).

**Project Layout**
- **`src/`**: Application source code (pages, components, services).
- **`src/pages`**: Router endpoints and page components (e.g., `Home`, `FutureDemand`, `CropDetail`).
- **`src/services`**: Client-side data utilities and forecasting logic; see `src/services/demandForecastService.ts` for CSV parsing and forecasting helpers.
- **`public/dataset/`**: Static CSV files loaded by the front-end.
- **`public/model/`**: Reference model training script and model artifacts.

**Routing**
- Routes are configured in `src/App.tsx`. Notable routes:
  - `/` - Landing / index
  - `/home` - Main dashboard
  - `/crop/:cropId` - Crop detail
  - `/crop/:cropId/region/:regionId` - Region detail
  - `/future-demand` - Forecast / future demand visualization

**How Forecasting Works (client-side)**
- The TypeScript service `src/services/demandForecastService.ts` implements CSV parsing and a simple forecasting pipeline:
  - `parseDemandCSV` — parses rows from `5_years_merged_crop_demand.csv` into weekly demand records.
  - `forecastCropDemand` — groups by crop, computes recent averages, fits a linear regression to recent weeks, extrapolates N weeks ahead (configurable), and returns top-N forecasts with trend and confidence metrics.
  - `loadAndForecast` — convenience function that fetches `/dataset/5_years_merged_crop_demand.csv` and returns the top forecasts.

This pipeline is deterministic, lightweight, and intended for quick interactive forecasting in the browser. For production-grade forecasts use the reference LSTM model or a server-side inference service.

**Reference LSTM model (training)**
- Script: `public/model/lstm_model.py` — Keras/TensorFlow training example that:
  - Loads `merged_crop_demand.csv`, selects a target column (e.g., `price`/`demand`).
  - Scales data with `MinMaxScaler`, constructs time-window sequences, defines a stacked LSTM (64 units), trains for a number of epochs, and saves `crop_lstm_model.h5`.
- To reproduce or train locally (Python 3.8+ recommended):

```powershell
# create venv
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install pandas numpy matplotlib scikit-learn tensorflow
python public\model\lstm_model.py
```

Notes: adjust `DATASET_PATH` and `TARGET_COLUMN` at the top of the script to match your CSV and target variable.

**Development**
- Install dependencies:

```powershell
npm install
```

- Run dev server:

```powershell
npm run dev
```

- Build for production:

```powershell
npm run build
npm run preview
```

- Run tests:

```powershell
npm test
```

**API / Integration Notes**
- The front-end expects static CSVs under `/dataset/` in `public/` (served at `/dataset/<file>.csv`). `src/services/demandForecastService.ts` uses `fetch('/dataset/5_years_merged_crop_demand.csv')` by default.
- If you provide a server-side endpoint (recommended for heavy models), replace `loadAndForecast` with a call to your inference API and return the same `DemandForecast[]` shape.

**Type Definitions (client)**
- `DemandForecast` — `{ cropName: string; predictedDemand: number; trend: 'increasing'|'decreasing'|'stable'; confidence: number; historicalAverage: number }`.

**Notes for Production / Next Steps**
- Move heavy model inference off the client; expose a REST/gRPC endpoint for model predictions and call it from `src/services`.
- Add a `requirements.txt` or `pyproject.toml` for the Python model reproducibility.
- Add CI to run linting (`npm run lint`) and tests (`npm test`) on PRs.

**References & Assets**
- Datasets: `public/dataset/5_years_merged_crop_demand.csv` and `public/dataset/Merged_crop_dataset.csv`.
- Model scripts/artifacts: `public/model/lstm_model.py`, `public/model/crop_demand_model.h5` (if present).

---

If you want, I can:
- Add a `requirements.txt` for the LSTM script.
- Create a minimal server (FastAPI/Flask) to host the trained Keras model and an endpoint the front-end can call.

Generated README for quick onboarding and technical reference.

# PowerShell script to setup CSV data for AgriConnect

Write-Host "AgriConnect - CSV Data Setup" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Create public/dataset directory if it does not exist
$publicDatasetPath = "public\dataset"
if (-not (Test-Path $publicDatasetPath)) {
    Write-Host "Creating public/dataset directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $publicDatasetPath -Force | Out-Null
    Write-Host "Directory created" -ForegroundColor Green
} else {
    Write-Host "public/dataset directory already exists" -ForegroundColor Green
}

Write-Host ""

# Copy CSV files
Write-Host "Copying CSV files..." -ForegroundColor Yellow

# Copy demand forecast CSV (small file)
$demandFile = "dataset\5_years_merged_crop_demand.csv"
if (Test-Path $demandFile) {
    Copy-Item $demandFile "$publicDatasetPath\" -Force
    $size = (Get-Item $demandFile).Length / 1MB
    Write-Host "Copied 5_years_merged_crop_demand.csv" -ForegroundColor Green
} else {
    Write-Host "Warning: $demandFile not found" -ForegroundColor Red
}

# Copy market dataset CSV (large file)
$marketFile = "dataset\Merged_crop_dataset.csv"
if (Test-Path $marketFile) {
    Write-Host "Copying Merged_crop_dataset.csv (this may take a moment)..." -ForegroundColor Yellow
    Copy-Item $marketFile "$publicDatasetPath\" -Force
    $size = (Get-Item $marketFile).Length / 1MB
    Write-Host "Copied Merged_crop_dataset.csv" -ForegroundColor Green
} else {
    Write-Host "Warning: $marketFile not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host "2. Navigate to /future-demand to see AI forecasting" -ForegroundColor White
Write-Host "3. Select a crop and click 'Load Real Data' to see market recommendations" -ForegroundColor White
Write-Host ""
Write-Host "Read IMPLEMENTATION_GUIDE.md for detailed documentation" -ForegroundColor Cyan
Write-Host ""

# Check file sizes
Write-Host "Dataset Summary:" -ForegroundColor Cyan
if (Test-Path "$publicDatasetPath\5_years_merged_crop_demand.csv") {
    $size = (Get-Item "$publicDatasetPath\5_years_merged_crop_demand.csv").Length / 1KB
    Write-Host "  - Demand forecast data: $([math]::Round($size, 2)) KB" -ForegroundColor White
}
if (Test-Path "$publicDatasetPath\Merged_crop_dataset.csv") {
    $size = (Get-Item "$publicDatasetPath\Merged_crop_dataset.csv").Length / 1MB
    Write-Host "  - Market data: $([math]::Round($size, 2)) MB" -ForegroundColor White
}
Write-Host ""

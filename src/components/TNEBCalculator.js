import React, { useState, useEffect, useMemo } from 'react';
import {
  Zap,
  Calculator,
  CheckCircle,
  PieChart,
  BarChart3,
  TrendingUp,
  FileText,
  AlertCircle,
  Home,
  Building,
  Factory,
  Wheat,
  DollarSign,
  Info
} from 'lucide-react';

const consumerTypes = [
  { value: 'domestic', label: 'Domestic', icon: Home, color: 'bg-blue-500' },
  { value: 'commercial', label: 'Commercial', icon: Building, color: 'bg-purple-500' },
  { value: 'industrial', label: 'Industrial', icon: Factory, color: 'bg-red-500' },
  { value: 'agricultural', label: 'Agricultural', icon: Wheat, color: 'bg-green-500' },
];

const domesticTariff = [
  { from: 0, to: 100, rate: 0, description: 'First 100 units (Free)' },
  { from: 101, to: 200, rate: 2.35, description: '101-200 units' },
  { from: 201, to: 400, rate: 4.70, description: '201-400 units' },
  { from: 401, to: 500, rate: 6.30, description: '401-500 units' },
  { from: 501, to: 600, rate: 8.40, description: '501-600 units' },
  { from: 601, to: 800, rate: 9.45, description: '601-800 units' },
  { from: 801, to: 1000, rate: 10.50, description: '801-1,000 units' },
  { from: 1001, to: Infinity, rate: 11.55, description: 'Above 1,000 units' },
];

const TNEBCalculator = () => {
  const [consumerType, setConsumerType] = useState('domestic');
  const [connectionType, setConnectionType] = useState('LT');
  const [units, setUnits] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('breakdown');

  const selectedConsumerType = useMemo(() => 
    consumerTypes.find(type => type.value === consumerType), 
    [consumerType]
  );

  const calculateBill = () => {
    if (!units || isNaN(units) || parseInt(units) <= 0) {
      setError('Please enter valid units consumed');
      return;
    }
    
    setLoading(true);
    setProgress(0);
    setError(null);
    
    // Animate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    
    // Simulate calculation
    setTimeout(() => {
      clearInterval(interval);
      const parsedUnits = parseInt(units);
      
      let energyCost = 0;
      let breakdown = [];
      
      if (consumerType === 'domestic') {
        // Apply TNEB slab rates based on total consumption
        const slabCalculation = (totalUnits) => {
          let cost = 0;
          let breakdown = [];
          
          if (totalUnits <= 100) {
            // Up to 100 units - Free
            breakdown.push({
              units: totalUnits,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true
            });
          } else if (totalUnits <= 200) {
            // Up to 200 units - Free for first 100, ₹2.35 for 101-200
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true
            });
            const units101to200 = totalUnits - 100;
            const amount101to200 = units101to200 * 2.35;
            breakdown.push({
              units: units101to200,
              rate: 2.35,
              amount: amount101to200,
              description: '101-200 units'
            });
            cost = amount101to200;
          } else if (totalUnits <= 400) {
            // Up to 400 units - Free for first 100, ₹4.70 for 101-400
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true
            });
            const units101to400 = totalUnits - 100;
            const amount101to400 = units101to400 * 4.70;
            breakdown.push({
              units: units101to400,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units'
            });
            cost = amount101to400;
          } else if (totalUnits <= 500) {
            // Up to 500 units
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true
            });
            const amount101to400 = 300 * 4.70;
            breakdown.push({
              units: 300,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units'
            });
            const units401to500 = totalUnits - 400;
            const amount401to500 = units401to500 * 6.30;
            breakdown.push({
              units: units401to500,
              rate: 6.30,
              amount: amount401to500,
              description: '401-500 units'
            });
            cost = amount101to400 + amount401to500;
          } else if (totalUnits <= 600) {
            // Up to 600 units
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true
            });
            const amount101to400 = 300 * 4.70;
            breakdown.push({
              units: 300,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units'
            });
            const amount401to500 = 100 * 6.30;
            breakdown.push({
              units: 100,
              rate: 6.30,
              amount: amount401to500,
              description: '401-500 units'
            });
            const units501to600 = totalUnits - 500;
            const amount501to600 = units501to600 * 8.40;
            breakdown.push({
              units: units501to600,
              rate: 8.40,
              amount: amount501to600,
              description: '501-600 units'
            });
            cost = amount101to400 + amount401to500 + amount501to600;
          } else if (totalUnits <= 800) {
            // Up to 800 units
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true
            });
            const amount101to400 = 300 * 4.70;
            breakdown.push({
              units: 300,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units'
            });
            const amount401to500 = 100 * 6.30;
            breakdown.push({
              units: 100,
              rate: 6.30,
              amount: amount401to500,
              description: '401-500 units'
            });
            const amount501to600 = 100 * 8.40;
            breakdown.push({
              units: 100,
              rate: 8.40,
              amount: amount501to600,
              description: '501-600 units'
            });
            const units601to800 = totalUnits - 600;
            const amount601to800 = units601to800 * 9.45;
            breakdown.push({
              units: units601to800,
              rate: 9.45,
              amount: amount601to800,
              description: '601-800 units'
            });
            cost = amount101to400 + amount401to500 + amount501to600 + amount601to800;
          } else if (totalUnits <= 1000) {
            // Up to 1000 units
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true
            });
            const amount101to400 = 300 * 4.70;
            breakdown.push({
              units: 300,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units'
            });
            const amount401to500 = 100 * 6.30;
            breakdown.push({
              units: 100,
              rate: 6.30,
              amount: amount401to500,
              description: '401-500 units'
            });
            const amount501to600 = 100 * 8.40;
            breakdown.push({
              units: 100,
              rate: 8.40,
              amount: amount501to600,
              description: '501-600 units'
            });
            const amount601to800 = 200 * 9.45;
            breakdown.push({
              units: 200,
              rate: 9.45,
              amount: amount601to800,
              description: '601-800 units'
            });
            const units801to1000 = totalUnits - 800;
            const amount801to1000 = units801to1000 * 10.50;
            breakdown.push({
              units: units801to1000,
              rate: 10.50,
              amount: amount801to1000,
              description: '801-1,000 units'
            });
            cost = amount101to400 + amount401to500 + amount501to600 + amount601to800 + amount801to1000;
          } else {
            // Above 1000 units
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true
            });
            const amount101to400 = 300 * 4.70;
            breakdown.push({
              units: 300,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units'
            });
            const amount401to500 = 100 * 6.30;
            breakdown.push({
              units: 100,
              rate: 6.30,
              amount: amount401to500,
              description: '401-500 units'
            });
            const amount501to600 = 100 * 8.40;
            breakdown.push({
              units: 100,
              rate: 8.40,
              amount: amount501to600,
              description: '501-600 units'
            });
            const amount601to800 = 200 * 9.45;
            breakdown.push({
              units: 200,
              rate: 9.45,
              amount: amount601to800,
              description: '601-800 units'
            });
            const amount801to1000 = 200 * 10.50;
            breakdown.push({
              units: 200,
              rate: 10.50,
              amount: amount801to1000,
              description: '801-1,000 units'
            });
            const unitsAbove1000 = totalUnits - 1000;
            const amountAbove1000 = unitsAbove1000 * 11.55;
            breakdown.push({
              units: unitsAbove1000,
              rate: 11.55,
              amount: amountAbove1000,
              description: 'Above 1,000 units'
            });
            cost = amount101to400 + amount401to500 + amount501to600 + amount601to800 + amount801to1000 + amountAbove1000;
          }
          
          return { cost, breakdown };
        };
        
        const result = slabCalculation(parsedUnits);
        energyCost = result.cost;
        breakdown = result.breakdown;
      } else {
        // Simplified calculation for other consumer types
        const rate = consumerType === 'commercial' ? 7.5 : 
                    consumerType === 'industrial' ? 6.8 : 2.0;
        energyCost = parsedUnits * rate;
        breakdown.push({
          units: parsedUnits,
          rate,
          amount: energyCost,
          description: `All units @ ₹${rate}/unit`
        });
      }
      
      const fixedCharge = consumerType === 'domestic' ? 50 : 
                         consumerType === 'commercial' ? 120 : 
                         consumerType === 'industrial' ? 200 : 30;
      
      const electricityDuty = (energyCost + fixedCharge) * 0.15;
      const totalAmount = energyCost + fixedCharge + electricityDuty;
      
      setResult({
        consumerType,
        connectionType,
        units: parsedUnits,
        energyCost,
        fixedCharge,
        electricityDuty,
        totalAmount,
        breakdown
      });
      
      setLoading(false);
    }, 1500);
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setUnits('');
    setProgress(0);
  };

  const getBillComposition = () => {
    if (!result) return [];
    
    return [
      { name: 'Energy Charges', value: result.energyCost, color: '#3b82f6' },
      { name: 'Fixed Charges', value: result.fixedCharge, color: '#8b5cf6' },
      { name: 'Electricity Duty', value: result.electricityDuty, color: '#ef4444' },
    ];
  };

  const getUsageComparisonData = () => {
    if (!result) return [];
    
    const data = [];
    for (let i = 0; i <= 5; i++) {
      const usage = Math.round(result.units * (0.5 + i * 0.25));
      const avgRate = result.energyCost / result.units;
      const estimatedBill = usage * avgRate + result.fixedCharge + (usage * avgRate + result.fixedCharge) * 0.15;
      data.push({
        label: `${usage} kWh`,
        usage,
        bill: estimatedBill
      });
    }
    
    return data;
  };

  const ProgressBar = ({ value, max = 100 }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );

  const CustomPieChart = ({ data }) => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
          {data.map((item, index) => {
            const total = data.reduce((sum, d) => sum + d.value, 0);
            const percentage = (item.value / total) * 100;
            const offset = data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 100, 0);
            
            return (
              <circle
                key={item.name}
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke={item.color}
                strokeWidth="3"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                strokeDashoffset={-offset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.name}: ₹{item.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const CustomBarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.amount));
    
    return (
      <div className="h-64 flex items-end justify-center gap-2 p-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="text-xs text-center font-medium">
              ₹{item.amount.toFixed(0)}
            </div>
            <div 
              className="bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600"
              style={{ 
                width: '40px',
                height: `${(item.amount / maxValue) * 200}px`,
                minHeight: '2px'
              }}
            />
            <div className="text-xs text-center text-gray-600 max-w-16">
              {item.name.split(' ').map(word => word.substring(0, 6)).join(' ')}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TNEB Calculator
              </h1>
              <p className="text-gray-600">Tamil Nadu Electricity Board</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold">Calculate Your Bill</h2>
                </div>
                <p className="text-gray-600 text-sm">Enter your consumption details</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Consumer Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consumer Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {consumerTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => setConsumerType(type.value)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            consumerType === type.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 ${type.color} rounded-full flex items-center justify-center`}>
                              <IconComponent className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-medium">{type.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Units Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Units Consumed (kWh)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      placeholder="Enter units consumed"
                      min="1"
                      max="50000"
                      className="w-full p-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <Zap className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Progress Bar */}
                {loading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Calculating...</span>
                      <span>{progress}%</span>
                    </div>
                    <ProgressBar value={progress} />
                  </div>
                )}

                {/* Error Alert */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                {/* Calculate Button */}
                <button
                  onClick={calculateBill}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? 'Calculating...' : 'Calculate Bill'}
                </button>

                {result && (
                  <button
                    onClick={reset}
                    className="w-full py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset Calculator
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results or Tariff Info */}
          <div className="lg:col-span-8">
            {result ? (
              <div className="space-y-6">
                {/* Summary Card */}
                <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl shadow-xl text-white">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">Your Electricity Bill</h2>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold mb-2">
                        ₹{result.totalAmount.toFixed(2)}
                      </div>
                      <div className="bg-white/20 rounded-full px-4 py-1 inline-block">
                        {result.units} kWh consumed
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-green-100 text-sm mb-1">Consumer Type</div>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 ${selectedConsumerType.color} rounded-full flex items-center justify-center`}>
                            <selectedConsumerType.icon className="w-3 h-3 text-white" />
                          </div>
                          <span className="capitalize font-medium">{result.consumerType}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-green-100 text-sm mb-1">Connection</div>
                        <div className="font-medium">{result.connectionType}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bill Composition */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Bill Composition</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <CustomPieChart data={getBillComposition()} />
                    </div>
                  </div>

                  {/* Usage Breakdown */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Usage Breakdown</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <CustomBarChart data={result.breakdown.map(item => ({
                        name: item.description,
                        amount: item.amount,
                        units: item.units
                      }))} />
                    </div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold">Detailed Breakdown</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Tabs */}
                    <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
                      {[
                        { id: 'breakdown', label: 'Tier Breakdown' },
                        { id: 'summary', label: 'Bill Summary' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            activeTab === tab.id
                              ? 'bg-white text-blue-600 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {activeTab === 'breakdown' && (
                      <div className="space-y-4">
                        {result.breakdown.map((item, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h4 className="font-medium">{item.description}</h4>
                                <p className="text-sm text-gray-600">
                                  {item.units} units × ₹{item.rate}
                                  {item.isFree && (
                                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                      FREE
                                    </span>
                                  )}
                                </p>
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(item.units / result.units) * 100}%` }}
                                  />
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-lg font-bold">₹{item.amount.toFixed(2)}</div>
                                <div className="text-xs text-gray-500">
                                  {((item.amount / result.totalAmount) * 100).toFixed(1)}% of total
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'summary' && (
                      <div className="space-y-4">
                        {[
                          { label: 'Energy Charges', value: result.energyCost, color: 'bg-blue-100 text-blue-800' },
                          { label: 'Fixed Charges', value: result.fixedCharge, color: 'bg-purple-100 text-purple-800' },
                          { label: 'Electricity Duty (15%)', value: result.electricityDuty, color: 'bg-yellow-100 text-yellow-800' }
                        ].map((item, index) => (
                          <div key={index} className={`p-4 rounded-lg ${item.color}`}>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{item.label}</span>
                              <span className="font-bold">₹{item.value.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                        
                        <div className="border-t pt-4">
                          <div className="p-4 bg-green-100 rounded-lg border-2 border-green-200">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-green-800">Total Amount</span>
                              <span className="text-2xl font-bold text-green-800">₹{result.totalAmount.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Tariff Information */
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Tariff Information</h3>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">Latest July 1, 2024 revised tariff rates for domestic consumers</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {domesticTariff.map((tier, index) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{tier.description}</h4>
                          <p className="text-sm text-gray-600">
                            {tier.to === Infinity ? `${tier.from}+ units` : `${tier.from}-${tier.to} units`}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          tier.rate === 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {tier.rate === 0 ? 'FREE' : `₹${tier.rate}/unit`}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Important Notes</h4>
                        <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                          <li>• Amount shown is only energy charges based on consumption</li>
                          <li>• Fixed charges and electricity duty are not included</li>
                          <li>• Rates may vary for different consumer categories</li>
                          <li>• Slab rates are cumulative based on total monthly consumption</li>
                          <li>• Please verify with official TNEB tariff schedule</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          * Based on TNEB tariff rates effective from July 1, 2024. Rates are subject to change.
        </div>
      </div>
    </div>
  );
};

export default TNEBCalculator;

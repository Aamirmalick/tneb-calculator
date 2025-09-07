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
  Info,
  Lightbulb,
  Sparkles,
  Award,
  Target
} from 'lucide-react';

const consumerTypes = [
  { value: 'domestic', label: 'Domestic', icon: Home, color: 'bg-gradient-to-br from-blue-500 to-blue-600', glowColor: 'shadow-blue-200' },
  { value: 'commercial', label: 'Commercial', icon: Building, color: 'bg-gradient-to-br from-purple-500 to-purple-600', glowColor: 'shadow-purple-200' },
  { value: 'industrial', label: 'Industrial', icon: Factory, color: 'bg-gradient-to-br from-red-500 to-red-600', glowColor: 'shadow-red-200' },
  { value: 'agricultural', label: 'Agricultural', icon: Wheat, color: 'bg-gradient-to-br from-green-500 to-green-600', glowColor: 'shadow-green-200' },
];

const domesticTariff = [
  { from: 0, to: 100, rate: 0, description: 'First 100 units (Free)', color: 'from-green-400 to-green-500' },
  { from: 101, to: 200, rate: 2.35, description: '101-200 units', color: 'from-blue-400 to-blue-500' },
  { from: 201, to: 400, rate: 4.70, description: '201-400 units', color: 'from-indigo-400 to-indigo-500' },
  { from: 401, to: 500, rate: 6.30, description: '401-500 units', color: 'from-purple-400 to-purple-500' },
  { from: 501, to: 600, rate: 8.40, description: '501-600 units', color: 'from-pink-400 to-pink-500' },
  { from: 601, to: 800, rate: 9.45, description: '601-800 units', color: 'from-red-400 to-red-500' },
  { from: 801, to: 1000, rate: 10.50, description: '801-1,000 units', color: 'from-orange-400 to-orange-500' },
  { from: 1001, to: Infinity, rate: 11.55, description: 'Above 1,000 units', color: 'from-yellow-400 to-yellow-500' },
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
  const [isCalculated, setIsCalculated] = useState(false);

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
    setIsCalculated(false);
    
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
        const slabCalculation = (totalUnits) => {
          let cost = 0;
          let breakdown = [];
          
          if (totalUnits <= 100) {
            breakdown.push({
              units: totalUnits,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true,
              color: 'from-green-400 to-green-500'
            });
          } else if (totalUnits <= 200) {
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true,
              color: 'from-green-400 to-green-500'
            });
            const units101to200 = totalUnits - 100;
            const amount101to200 = units101to200 * 2.35;
            breakdown.push({
              units: units101to200,
              rate: 2.35,
              amount: amount101to200,
              description: '101-200 units',
              color: 'from-blue-400 to-blue-500'
            });
            cost = amount101to200;
          } else if (totalUnits <= 400) {
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true,
              color: 'from-green-400 to-green-500'
            });
            const units101to400 = totalUnits - 100;
            const amount101to400 = units101to400 * 4.70;
            breakdown.push({
              units: units101to400,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units',
              color: 'from-indigo-400 to-indigo-500'
            });
            cost = amount101to400;
          } else if (totalUnits <= 500) {
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true,
              color: 'from-green-400 to-green-500'
            });
            const amount101to400 = 300 * 4.70;
            breakdown.push({
              units: 300,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units',
              color: 'from-indigo-400 to-indigo-500'
            });
            const units401to500 = totalUnits - 400;
            const amount401to500 = units401to500 * 6.30;
            breakdown.push({
              units: units401to500,
              rate: 6.30,
              amount: amount401to500,
              description: '401-500 units',
              color: 'from-purple-400 to-purple-500'
            });
            cost = amount101to400 + amount401to500;
          } else if (totalUnits <= 600) {
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true,
              color: 'from-green-400 to-green-500'
            });
            const amount101to400 = 300 * 4.70;
            breakdown.push({
              units: 300,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units',
              color: 'from-indigo-400 to-indigo-500'
            });
            const amount401to500 = 100 * 6.30;
            breakdown.push({
              units: 100,
              rate: 6.30,
              amount: amount401to500,
              description: '401-500 units',
              color: 'from-purple-400 to-purple-500'
            });
            const units501to600 = totalUnits - 500;
            const amount501to600 = units501to600 * 8.40;
            breakdown.push({
              units: units501to600,
              rate: 8.40,
              amount: amount501to600,
              description: '501-600 units',
              color: 'from-pink-400 to-pink-500'
            });
            cost = amount101to400 + amount401to500 + amount501to600;
          } else if (totalUnits <= 800) {
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true,
              color: 'from-green-400 to-green-500'
            });
            const amount101to400 = 300 * 4.70;
            breakdown.push({
              units: 300,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units',
              color: 'from-indigo-400 to-indigo-500'
            });
            const amount401to500 = 100 * 6.30;
            breakdown.push({
              units: 100,
              rate: 6.30,
              amount: amount401to500,
              description: '401-500 units',
              color: 'from-purple-400 to-purple-500'
            });
            const amount501to600 = 100 * 8.40;
            breakdown.push({
              units: 100,
              rate: 8.40,
              amount: amount501to600,
              description: '501-600 units',
              color: 'from-pink-400 to-pink-500'
            });
            const units601to800 = totalUnits - 600;
            const amount601to800 = units601to800 * 9.45;
            breakdown.push({
              units: units601to800,
              rate: 9.45,
              amount: amount601to800,
              description: '601-800 units',
              color: 'from-red-400 to-red-500'
            });
            cost = amount101to400 + amount401to500 + amount501to600 + amount601to800;
          } else if (totalUnits <= 1000) {
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true,
              color: 'from-green-400 to-green-500'
            });
            const amount101to400 = 300 * 4.70;
            breakdown.push({
              units: 300,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units',
              color: 'from-indigo-400 to-indigo-500'
            });
            const amount401to500 = 100 * 6.30;
            breakdown.push({
              units: 100,
              rate: 6.30,
              amount: amount401to500,
              description: '401-500 units',
              color: 'from-purple-400 to-purple-500'
            });
            const amount501to600 = 100 * 8.40;
            breakdown.push({
              units: 100,
              rate: 8.40,
              amount: amount501to600,
              description: '501-600 units',
              color: 'from-pink-400 to-pink-500'
            });
            const amount601to800 = 200 * 9.45;
            breakdown.push({
              units: 200,
              rate: 9.45,
              amount: amount601to800,
              description: '601-800 units',
              color: 'from-red-400 to-red-500'
            });
            const units801to1000 = totalUnits - 800;
            const amount801to1000 = units801to1000 * 10.50;
            breakdown.push({
              units: units801to1000,
              rate: 10.50,
              amount: amount801to1000,
              description: '801-1,000 units',
              color: 'from-orange-400 to-orange-500'
            });
            cost = amount101to400 + amount401to500 + amount501to600 + amount601to800 + amount801to1000;
          } else {
            breakdown.push({
              units: 100,
              rate: 0,
              amount: 0,
              description: 'First 100 units (Free)',
              isFree: true,
              color: 'from-green-400 to-green-500'
            });
            const amount101to400 = 300 * 4.70;
            breakdown.push({
              units: 300,
              rate: 4.70,
              amount: amount101to400,
              description: '101-400 units',
              color: 'from-indigo-400 to-indigo-500'
            });
            const amount401to500 = 100 * 6.30;
            breakdown.push({
              units: 100,
              rate: 6.30,
              amount: amount401to500,
              description: '401-500 units',
              color: 'from-purple-400 to-purple-500'
            });
            const amount501to600 = 100 * 8.40;
            breakdown.push({
              units: 100,
              rate: 8.40,
              amount: amount501to600,
              description: '501-600 units',
              color: 'from-pink-400 to-pink-500'
            });
            const amount601to800 = 200 * 9.45;
            breakdown.push({
              units: 200,
              rate: 9.45,
              amount: amount601to800,
              description: '601-800 units',
              color: 'from-red-400 to-red-500'
            });
            const amount801to1000 = 200 * 10.50;
            breakdown.push({
              units: 200,
              rate: 10.50,
              amount: amount801to1000,
              description: '801-1,000 units',
              color: 'from-orange-400 to-orange-500'
            });
            const unitsAbove1000 = totalUnits - 1000;
            const amountAbove1000 = unitsAbove1000 * 11.55;
            breakdown.push({
              units: unitsAbove1000,
              rate: 11.55,
              amount: amountAbove1000,
              description: 'Above 1,000 units',
              color: 'from-yellow-400 to-yellow-500'
            });
            cost = amount101to400 + amount401to500 + amount501to600 + amount601to800 + amount801to1000 + amountAbove1000;
          }
          
          return { cost, breakdown };
        };
        
        const result = slabCalculation(parsedUnits);
        energyCost = result.cost;
        breakdown = result.breakdown;
      } else {
        const rate = consumerType === 'commercial' ? 7.5 : 
                    consumerType === 'industrial' ? 6.8 : 2.0;
        energyCost = parsedUnits * rate;
        breakdown.push({
          units: parsedUnits,
          rate,
          amount: energyCost,
          description: `All units @ ₹${rate}/unit`,
          color: 'from-blue-400 to-blue-500'
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
      setIsCalculated(true);
    }, 1500);
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setUnits('');
    setProgress(0);
    setIsCalculated(false);
  };

  const getBillComposition = () => {
    if (!result) return [];
    
    return [
      { name: 'Energy Charges', value: result.energyCost, color: '#3b82f6', percentage: (result.energyCost / result.totalAmount) * 100 },
      { name: 'Fixed Charges', value: result.fixedCharge, color: '#8b5cf6', percentage: (result.fixedCharge / result.totalAmount) * 100 },
      { name: 'Electricity Duty', value: result.electricityDuty, color: '#ef4444', percentage: (result.electricityDuty / result.totalAmount) * 100 },
    ];
  };

  const ProgressBar = ({ value, max = 100 }) => (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div 
        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out relative"
        style={{ width: `${(value / max) * 100}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
      </div>
    </div>
  );

  const AnimatedPieChart = ({ data }) => {
    const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, animatedValue: 0 })));

    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedData(data.map(d => ({ ...d, animatedValue: d.value })));
      }, 300);
      return () => clearTimeout(timer);
    }, [data]);

    return (
      <div className="flex flex-col items-center justify-center h-80">
        <div className="relative w-48 h-48 mb-4">
          <svg className="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 42 42">
            {animatedData.map((item, index) => {
              const total = animatedData.reduce((sum, d) => sum + d.animatedValue, 0);
              const percentage = total > 0 ? (item.animatedValue / total) * 100 : 0;
              const offset = animatedData.slice(0, index).reduce((sum, d) => sum + (d.animatedValue / total) * 100, 0);
              
              return (
                <circle
                  key={item.name}
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="4"
                  strokeDasharray={`${percentage} ${100 - percentage}`}
                  strokeDashoffset={-offset}
                  className="transition-all duration-1000 ease-out hover:stroke-[5] cursor-pointer"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-gray-400 mx-auto mb-1" />
              <div className="text-sm text-gray-500 font-medium">Total</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3 w-full">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">₹{item.value.toFixed(2)}</div>
                <div className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AnimatedBarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.amount));
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setAnimated(true), 500);
      return () => clearTimeout(timer);
    }, []);
    
    return (
      <div className="h-80 flex items-end justify-center gap-3 p-6 bg-gradient-to-t from-blue-50 to-transparent rounded-lg">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-3 group">
            <div className="text-xs text-center font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow-sm">
              ₹{item.amount.toFixed(0)}
            </div>
            <div 
              className={`bg-gradient-to-t ${item.color || 'from-blue-400 to-blue-600'} rounded-t-lg transition-all duration-1000 ease-out hover:scale-105 shadow-lg group-hover:shadow-xl relative overflow-hidden`}
              style={{ 
                width: '32px',
                height: animated ? `${(item.amount / maxValue) * 240}px` : '4px',
                minHeight: '4px'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent opacity-20 animate-pulse" />
            </div>
            <div className="text-xs text-center text-gray-600 max-w-20 leading-tight font-medium">
              {item.name.split(' ').slice(0, 2).join(' ')}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const FloatingCard = ({ children, className = "", delay = 0 }) => (
    <div 
      className={`transform transition-all duration-700 ease-out ${isCalculated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
                </div>
              </div>
              <div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  TNEB Calculator
                </h1>
                <p className="text-blue-200 text-lg font-light">Tamil Nadu Electricity Board</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-200 text-sm">Official Tariff Rates 2024</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Enhanced Input Form */}
            <div className="lg:col-span-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-6 h-6 text-blue-300" />
                    <h2 className="text-xl font-bold text-white">Calculate Your Bill</h2>
                  </div>
                  <p className="text-blue-200 text-sm">Enter your consumption details</p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Enhanced Consumer Type */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      Consumer Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {consumerTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <button
                            key={type.value}
                            onClick={() => setConsumerType(type.value)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                              consumerType === type.value
                                ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/20'
                                : 'border-white/20 hover:border-white/40 bg-white/5'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className={`w-10 h-10 ${type.color} rounded-full flex items-center justify-center shadow-lg ${type.glowColor} shadow-lg`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-sm font-medium text-white">{type.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Enhanced Units Input */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
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
                        className="w-full p-4 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-all duration-300 text-white placeholder-white/50"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <Lightbulb className="w-6 h-6 text-yellow-400 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Progress Bar */}
                  {loading && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-white">
                        <span>Calculating your bill...</span>
                        <span className="font-bold">{progress}%</span>
                      </div>
                      <ProgressBar value={progress} />
                    </div>
                  )}

                  {/* Enhanced Error Alert */}
                  {error && (
                    <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-xl flex items-center gap-3 backdrop-blur-sm">
                      <AlertCircle className="w-5 h-5 text-red-300" />
                      <span className="text-red-200 text-sm font-medium">{error}</span>
                    </div>
                  )}

                  {/* Enhanced Calculate Button */}
                  <button
                    onClick={calculateBill}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                    <div className="relative flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Target className="w-5 h-5" />
                          Calculate Bill
                        </>
                      )}
                    </div>
                  </button>

                  {result && (
                    <button
                      onClick={reset}
                      className="w-full py-3 text-white/80 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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
                <div className="space-y-8">
                  {/* Enhanced Summary Card */}
                  <FloatingCard delay={0}>
                    <div className="relative bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 rounded-2xl shadow-2xl text-white overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                      <div className="relative p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">Your Electricity Bill</h2>
                            <p className="text-green-100">Calculation Complete</p>
                          </div>
                        </div>
                        
                        <div className="text-center mb-8">
                          <div className="text-7xl font-black mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                            ₹{result.totalAmount.toFixed(2)}
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
                            <div className="flex items-center gap-2">
                              <Zap className="w-5 h-5" />
                              <span className="text-lg font-semibold">{result.units} kWh consumed</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="text-green-100 text-sm mb-2">Consumer Type</div>
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${selectedConsumerType.color} rounded-full flex items-center justify-center shadow-lg`}>
                                <selectedConsumerType.icon className="w-4 h-4 text-white" />
                              </div>
                              <span className="capitalize font-bold text-lg">{result.consumerType}</span>
                            </div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="text-green-100 text-sm mb-2">Connection Type</div>
                            <div className="font-bold text-lg">{result.connectionType}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>

                  {/* Enhanced Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Bill Composition */}
                    <FloatingCard delay={200}>
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <PieChart className="w-6 h-6 text-blue-300" />
                            <h3 className="text-lg font-bold text-white">Bill Composition</h3>
                          </div>
                        </div>
                        <div className="p-6">
                          <AnimatedPieChart data={getBillComposition()} />
                        </div>
                      </div>
                    </FloatingCard>

                    {/* Usage Breakdown */}
                    <FloatingCard delay={400}>
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-purple-300" />
                            <h3 className="text-lg font-bold text-white">Usage Breakdown</h3>
                          </div>
                        </div>
                        <div className="p-6">
                          <AnimatedBarChart data={result.breakdown.map(item => ({
                            name: item.description,
                            amount: item.amount,
                            units: item.units,
                            color: item.color
                          }))} />
                        </div>
                      </div>
                    </FloatingCard>
                  </div>

                  {/* Enhanced Detailed Breakdown */}
                  <FloatingCard delay={600}>
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-indigo-300" />
                          <h3 className="text-lg font-bold text-white">Detailed Breakdown</h3>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        {/* Enhanced Tabs */}
                        <div className="flex gap-2 mb-8 bg-white/5 p-2 rounded-xl backdrop-blur-sm">
                          {[
                            { id: 'breakdown', label: 'Tier Breakdown', icon: BarChart3 },
                            { id: 'summary', label: 'Bill Summary', icon: FileText }
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                                activeTab === tab.id
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                                  : 'text-white/70 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <tab.icon className="w-4 h-4" />
                              {tab.label}
                            </button>
                          ))}
                        </div>

                        {activeTab === 'breakdown' && (
                          <div className="space-y-4">
                            {result.breakdown.map((item, index) => (
                              <div key={index} className="group">
                                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                                  <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                      <h4 className="font-bold text-white text-lg mb-2">{item.description}</h4>
                                      <p className="text-white/70 mb-3">
                                        <span className="font-medium">{item.units} units</span> × ₹{item.rate}
                                        {item.isFree && (
                                          <span className="ml-3 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full font-bold shadow-lg">
                                            FREE
                                          </span>
                                        )}
                                      </p>
                                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                        <div 
                                          className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000 ease-out shadow-lg`}
                                          style={{ width: `${(item.units / result.units) * 100}%` }}
                                        >
                                          <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right ml-6">
                                      <div className="text-2xl font-black text-white">₹{item.amount.toFixed(2)}</div>
                                      <div className="text-sm text-white/60 font-medium">
                                        {((item.amount / result.totalAmount) * 100).toFixed(1)}% of total
                                      </div>
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
                              { label: 'Energy Charges', value: result.energyCost, color: 'from-blue-500 to-blue-600', icon: Zap },
                              { label: 'Fixed Charges', value: result.fixedCharge, color: 'from-purple-500 to-purple-600', icon: Building },
                              { label: 'Electricity Duty (15%)', value: result.electricityDuty, color: 'from-yellow-500 to-yellow-600', icon: DollarSign }
                            ].map((item, index) => (
                              <div key={index} className={`p-6 bg-gradient-to-r ${item.color} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                      <item.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-bold text-white text-lg">{item.label}</span>
                                  </div>
                                  <span className="font-black text-white text-xl">₹{item.value.toFixed(2)}</span>
                                </div>
                              </div>
                            ))}
                            
                            <div className="border-t border-white/20 pt-6">
                              <div className="p-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl border-2 border-green-300/30 shadow-2xl">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                      <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-xl font-black text-white">Total Amount</span>
                                  </div>
                                  <span className="text-3xl font-black text-white">₹{result.totalAmount.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FloatingCard>
                </div>
              ) : (
                /* Enhanced Tariff Information */
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-indigo-300" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Tariff Information</h3>
                        <p className="text-indigo-200 text-sm mt-1">Latest July 1, 2024 revised tariff rates for domestic consumers</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {domesticTariff.map((tier, index) => (
                        <div key={index} className={`p-6 bg-gradient-to-r ${tier.color} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20`}>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-black text-white">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-bold text-white text-lg">{tier.description}</h4>
                                <p className="text-white/80">
                                  {tier.to === Infinity ? `${tier.from}+ units` : `${tier.from}-${tier.to} units`}
                                </p>
                              </div>
                            </div>
                            <div className={`px-6 py-3 rounded-full text-lg font-black shadow-lg ${
                              tier.rate === 0 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white/20 text-white backdrop-blur-sm'
                            }`}>
                              {tier.rate === 0 ? 'FREE' : `₹${tier.rate}/unit`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-6 bg-yellow-500/20 border border-yellow-400/30 rounded-xl backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <Info className="w-8 h-8 text-yellow-300 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-yellow-100 text-lg mb-3">Important Notes</h4>
                          <ul className="text-yellow-200 space-y-2">
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                              Amount shown is only energy charges based on consumption
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                              Fixed charges and electricity duty are not included
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                              Rates may vary for different consumer categories
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                              Slab rates are cumulative based on total monthly consumption
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                              Please verify with official TNEB tariff schedule
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="text-center text-blue-200 text-sm bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold">Based on TNEB tariff rates effective from July 1, 2024</span>
            </div>
            <p className="text-blue-300">Rates are subject to change. For official information, visit TNEB website.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TNEBCalculator;

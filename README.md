# TNEB Calculator 🔌

A modern, interactive web application to calculate Tamil Nadu Electricity Board (TNEB) electricity bills with detailed breakdowns and beautiful visualizations.

![TNEB Calculator](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.1.8-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

- **Interactive Calculator**: Easy-to-use interface for calculating electricity bills
- **Multiple Consumer Types**: Support for Domestic, Commercial, Industrial, and Agricultural consumers
- **Connection Types**: Both Low Tension (LT) and High Tension (HT) connections
- **Detailed Breakdown**: Tier-wise calculation with visual progress indicators
- **Beautiful Visualizations**: Pie charts and bar charts for bill composition
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Glass morphism design with smooth animations
- **Real-time Calculations**: Instant results with loading animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tneb-calculator.git
   cd tneb-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
tneb-calculator/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── TNEBCalculator.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── reportWebVitals.js
├── package.json
├── tailwind.config.js
├── .eslintrc.json
├── .prettierrc
├── .gitignore
└── README.md
```

## 📊 Tariff Structure (Domestic)

| Units Range | Rate (₹/unit) | Description |
|-------------|---------------|-------------|
| 0-100       | ₹0.00         | First 100 units (Free) |
| 101-200     | ₹2.50         | Next 100 units |
| 201-500     | ₹4.00         | Next 300 units |
| 500+        | ₹6.50         | Above 500 units |

*Additional charges apply: Fixed charges and 15% electricity duty*

## 🛠️ Built With

- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Create React App** - Build tooling
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📱 Features in Detail

### Consumer Types
- **Domestic**: Residential consumers with tiered pricing
- **Commercial**: Business establishments
- **Industrial**: Manufacturing units and factories
- **Agricultural**: Farming and agricultural operations

### Bill Components
- **Energy Charges**: Based on consumption and tariff rates
- **Fixed Charges**: Monthly connection charges
- **Electricity Duty**: 15% duty on energy and fixed charges

### Visualizations
- **Pie Chart**: Bill composition breakdown
- **Bar Chart**: Usage tier analysis
- **Progress Bars**: Visual consumption indicators

## 🎨 Design Features

- **Glass Morphism**: Modern translucent design elements
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: CSS transitions and transforms
- **Responsive Layout**: Mobile-first design approach
- **Interactive Elements**: Hover effects and button animations

## 🚀 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`
Runs ESLint to check for code quality issues.

### `npm run format`
Formats code using Prettier.

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.js`.

### ESLint & Prettier
Code quality and formatting rules are configured in `.eslintrc.json` and `.prettierrc`.

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project
2. Deploy the `build` folder to Netlify
3. Set up continuous deployment from your Git repository

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts for deployment

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This calculator is for estimation purposes only. Actual electricity bills may vary based on:
- Current TNEB tariff revisions
- Additional charges and taxes
- Meter reading accuracy
- Billing period variations

Always verify with official TNEB tariff schedules and your electricity bill.

## 🙏 Acknowledgments

- Tamil Nadu Electricity Board for tariff information
- React community for excellent documentation
- Tailwind CSS team for the amazing utility framework
- Lucide React for beautiful icons

## 📞 Support

If you have any questions or need help with the calculator, please:
- Open an issue on GitHub
- Contact us at [your-email@domain.com]
- Check the [official TNEB website](https://www.tnebnet.org) for current tariffs

---

**Made with ❤️ for the people of Tamil Nadu**
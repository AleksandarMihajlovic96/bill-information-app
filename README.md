# 📑 Bills Management App

A React + TypeScript application built with **Material-UI (MUI)** and **i18next**, designed to manage and explore bills in a clean, multilingual interface.  

The app supports:  
- ✅ Bill listing with filtering and pagination  
- ✅ Bill detail modal view  
- ✅ Favouriting functionality  
- ✅ Tabs for All Bills vs. Favourites  
- ✅ Language switching between **English** and **Gaeilge**  

## 🛠️ Tech Stack

- **React** (with TypeScript)  
- **Material-UI (MUI)** for UI components  
- **i18next** for internationalization (English / Gaeilge)  
- **Custom styled-components** for consistent styling  
- **React Hooks** for state and logic management  
- **React Testing Library & Jest** for Unit testing

## 📂 Project Folder Structure

+ bill-information-app
  + src
    + @types - Global TypeScript type definitions and interfaces
    + api - API client, endpoints, and data-fetching logic
    + assets - Static files (images, fonts, icons, etc.)
    + components - Components used across the app
    + core - Core setup: translations, error handling, routing
    + hooks - Custom React hooks for shared logic
    + pages - Page-level components
    + shared - Reusable UI components shared across the app
    + theme - Styling, color pallets, typography
    + utils - Utility functions (formatters, validators, mappers)

## ⚙️ Setup & Installation
This project was created with **Vite** and uses **SWC** as the fast TypeScript/JS compiler.  

1. **Clone the repository**  
  ```bash
   git clone https://github.com/yourusername/bills-app.git
   cd bills-app
  ```
2. **Install dependecies**
  ```bash
  npm install
  ```
3. **Run the development server**
  ```bash
  npm run dev
  ```
4. **Build for production**
  ```bash
  npm run build
  ```
## 🧪 Running Tests

Run the test suite:
  ```bash
  npm run test
  ```

Generate code coverage report:
  ```bash
  npm test --coverage
  ```
👉 Coverage reports will be available in the coverage/ folder and current coverage report is:
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   95.45 |    86.04 |   83.33 |   96.72 |                   
 api/billsApi         |     100 |      100 |     100 |     100 |                   
  billsApi.ts         |     100 |      100 |     100 |     100 |                   
 components/BillModal |     100 |      100 |     100 |     100 |                   
  BillModal.tsx       |     100 |      100 |     100 |     100 |                   
 components/BillTable |   97.05 |    83.33 |    87.5 |     100 |                   
  BillTable.style.tsx |     100 |      100 |     100 |     100 |                   
  BillTable.tsx       |   96.15 |    83.33 |    87.5 |     100 | 53                
 pages/BillsPage      |   88.57 |    66.66 |      50 |    90.9 |                   
  BillsPage.styles.ts |     100 |      100 |     100 |     100 |                   
  BillsPage.tsx       |    86.2 |    66.66 |      50 |   88.88 | 36-39             
 shared/Dropdown      |     100 |      100 |     100 |     100 |                   
  Dropdown.styles.ts  |     100 |      100 |     100 |     100 |                   
  Dropdown.tsx        |     100 |      100 |     100 |     100 |                   
 shared/Header        |   95.65 |      100 |      75 |   95.65 |                   
  Header.styles.ts    |     100 |      100 |     100 |     100 |                   
  Header.tsx          |   94.11 |      100 |      75 |   94.11 | 29                
 utils                |     100 |      100 |     100 |     100 |                   
  constants.ts        |     100 |      100 |     100 |     100 |                   
  utils.ts            |     100 |      100 |     100 |     100 |                   

## 🧹 Linting & Formatting

Run lint chech:
```bash
 npm run lint
 ```

 Fix lint issues automatically:
 ```bash
 npm run lint:fix
 ```

 Format code with Prettier:
 ```bash
 npm run format
 ```

 ## 🔒 Pre-commit Hooks
 This project uses Husky to enforce code quality:

- Linting and formatting run before every commit.

- Commits are blocked until issues are resolved.

## 🌐 Internationalization
The app uses i18next with support for:

- en → English

- ga → Gaeilge

To add more languages, extend the translation JSON files in the i18n configuration.
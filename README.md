# FocusMate Mobile Application

A highly polished, minimalist student planner application built as a submission for TumiCodes. 

## Technical Overview

FocusMate is built using **React Native** and the **Expo** framework. It significantly exceeds the basic 2-screen requirement by delivering a fully functional, persistent application with three distinct screens, advanced state management, and an industry-standard UI architecture.

### Key Features
- **3-Screen Architecture**: 
  - `OnboardingScreen`: A responsive, paginated introduction flow.
  - `HomeScreen`: The core dashboard featuring a dynamic progress bar, list rendering, and a custom modal for task entry.
  - `ProfileScreen`: Real-time computed statistics based on the user's actual task completion rate.
- **Local Persistence**: Integrated `@react-native-async-storage/async-storage` so that tasks, categories, and onboarding states survive app restarts.
- **Bespoke UI Design**: Moves beyond generic templates by utilizing `expo-blur` for complex glassmorphism, a Stark Minimalist (Notion-inspired) color palette, and exact "squircle" border radiuses typical of native iOS applications.
- **Edge-to-Edge Safe Area**: Fully optimized for notches, dynamic islands, and gesture bars using `react-native-safe-area-context`.
- **Keyboard Optimization**: Custom `KeyboardAvoidingView` logic with `TouchableWithoutFeedback` to ensure the "Add Task" modal operates flawlessly on both iOS and Android.

## Setup & Running

This project uses Expo for rapid development and testing.

### Prerequisites
- Node.js installed
- The **Expo Go** app installed on your physical mobile device (available on iOS and Android).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ritesh-1918/focusmate-mobile-app.git
   cd focusmate-mobile-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
4. Scan the generated QR code using the Expo Go app on your phone.

## Project Structure
- `/src/screens/` - Contains the UI logic for `OnboardingScreen`, `HomeScreen`, and `ProfileScreen`.
- `/src/styles/` - Centralized design system (`theme.js`) governing all typography, shadows, spacing, and bespoke colors.
- `App.js` - Handles the React Navigation Stack and checks `AsyncStorage` to determine the initial routing state.

---
*Built by Ritesh as a submission for TumiCodes.*

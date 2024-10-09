# Pokémon Search App

This is a React-based web application that allows users to search for and explore information about different Pokémon using data from the PokéAPI. Users can view details, explore evolutions, and toggle between shiny and regular sprites.

## Features

- **Pokémon Search**: Enter a Pokémon name or ID to retrieve detailed information.
- **Pokémon Details**: View details such as type, height, weight, and sprite images (including shiny versions).
- **Random Pokémon**: Click the "Random Pokémon" button to discover a random Pokémon.
- **Evolutions**: Explore the evolution chain of each Pokémon.
- **Shiny Toggle**: Click on the Pokémon sprite to toggle between its normal and shiny versions.
- **Previous and Next Navigation**: Browse through Pokémon using the "Previous" and "Next" buttons.

## Installation

### Prerequisites
- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed.
- **npm** or **yarn**: Package manager for installing dependencies.

### Setup
1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd pokemon-finder
   ```

2. **Install Dependencies**
   Run the following command to install the required dependencies:
   ```sh
   npm install
   ```
   or, if you prefer yarn:
   ```sh
   yarn install
   ```

3. **Start the Development Server**
   Run the following command to start the app in development mode:
   ```sh
   npm start
   ```
   or, if using yarn:
   ```sh
   yarn start
   ```
   The application should open in your default browser at `http://localhost:3000`.

## Implementation Details

### Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **PokéAPI**: This app uses [PokéAPI](https://pokeapi.co/) to get all the Pokémon data.
- **CSS**: Custom CSS is used for styling, including dark mode support and gradient effects based on Pokémon type.

### Components
- **App**: The main component that manages the Pokémon search and displays navigation buttons.
- **PokemonSearch**: A form that allows users to search for a Pokémon by name or ID.
- **PokemonDisplay**: Displays detailed information about the Pokémon, including a clickable sprite for toggling between shiny and regular versions, and a list of evolution options.

### Key Features Explained
- **Search Functionality**: The app fetches data from PokéAPI based on the entered Pokémon name or ID.
- **Shiny Toggle**: Clicking on the displayed Pokémon sprite toggles between its normal and shiny versions.
- **Caching**: Pokémon data is cached in `localStorage` to minimize API requests and improve performance.
- **Responsive Design**: The app includes responsive CSS, providing an optimized experience for both desktop and mobile devices.

### CSS Styling
- The app uses a dark theme (`#0d1117` background) and custom gradients for different Pokémon types.
- The navigation and search buttons have hover effects for better user experience.
- Pokémon evolutions are displayed as clickable cards with gradients matching the primary Pokémon type.

## Folder Structure
- **src/**: Contains all source files for the project.
  - **App.js**: Main application logic.
  - **PokemonSearch.js**: Search form component.
  - **PokemonDisplay.js**: Displays Pokémon details.
  - **assets/**: Contains static assets like icons.
  - **App.css**, **PokemonDisplay.css**, **PokemonSearch.css**: CSS files for component-specific styles.

## Future Improvements
- **Advanced Search**: Add filters to search Pokémon by type, abilities, or generation.
- **Battle Simulator**: Implement a simple battle simulator between two selected Pokémon.
- **Pokémon Stats**: Display base stats like HP, Attack, and Defense for each Pokémon.

## License
This project is licensed under the MIT License.


# Wildlife Education Platform

## Project Overview
The Wildlife Education Platform is an interactive web application designed to educate users about wildlife conservation, biodiversity, and responsible pet care. The platform provides users with a seamless way to explore animals, view their details, and gain insights into their habitats and conservation status.

The platform incorporates dynamic features like:
- Interactive animal cards with search and filter options.
- Detailed animal pages with data visualization and external resources.
- A dedicated section for pet care education to foster empathy for wildlife.

---

## Features

1. **Dynamic Animal Search and Filtering**
   - Browse animals by category, location, or search term.
   - Real-time updates for selected filters and search terms.

2. **Interactive Animal Detail Pages**
   - View detailed information about each animal, including scientific and common names, conservation ranks, and distribution status.
   - Integrated Wikipedia iframe for additional resources.

3. **Educational Content**
   - Separate sections for pet care education and wildlife conservation.
   - Informative graphs and statistics visualized using modern libraries.

4. **Responsive Design**
   - Fully responsive UI optimized for devices of all sizes.
   - Dynamic layouts for mobile, tablet, and desktop views.

---

## Architecture
The platform is built using the following architecture and technologies:

- **Frontend:** Next.js with React for interactive UI components.
- **Styling:** Tailwind CSS for responsive and modern design.
- **State Management:** Local storage for persisting user-selected filters.
- **Backend:** Node.js with Express.js for API services.
- **Database:** MongoDB for managing animal data.
- **Deployment:** Hosted on Render for server-side services.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name/wildlife-education-platform.git
   ```

2. Navigate to the project directory:
   ```bash
   cd wildlife-education-platform
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     API_BASE_URL=https://wildlife-be.onrender.com/api
     ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.

---

## Usage Instructions

1. **Browse Animals:**
   - Navigate through animal cards by category or location.
   - Use the search bar to find specific animals.

2. **View Details:**
   - Click on an animal card to view detailed information.
   - Use the embedded Wikipedia iframe for further reading.

3. **Pet Care Education:**
   - Visit the "Pets" section for resources on pet care.

4. **Graphical Insights:**
   - Explore various graphs in the dedicated "Reports" section.

---

## Technologies Used

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Visualization:** Chart.js
- **Deployment:** Render

---

## Future Enhancements

1. User authentication and profiles for personalized experiences.
2. Integration of gamification for educational modules.
3. Additional resources and content on pet care and conservation efforts.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any queries or contributions, contact:
- Email: shinymrudula@gmail.com
- GitHub: [Your GitHub Profile](https://github.com/shinydidde)

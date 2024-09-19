# The Wild Oasis Website

Welcome to "The Wild Oasis Website" repository! This project is a customer-facing website for "The Wild Oasis," a boutique hotel with eight charming wooden cabins. The site enables guests to explore the hotel, view cabin details, make reservations, manage their profiles, and more.

## Table of Contents

- [Project Overview](#project-overview)
- [Functionality](#functionality)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contact Information](#contact-information)

## Project Overview

"The Wild Oasis Website" is designed to offer potential and actual guests a seamless experience while interacting with the boutique hotel. Guests can explore the hotel, learn about its cabins, check availability, and make reservations. The website is built on Next.js, leveraging Supabase as the backend to manage data related to cabins, bookings, and guests.

This website integrates directly with an internal application previously developed for the hotel's staff to manage bookings, cabins, and guest information. Both the internal application and this customer-facing website share the same Supabase database and API. This ensures that any updates made to the cabins or bookings in the internal application are immediately reflected on the customer-facing website.

## Functionality

The Wild Oasis Website offers a variety of features to enhance the user experience for guests:

1. **Explore the Hotel:** Guests can visit the `/about` page to learn more about The Wild Oasis, its offerings, and its ambiance.

2. **View Cabin Information:** The `/cabins` page allows guests to view all available cabins, with the ability to filter cabins by their maximum guest capacity.

3. **Check Cabin Details:** On the `cabins/:cabinId` page, guests can see detailed information about each cabin, including images, amenities, and booked dates.

4. **Make a Reservation:** Guests can reserve a cabin for a specific date range directly from the `cabins/:cabinId` page. Reservations are initially set to 'unconfirmed' and will be confirmed upon arrival at the property.

5. **Manage Reservations:** Logged-in guests can view their reservation history, including past and future bookings, on the `/account/reservations` page. They can also update or delete their reservations from the `/account/reservations/edit/:bookingId` page.

6. **User Authentication:** Guests must sign up and log in before they can make reservations or manage their profiles. Upon signing up, a profile is created in the database, which guests can update to expedite the check-in process.

7. **Profile Management:** Guests can update their profile information on the `/account/profile` page to ensure a smooth check-in experience when they arrive at the hotel.

## Screenshots

Here are some screenshots showcasing the key pages and functionalities of The Wild Oasis Website:

1. **Homepage:** The main landing page with links to various sections.  
   ![Homepage Screenshot](screenshots/homescreen%20of%20wild%20oasis%20website.png)

2. **Login Page:** The authentication page for guests.  
   ![Login Page Screenshot](screenshots/log%20in%20page%20of%20wild%20oasis%20website.png)

3. **About Page:** Provides detailed information about The Wild Oasis.  
   ![About Page Screenshot](screenshots/about%20page%20of%20wild%20oasis%20website.png)

4. **Booking Process:** Shows the steps involved in booking a cabin.  
   ![Booking Process Screenshot](screenshots/booking%20process%20of%20a%20cabin.png)

5. **Reservation Deletion Confirmation:** Confirms deletion of a reservation.  
   ![Deletion Confirmation Screenshot](screenshots/delete%20a%20reservation%20of%20wild%20oasis%20website.png)

6. **Profile Editing:** Allows guests to update their profile.  
   ![Profile Editing Screenshot](screenshots/edit%20profile%20page%20of%20wild%20oasis%20website.png)

7. **Reservation Editing:** Interface for editing a reservation.  
   ![Reservation Editing Screenshot](screenshots/edit%20reservation%20of%20wild%20oasis%20website.png)

8. **Cabins Page:** Displays all cabins with sorting options by capacity.  
   ![Cabins Page Screenshot](screenshots/cabins%20page%20of%20wild%20oasis%20website.png)

9. **Reservations History:** Displays a guest’s past and future reservations.  
   ![Reservations History Screenshot](screenshots/reservations%20history%20page%20of%20wild%20oasis%20website.png)

10. **Single Cabin Page:** Detailed view of an individual cabin.  
    ![Single Cabin Screenshot](screenshots/single%20cabin%20page%20of%20wild%20oasis%20website.png)

11. **Account Page:** The guest's account area with options to manage profile and reservations.  
    ![Account Page Screenshot](screenshots/guest%20area%20account%20page%20of%20wild%20oasis%20website.png)

## Technology Stack

The Wild Oasis Website is built using the following technologies and tools:

1. **Framework:** [![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/) - A React framework for building fast and scalable web applications.
2. **UI State Management:** [![Context API](https://img.shields.io/badge/Context%20API-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/docs/context.html) - For managing state across the application.
3. **Database/API:** [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/) - A backend as a service providing a PostgreSQL database with RESTful API endpoints.
4. **Styling:** [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
5. **Icons:** [![Heroicons](https://img.shields.io/badge/Heroicons-4B5563?style=flat&logo=heroicons&logoColor=white)](https://heroicons.com/) - A set of free, MIT-licensed high-quality SVG icons for React.
6. **Date Handling:** [![date-fns](https://img.shields.io/badge/date--fns-000000?style=flat&logo=date-fns&logoColor=white)](https://date-fns.org/) - A modern JavaScript date utility library.
7. **Authentication:** [![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=flat&logo=next.js&logoColor=white)](https://next-auth.js.org/) - Authentication for Next.js applications.
8. **React 18:** [![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/) - A JavaScript library for building user interfaces.
9. **Date Picker:** [![React Day Picker](https://img.shields.io/badge/React%20Day%20Picker-61DAFB?style=flat&logo=react&logoColor=white)](https://react-day-picker.js.org/) - A flexible date picker component for React.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/the-wild-oasis-website.git
   cd the-wild-oasis-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of your project and add your environment variables for Supabase, NextAuth, and other services.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   The website will be available at `http://localhost:3000`.

## Usage

Once the development server is running, you can explore the website's various functionalities:

- Visit the homepage to start exploring.
- Use the navigation bar to visit different sections, like About, Cabins, and Account.
- Sign up and log in to manage reservations and profile details.

## Contact Information

Feel free to reach out if you have any questions or suggestions!

- 📧 **Email**: [hello@paulanik.com](mailto:hello@paulanik.com)
- 🌐 **Portfolio**: [paulanik.com](https://paulanik.com)
- 💼 **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/anik-paul-dev/)
- 📝 **Dev.to**: [Dev.to Profile](https://dev.to/anikpaul)

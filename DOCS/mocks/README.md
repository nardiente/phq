Overview
The /mocks folder contains mock data files used for development, testing, and simulation of real-world data during the feature development process. These files are helpful for developers to work with realistic data formats without needing access to live databases or external services.

This folder includes example data that can be used for API responses, product data, and user information, among other things.

1. mock-api-responses.json
Purpose: Contains mock responses for the various API endpoints that are typically called during feature development. These mock responses simulate the data returned from the server, making it easier to develop and test frontend functionality without needing to rely on the actual backend.

How to Use: Use this file during development when mocking API calls. The file should be referenced to simulate server behavior, allowing you to build and test the frontend components without needing live data. Developers can also adjust this file to fit new API endpoints as they are created.
2. mock-product-data.json

Purpose: Includes sample product data to be used in developing and testing features related to products, such as product listing, product details, or product management functionalities.
How to Use: Use this file when working on features that require product data. You can import this mock data into your application or testing environments to simulate the appearance and behavior of products without needing a real database connection.

3. mock-user-data.json
Purpose: Provides mock user data that simulates user information for use in development and testing. This data is often used for features such as user profiles, authentication, and personalized content.
How to Use: Use this file for simulating user-related data in your development environment. It can be helpful for features that require login functionality, user settings, or data filtering based on user profiles.
How to Use the Mocks

Integration with Development:
Import the mock data into your project when making API requests or testing user interactions. This will help you develop the feature as if real data were available, making it easier to test UI and functionality without needing backend setup.

Customization:
Feel free to modify these mock files to better suit your development needs. If you’re working on a feature that requires different mock data, update the files or create new ones.

Testing:
Use the mock data to simulate different scenarios (e.g., error responses, large datasets) and test how your feature behaves under various conditions. You can mock multiple responses for the same endpoint to test different use cases.

Additional Notes
Realistic Data:
While the mock data is not connected to live systems, make sure to keep it as realistic as possible to simulate accurate user behavior and product data.

Version Control:
Keep the mock data files up to date with any changes made to the data structure or new endpoints that are added. This will help ensure that the mock data remains in sync with the development process.

Testing Edge Cases:
Feel free to extend the mock data files with edge cases or test scenarios that may not be represented in the current dataset. This is helpful for thorough testing.


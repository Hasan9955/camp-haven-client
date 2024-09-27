# Camp Haven 
## Link: https://camp-haven-client.vercel.app/

Welcome to **Camp Haven**, an e-commerce platform dedicated to providing high-quality camping products to outdoor enthusiasts. Whether you're planning a weekend getaway or a wilderness adventure, we have all the gear you need!

## Features

- **Wide Range of Products**: Explore a variety of camping essentials including tents, sleeping bags, backpacks, cooking equipment, and more.
- **User-Friendly Interface**: Easy navigation and a smooth shopping experience for users of all ages.
- **Detailed Product Descriptions**: Each product comes with detailed specifications to help you make informed purchasing decisions.
- **Zoom-In Functionality**: Hover over product images to zoom in and explore every detail.
- **FAQ Section**: Find answers to common questions and get tips on choosing the best gear for your needs.

## Technologies Used

- **Frontend**: Built using **React** with **TypeScript (TSX)** for type safety and **Tailwind CSS** for styling.
- **State Management**: **Redux** with **RTK Query** for handling product data and state across the app.
- **Routing**: **React Router DOM** is used for seamless page transitions and handling product details.
- **Backend**: **MongoDB** and **Mongoose** for data storage and querying.
- **Zoom Feature**: Custom hover-based zoom functionality for product images, built with JavaScript and CSS.

## How to Run the Project Locally

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud-based)
- Git

### Steps

### Clone the repository**:
```bash
   git clone https://github.com/Hasan9955/camp-haven-client.git
```

### Create a .env file in the root of project.

### In the .env file set those variables with your won value.
```
MONGODB_URL = **************
PORT = *********
```

### Run the server.

```bash
npm run dev 
```
# Proper-T Project

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
  - [Server](#server)
  - [Client](#client)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

Welcome to the Proper-T project! Proper-T is a web application that aims to simplify the process of property transactions and management. Whether you are looking to buy, sell, or rent a property, Proper-T provides a user-friendly platform to streamline the entire process. It offers features like property listings, advanced search, and secure payment options for users.

This repository contains the source code for the Proper-T web application, including both the server-side and client-side components. Please follow the instructions below to set up the project and start contributing.

## Tech Stack

### Server

The server-side of Proper-T is built using the following technologies:

- Sequelize: An ORM (Object-Relational Mapping) library for Node.js that simplifies database management with PostgreSQL.
- PostgreSQL: A powerful open-source relational database management system.
- Google Auth Library: Used for implementing Google Sign-In authentication for users.
- JWT (JSON Web Tokens): Utilized for secure user authentication and authorization.
- Express: A fast and minimalist web framework for Node.js.
- Midtrans: Integrated for secure and seamless payment processing.

### Client

The client-side of Proper-T is developed using the following technologies:

- Vue.js: A progressive JavaScript framework for building user interfaces.
- Pinia: A modern and lightweight state management system for Vue.js applications.
- Axios: A popular HTTP client for making API requests from the client-side.

## Features

- User registration and authentication with Google Sign-In.
- Property listings with detailed information, images, and location maps.
- Advanced search and filter options to find properties based on specific criteria.
- Secure payment processing for property transactions.
- User profile management and property listing management.

## Installation

To set up the Proper-T project on your local machine, follow these steps:

1. Clone this repository to your local machine using `git clone`.
2. Navigate to the server directory and install server-side dependencies with `npm install`.
3. Set up the PostgreSQL database and configure the database credentials in the server's `.env` file.
4. Start the server by running `npm start` in the server directory.
5. Navigate to the client directory and install client-side dependencies with `npm install`.
6. Start the client application with `npm run dev` in the client directory.

## Usage

Once the installation is complete, you can access the Proper-T web application by visiting `http://localhost:8000` in your web browser. You will be able to explore the various features, search for properties, and carry out property transactions securely.

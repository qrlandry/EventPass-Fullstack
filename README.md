# EventPass

EventPass is your one-stop-shop for all live event ticket distribution needs designed to compete with the likes of TicketMaster and StubHub. 

[EventPass Logo](./eventpass/src/images/logo-no-background.png)

"No hidden fees, ever." - The EventPass Team

## Project

EventPass is a single page full-stack application with full CRUD functionality designed with React for the front-end and Django for the back-end using PostgresSQL for database management. 

[EventPass Landing Page](./eventpass/src/images/landing-page.png)

## Get Started

New users can can sign into their account in order to purchase tickets or be redirected to a registeration page if they do not already have an account. When signed in, users can search for events using either the search bar or browse the catelogue of events displayed on the landing page. Clicking on the events will redirect the user to the event details page where they have the option of adding up to three tickets per account (depending on ticket availability) to their cart. The cart component allows users to remove items from their cart and to also apply discount codes if applicable. 

## EventPass Team

This project was completed by Jason Bundy, Quinn Landry, and Michael Ross. Though each member had a part in nearly all levels of the project, the responsibilities were mostly as follows:
- Jason Bundy:
  - Database design/management to include creating relations' models, model associations, serializers, and Django views
  - Establishing the proper URL's and Client model for API calls used in frontend
  - Created initial sample data uploaded to postgresql using CSV format
  - EventPass logo design and implementation
- Quinn Landry: 
  - Django auth for login and registration ensuring tokens are active for logged in sessions
  - Profile update functionality
  - Cart checkout component designed with purchase simulation
  - Update ticket counts in database
- Michael Ross: 
  - Frontend design including building the layouts of components needed for data rendering
  - Establish routes for link redirects
  - API calls to allow for data access in different components
  - Search and add to cart functionality

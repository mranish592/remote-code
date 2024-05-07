# remote-code
Collaborative online IDE with remote code execution in various languages.

## Check out the demo
  [remotecode.anishgupta.me](https://remotecode.anishgupta.me)
  ### Remote code execution demo
  Select the language as javascript, write some code. Hit run and observe the output.

  ### Real-time collaboration demo
  1. write some code, copy the URL and paste in a different browser (it could also be a different device).
  2. Make changes in one browser and observe real-time changes in another.

## Features
1. You can write and run code in different programming languages without installing the required dependencies on your system.
2. You can invite collaborators and observe real-time updates

## Technical details
1. React.js and tailwindcss is used along with moncao-react-editor for frontend.
3. HTTP and WebSockets are used to communicate with the backend.
4. Socket.io is used to sync the real-time changes along with the express.js HTTP server.
5. MongoDB is used for eventual consistency and long-term saving of collaboration rooms and the code.
6. The backend is containerized with Docker and deployed on AWS as ECS.
7. Certificates and domain mapping are added for ALB for exposing the HTTPS secure endpoint.
8. The frontend is deployed on render.com on the custom domain: [remotecode.anishgupta.me](https://remotecode.anishgupta.me)

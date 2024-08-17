# remote-code
Collaborative online code editor with remote code execution in various languages.

## Features
1. You can write and run code in different programming languages without installing the required dependencies on your system.
2. You can invite collaborators and observe real-time updates.

## Demo
  [remotecode.anishgupta.me](https://remotecode.anishgupta.me)
  ### Remote code execution demo
  Select the language as javascript, and write some code. Hit run and observe the output.
  #### **Example:**
  ```javascript
  console.log("hello world from remode code")
  ```

  ### Real-time collaboration demo
  1. Write some code, click on collaborate button to copy the URL. Paste it into a different browser/tab (it could also be a different device).
  2. Make changes in one browser and observe real-time changes in another.

## Technical details
1. React.js and tailwindcss is used along with moncao-react-editor for the frontend.
2. HTTP and WebSockets are used to communicate with the backend.
3. Socket.io is used to sync the real-time changes along with the express.js HTTP server.
4. MongoDB is used for eventual consistency and long-term saving of collaboration rooms and the code.
5. The backend is containerized with Docker and deployed on render.com (Earlier it was deployed on AWS as ECS, but swithced to render for cost savings).
6. Certificates and domain mapping are added for ALB to expose the HTTPS secure endpoint (this was part of AWS deployment, currently render is used with in-built LB and SSL support).
7. The frontend is deployed on render.com on the custom domain: [remotecode.anishgupta.me](https://remotecode.anishgupta.me)

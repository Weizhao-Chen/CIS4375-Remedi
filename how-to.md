There are 5 parts of making each table
1. front-end Vue (creates the vue)
2. header.vue (display the vue)
3. front-end index.js (connects 1 and 2)
4. back-end /custom/sometable.js (create the CRUD for backend)
5. back-end index.js (link the router of server to backend)

question: then what is connecting the front-end and the back-end?
answer: axios thats in #1.
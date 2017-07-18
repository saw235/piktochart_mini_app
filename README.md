## ReadMe

I implemented as many features as I could within the given time. On the front end I used jQuery to allow for easy element access and manipulation, and in the server side I made some changes to the API to allow for storing and retrieving sessions given a key (as a representative security feature).

Features implemented: 
1. Upload image
..1. Front-end MIME type check
2. Drag drop assets
3. Move assets in sandbox
4. Delete assets in sandbox (can be done by selecting the element and pressing Del key)
5. Save session locally
6. Save session to server
7. Retrieve session from server

You may need to run 

```
$ npm install
```

again because of some additional library that I've included in the server

### Test
Most of the features are tested manually. I had planned to write some unit tests script using the Mocha library but due to the lack of time and difficulties in visualising a convincing test plan, I decided to just submit what I currently have.
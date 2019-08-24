# dictionaryapiTest
dictionary API Test


# A set of test cases using JavaScript, Jest testing framework.

## Technologies/libraries used : axios /jest 

# Notes:
1. All the test cases are listed in the file 'testcases.xlsx'
2. Running steps(Open a terminal console):
    a. Download the repository zip file (or   git clone git@github.com:qid14/dictionaryapiTest.git).
    b. Unzip the zipfile you will find a directory named dictionaryapiTest (if you git clone the git repository, you will find the directory)
    c. Run command: cd dictionaryapiTest/
    d. Run command: npm install (or yarn )
    e. Edit the file  __test__/function.test.js, replace 'Basic YOURAUTHCODE' by your Basic Auth code, as the following shows:
        beforeAll(() => {
            basicAuth = 'Basic YOURAUTHCODE';
            console.log('1 - beforeAll', basicAuth);
        });
    f. Run command: npm i jest -g
    g. Run command: jest

3. Some details or topics:
   a.When sending a Post request to the target Url, if the response status code is 201, there should be The Location response-header field, used to redirect the recipient to a location. While this server apiary.io not provided.
   b.Basic Auth not really works.
   c.We can do some further tests, such as concurrent users send requests to the same dictionary(Performance test), 
      Big dictionary test (Lots of keys, pagination);
      Create a dictionary then Delete it, then create it again.
      Create a key in a dictionary then Delete it, then create it again.
      ......
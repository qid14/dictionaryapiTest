
import { Dictionary } from '../services/dictionary';
var basicAuth;
beforeAll(() => {
    basicAuth = 'Basic YOURAUTHCODE';
    console.log('1 - beforeAll', basicAuth);
});
afterAll(() => {
    basicAuth = "";
    console.log('1 - afterAll', basicAuth)
});
describe('Test suit for Dictionary.getDictionary()', () => {
    test('Test return all keys scenario', async () => {
        var id = "id";
        try {
            const data = await Dictionary.getDictionary(id, basicAuth);
            expect(data).toContain("count");
            expect(data).toContain("keys");
        } catch (error) {
            expect(error.message).toEqual('Dictionary Not Found');
        }
    });

    test('Get the keys with wrong credentials', async () => {
        //UnAuthrized
        var id = "id";
        var basicauth = "Basic bad";
        try {
            const data = await Dictionary.getDictionary(id, basicauth);
            expect(data).toContain("count");
            expect(data).toContain("keys");
        } catch (error) {
            expect(error.message).toEqual('Unauthrized');
        }
    });
    test('GET all the keys without credentials', async () => {
        //UnAuthrized
        var id = "id";
        var basicauth = null;
        try {
            const data = await Dictionary.getDictionary(id, basicauth);
            expect(data).toContain("count");
            expect(data).toContain("keys");
        } catch (error) {
            expect(error.message).toEqual('Unauthrized');
        }
    });

    test('Get all the keys with wrong id', async () => {
        // wrong id
        var id = "dictionary-id1";
        try {
            const data = await Dictionary.getDictionary(id, basicAuth);
            expect(data).toContain("count");
            expect(data).toContain("keys");
        } catch (error) {
            expect(error.message).toEqual('Dictionary Not Found');
        }
    });
});

describe('Test suit for Dictionary.getKeyValue()', () => {
    test('Given a key, returns a value', async () => {
        var id = "id";
        var key = "key";
        try {
            const data = await Dictionary.getKeyValue(id, key, basicAuth);
            expect(data).toHaveProperty("value", "value");
        } catch (error) {
            expect(error.message).toEqual('key is not defined');
        }
    });

    test('Given a key with wrong credentials', async () => {
        //UnAuthrized
        var id = "id";
        var basicauth = "Basic bad";
        try {
            const data = await Dictionary.getKeyValue(id, key, basicauth);
            expect(data).toContain("value");
        } catch (error) {
            expect(error.message).toEqual('key is not defined');
        }
    });
    test('Given a key without credentials', async () => {
        //UnAuthrized
        var id = "id";
        var basicauth = null;
        try {
            const data = await Dictionary.getKeyValue(id, key, basicauth);
            expect(data).toContain("value");
        } catch (error) {
            expect(error.message).toEqual('key is not defined');
        }
    });

    test('Given a key, returns not found', async () => {
        // wrong id
        var id = "dictionary-id1";
        try {
            const data = await Dictionary.getKeyValue(id, key, basicAuth);
            expect(data).toContain("value");
        } catch (error) {
            expect(error.message).toEqual('key is not defined');
        }
    });
});

describe('Test suit for Dictionary.createDictionary()', () => {
    test('Creates an empty dictionary and returns a dictionary id', async () => {
        try {
            const data = await Dictionary.createDictionary(basicAuth);
            expect(data).toContain("value");
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });

    test('Refused for wrong credentials', async () => {
        //UnAuthrized
        var basicauth = "Basic bad";
        try {
            const data = await Dictionary.createDictionary(basicauth);
            expect(data).toContain("value");
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });

    test('Refused for no credentials', async () => {
        //UnAuthrized
        var basicauth = null;
        try {
            const data = await Dictionary.createDictionary(basicauth);
            expect(data).toContain("value");
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });
});

describe('Test suit for Dictionary.createModifyKeyinDictionary()', () => {
    test('Create a key value pair in a dictionary(ALL REQUIRED PARAMETERS)', async () => {
        var id = "id";
        var key = "key1";
        var body = { "value": "Value" };
        try {
            const data = await Dictionary.createModifyKeyinDictionary(id, key, body, basicAuth);
            expect(data).toEqual(201);
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });

    test('Create a key value pair in a dictionary with empty object', async () => {
        var id = "id";
        var key = "key1";
        var body = {};
        try {
            const data = await Dictionary.createModifyKeyinDictionary(id, key, body, basicAuth);
            expect(data).toEqual(201);
        } catch (error) {
            expect(error.message).toEqual('Bad Request');
        }
    });
 
    test('Create a key value pair in a dictionary with wrong id', async () => {
        var id = "idwrong";
        var key = "key1";
        var body = {};
        try {
            const data = await Dictionary.createModifyKeyinDictionary(id, key, body, basicAuth);
            expect(data).toEqual(201);
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });

    test('Create a key value pair in a dictionary with an existed id while the key is new', async () => {
        var id = "dictionary-id";
        var key = "key1";
        var body = { "value": "Value" };
        try {
            const data = await Dictionary.createModifyKeyinDictionary(id, key, body, basicAuth);
            expect(data).toEqual(201);
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });

    test('Update the value of a existed dictionary', async () => {
        var id = "id";
        var key = "key1";
        var body = { "value": "Value" };
        try {
            const data = await Dictionary.createModifyKeyinDictionary(id, key, body, basicAuth);
            expect(data).toEqual(201);
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });
});


describe('Test suit for Dictionary.deleteDictionary()', () => {
    test('Deletes a dictionary given a dictionary id.', async () => {
        var id = "id";
        try {
            const data = await Dictionary.deleteDictionary(id, null, basicAuth);
            expect(data).toEqual(200);
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });

    test('Deletes a dictionary given a dictionary id not existed.', async () => {
        var id = "id2";
        try {
            const data = await Dictionary.deleteDictionary(id, null, basicAuth);
            expect(data).toEqual(200);
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });
    test('Deletes a Key/Value pair given the dictionary id  and key.', async () => {
        var id = "id";
        var key = "key1"
        try {
            const data = await Dictionary.deleteDictionary(id, key, basicAuth);
            expect(data).toEqual(200);
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });

    test('Deletes a Key/Value pair given the wrong dictionary id.', async () => {
        var id = "id2";
        var key = "key1";
        try {
            const data = await Dictionary.deleteDictionary(id, key, basicAuth);
            expect(data).toEqual(200);
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });

    test('Deletes a Key/Value pair given the wrong key', async () => {
        //UnAuthrized
        var basicauth = "Basic bad";
        var id = "id";
        var key = "key";
        try {
            const data = await Dictionary.deleteDictionary(id, key, basicauth);
            expect(data).toEqual(200);
        } catch (error) {
            expect(error.message).toEqual('Dictionary or Key Not Found');
        }
    });
});
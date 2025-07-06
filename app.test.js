import { expect, test } from "bun:test";

const {
    getData1,
    getData2,
    sequentialAPICalls,
    parallelAPICalls,
    fetchSequentially,
    fetchAll,
    handleResponse,
    processFile,
    postData,
    getUserData,


} = require('./app');
test('fetch data from url1', async () => {
    // arrange 
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const expected = { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
    // act
    const result = await getData1(url);
    // assert
    expect(result).toEqual(expected);
})

test('fetch data from url2', async () => {
    // arrange 
    const url = 'https://jsonplaceholder.typicode.com/todos/2'
    const expected = { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false }
    // act
    const result = await getData2(url);
    // assert
    expect(result).toEqual(expected);
})

test('fetch data from url2', async () => {
    // arrange 
    const url = 'https://jsonplaceholder.typicode.com/todo2s/2'
    const expected = { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false }
    // act
    const result = await getData2(url);
    // assert
    expect(result).toEqual({});
})

test('fetch data from url1 and url2 sequentially', async () => {
    // arrange 
    const urls = 'https://jsonplaceholder.typicode.com/todos/1'
    const expected =
    {
        r1: { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
        r2: "Leanne Graham"
    }
    // act
    const result = await sequentialAPICalls(urls);
    // assert
    expect(result).toEqual(expected);
})

test('fetch data from url1 and url2 in parallel', async () => {
    // arrange 
    const expected = [
        { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
        { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false }
    ]
    // act
    const result = await parallelAPICalls();
    // assert
    expect(result).toEqual(expected);
})

test('fetch data from urls sequentially', async () => {
    // arrange 
    const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2']
    const expected = [
        { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
        { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false }
    ]
    // act
    const result = await fetchSequentially(urls);
    // assert
    expect(result).toEqual(expected);
})

test('fetch all data', async () => {
    // arrange 
    const urls = ['https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/todos/2',
        'https://jsonplaceholder.typicode.com/todos/3'
    ]
    const expected = [
        { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
        { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false },
        {
            completed: false,
            id: 3,
            title: "fugiat veniam minus",
            userId: 1,
        }
    ]
    // act
    const result = await fetchAll(urls);
    // assert
    expect(result).toEqual(expected);
})
test('handle response', async () => {
    // arrange 
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const expected = {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
    }

    // act
    const result = await handleResponse(url);
    // assert
    expect(result).toEqual(expected);
})

test('handle response', async () => {
    // arrange 
    const url = 'https://jsonplaceholder.typicode.com/todos/xxx'
    const expected = "Failed to fetch data"

    // act
    try {
        await handleResponse(url);
    } catch (error) {
        // assert
        expect(error.message).toBe(expected);
    }


})

test('process file', async () => {
    // arrange 
    const inputFile = './package.json'
    const outputFile = './output.txt'
    // act
    await processFile(inputFile, outputFile);
    const fs = require('fs');
    const data = fs.existsSync(outputFile);
    // assert
    expect(data).toBe(true);
})

test('post data', async () => {
    // arrange 
    const data = { title: 'foo', body: 'bar', userId: 1 }
    const expected = {        
        id: 101
    }
    // act
    const result = await postData(data);
    console.log("result", result)
    // assert
    expect(result).toEqual(expected);
})

test('get user data', async () => {
    // arrange 
    const userId = 1
    const expected = {
        name: "Leanne Graham",
        email: "Sincere@april.biz"
    }
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`
    // act
    const result = await getUserData(url);
    // assert
    expect(result).toEqual(expected);

})
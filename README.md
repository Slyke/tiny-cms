# Tiny CMS

## Description
A WIP tiny CMS built in NodeJS

## Setting Up (Native)
1. Copy `secrets.json.example` and rename to `secrets.json`
2. Update with your MongoDB details.
3. Edit `settings.json` so that it uses your MongoDB server.
4. Run `npm install` to install dependencies.
5. Run `node app.js` or `npm start` to start the service.

## Setting Up (Docker)
1. Not yet implemented.

## Usage
### GET Requests

#### Get Entries by ID

This will return an entry by ID, entries by ID do not change (Unless you manually change them in the database).

```
    /byid/[id1]/[id2]/[id3]/...
```

Example:

```
    /byid/58bb3977ac73503da0c87455/58bb3977ac73503da0c67365/58bb3977ac73503da0c91056
```

Example JSON Result:
```js
    {
        "results": {
            "58bb3977ac73503da0c87455": "test!"
        },
        "noEntry": [
            "58bb3977ac73503da0c67365",
            "58bb3977ac73503da0c91056"
        ],
        "execTime": "1488673612"
    }
```

#### Get Entries by Name

You can update an entry via its name. The latest entry via a name will always be returned. You can still use older entries if you use their IDs.

```
    /byname/[name1]/[name2]/[name3]/...
```

Example:

```
    /byname/test1/test2/test3
```

Example JSON Result:
```js
    {
        "results": {
            "test1": "Hello World!"
        },
        "noEntry": [
            "test2",
            "test3"
        ],
        "execTime": "1488673612"
    }
```

#### Get Single Entry Without JSON Wrappers by ID:

```
    /single/byid/[id]
```

Example:

```
    /single/byid/58bb3977ac73503da0c87455
```

The result will be a plaintext file. If the result doesn't exist, or there is an error then an empty response will be returned.

#### Get Single Entry Without JSON wrappers by Name:

```
    /single/byname/[name]
```

Example:

```
    /single/byid/test1
```

The result will be a plaintext file. If the result doesn't exist, or there is an error then an empty response will be returned.

#### Get Detailed Entries by ID

This will return an entry by ID, entries by do not change (Unless you manually change them in the database).

```
    /details/byid/[id1]/[id2]/[id3]/...
```

Example:

```
    /details/byid/58bb3977ac73503da0c87455/58bb3977ac73503da0c67365/58bb3977ac73503da0c91056
```

Example JSON Result:
```js
    {
        "results": {
            "58bb2f1086126e15e4bbd79e": {
                "_id": "58bb2f1086126e15e4bbd79e",
                "name": "test1",
                "content": "test!",
                "createdTime": "1488662288"
            }
        },
        "noEntry": [
            "58bb3977ac73503da0c67365",
            "58bb3977ac73503da0c91056"
        ],
        "execTime": "1488685794"
    }
```

#### Get Detailed Entries by Name

You can update an entry via its name. The latest entry via a name will always be returned. You can still use older entries if you use their IDs.

```
    /details/byname/[name1]/[name2]/[name3]/...
```

Example:

```
    /details/byname/test1/test2/test3
```

Example JSON Result:
```js
    {
        "results": {
            "test1": {
                "_id": "58bb2f1086126e15e4bbd79e",
                "name": "test1",
                "content": "test!",
                "createdTime": "1488662288"
            }
        },
        "noEntry": [
            "test2",
            "test3"
        ],
        "execTime": "1488685794"
    }
```

#### Get All Entries by a Name

This will return a list of all versions of entries listed

```
    /all/byname/[name1]/[name2]/[name3]/...
```

Example:

```
    /all/byname/test1/test2/test3
```

Example JSON Result:
```js
    {
        "results": {
            "test1": [
                {
                    "_id": "58bb2f1086126e15e4bbd79e",
                    "name": "test1",
                    "content": "test!",
                    "createdTime": "1488662288"
                },
                {
                    "_id": "58bb34bf0ee3ac37ec962ad8",
                    "name": "test1",
                    "content": "another test!",
                    "createdTime": "1488663743"
                }
            ]
        },
        "noEntry": [
            "test2",
            "test3"
        ],
        "execTime": "1488685794"
    }
```

#### Get All Entries by ID

This will return an entry by ID, entries by do not change (Unless you manually change them in the database).

```
    /all/byid/[id1]/[id2]/[id3]/...
```

Example:

```
    /all/byid/58bb3977ac73503da0c87455/58bb3977ac73503da0c67365/58bb3977ac73503da0c91056
```

Example JSON Result:
```js
    {
        "results": {
            "58bb357d976d2104b0e0571c": [
                {
                    "_id": "58bb2f1086126e15e4bbd79e",
                    "name": "test1",
                    "content": "test!",
                    "createdTime": "1488662288"
                },
                {
                    "_id": "58bb34bf0ee3ac37ec962ad8",
                    "name": "test1",
                    "content": "another test!",
                    "createdTime": "1488663743"
                }
            ],
            "58bb3977ac73503da0c67365": [],
            "58bb3977ac73503da0c91056": [],
        },
        "execTime": "1488685794"
    }
```

### POST Requests

#### Add One or More Entries

POST URL:
```
    /all
```

JSON Structure:
```js
    {
        "entries":{
            EntryName: { "content": YourEntryHere},
            anotherEntryName: {"content": YourEntryHere},
            ...
        }
    }
```

Example POST JSON Body:

```js
    {
        "entries":{
            "testEntry": { "content": "First Test Entry!"},
            "anotherEntry": {"content": "Another Entry!"}
        }
    }
```

The created time will be added automatically.

## Planned Features
* UAC on all entries.
* Optional HOTP and TOTP authentication for CRUD.
* Docker support (with optional integrated MongoDB database).


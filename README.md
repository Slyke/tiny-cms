# Tiny CMS

## Description
A WIP tiny CMS built in NodeJS

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
    /detailsbyid/[id1]/[id2]/[id3]/...
```

Example:

```
    /detailsbyid/58bb3977ac73503da0c87455/58bb3977ac73503da0c67365/58bb3977ac73503da0c91056
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
    /detailsbyname/[name1]/[name2]/[name3]/...
```

Example:

```
    /detailsbyname/test1/test2/test3
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

### POST

For updating entries. None implemented yet.

## Setting Up (Native)
1. Copy `secrets.json.example` and rename to `secrets.json`
2. Update with your MongoDB details.
3. Edit `settings.json` so that it uses your MongoDB server.
4. Run `npm install` to install dependencies.
5. Run `node app.js` to start the service.

## Setting Up (Docker)
1. Not yet implemented.

## Planned Features
* UAC on all entries.
* Optional HOTP and TOTP authentication for CRUD.
* Docker support (with optional integrated MongoDB database).
* Show previous and next entries with detailed results.

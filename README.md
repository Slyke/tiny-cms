# Tiny CMS

## Description
A WIP tiny CMS built in NodeJS

## Usage
### GET Requests

#### Get entry by ID

This will return an entry by ID, entries by do not change (Unless you manually change them).

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
        "results": [
            {
                "58bb3977ac73503da0c87455": "test!"
            }
        ],
        "noEntry": [
            "58bb3977ac73503da0c67365",
            "58bb3977ac73503da0c91056"
        ],
        "execTime": "1488673612"
    }
```

#### Get entry by Name

You can update an entry via it's name. The latest entry via a name will always be returned. You can still use older entries if you use their IDs.

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
        "results": [
            {
                "test1": "Hello World!"
            }
        ],
        "noEntry": [
            "test2",
            "test3"
        ],
        "execTime": "1488673612"
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
* Optional HOTP and TOTP authentication for CRUD
* Docker support (with optional integrated MongoDB database)
* Get details about entries through API.
* When returning a single entry, do not use JSON, instead return plaintext.

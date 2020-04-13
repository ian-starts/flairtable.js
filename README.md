The Flairtable JS library. Secure Airtable for your frontend.

# Flairtable.js

This library mimics the workings described in the [airtable docs](https://airtable.com/api). It adds typescript 
definitions though. I thought it really missed that. One major problem with Airtable is that you can't directly use it 
in the frontend. Flairtable fixes that. Get your auth key [here]() and use Airtable as a regular data source, 
without worrying about security.

## Installation

### npm
```shell script
npm install flairtable
```

## Configuration

You can configure flairtable with all the stuff you're used to from Airtable:

```json
{
    apiKey: string,
    endpointUrl?: string,
    apiVersion?: string,
    noRetryIfRateLimited?: boolean,
    requestTimeout?: number
}
```

The easiest setup would be:

```js
const flairtable = Flairtable({apiKey: "test"});
const base = flairtable.base("BaseId");
// do whatever with your table here
base("tableId")
```

## Support

Currently flairtable.js only supports two mode of operations:

1. Getting a list of items.
2. Getting one item.

This is mostly because that's the simplest requires no additional security rules. 
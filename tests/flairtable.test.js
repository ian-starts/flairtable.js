import {Flairtable} from "../src";

test("see if i can fetch all", () => {
        expect.assertions(1);
        const base = Flairtable({apiKey: ""}).base("");
        const table = base("");


        const paginator = table.select({
            maxRecords: 1,
        });
        const promise = new Promise((resolve, reject) => {
                paginator.firstPage().then((records) => resolve(records));
            }
        );
        return promise.then((records) => {
            console.log(records);
            return expect(records.length).toBeGreaterThan(0);
        })
    }
);

import {Flairtable} from "../src";

test("see if i can fetch all", () => {
        expect.assertions(1);
        const base = Flairtable({}).base("");
        const table = base("");
        const paginator = table.select({
            maxRecords: 2,
            fields: [""],
            pageSize: 2,
            sort: [{field: "", direction: ""}]
        });
        const promise = new Promise(((resolve, reject) => {
            paginator.eachPage((records, fetchNextPage) => {
                return resolve([records]);
                // fetchNextPage();
            }, (error) => {
                return reject(error);
            });
        }));
        return promise.then((records) => {
            return expect(records.length).toBeGreaterThan(0);
        })
    }
);

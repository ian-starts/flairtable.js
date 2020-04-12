import {Flairtable} from "../dist";

test("see if i can fetch all", () => {
        expect.assertions(1);
        const base = Flairtable({apiKey: "123"}).base("apptvMhO0o7aFEB7m");
        const table = base("Table 1");
        const paginator = table.select();
        const promise = new Promise(((resolve, reject) => {
            paginator.eachPage((records, fetchNextPage) => {
                console.log(records);
                return resolve(records);
                // fetchNextPage();
            }, (error) => {
                return reject(error)
            });
        }));
        return promise.then((records) => {
            return expect(records.length).toBeGreaterThan(0);
        })

    }
);

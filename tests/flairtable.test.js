import {Flairtable} from "../src";

test("see if i can fetch all", () => {
        expect.assertions(1);
        const base = Flairtable({apiKey: "1234"}).base("apptvMhO0o7aFEB7m");
        const table = base("Table 1");


        const paginator = table.select({
            maxRecords: 1,
        });
        return paginator.firstPage().then((record) => {
            return expect([record].length).toBeGreaterThan(0);
        })
    }
);

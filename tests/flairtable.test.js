import {Flairtable} from "../src";

test("see if i can fetch all", () => {
        expect.assertions(1);
        const base = Flairtable({apiKey: ""}).base("");
        const table = base("Table 2");


        const paginator = table.select({
            maxRecords: 1,
        });
        return paginator.firstPage().then((record) => {
            return expect([record].length).toBeGreaterThan(0);
        })
    }
);

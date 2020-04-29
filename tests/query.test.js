import {getQueryString} from "../src/query";


test("see if it can build correct query params", () => {
        expect.assertions(1);
        const query = {
            fields: ["date", "time"],
            filterByFormula: "test=1234",
            maxRecords: 10,
            pageSize: 10,
            sort: [{field: "Date", direction: "desc"}],
            view: "Grid",
            cellFormat: "json",
            timeZone: "Eu",
            userLocale: "nl-Nl",
            offset: "ereih1"
        }
        return expect(getQueryString(query)).toBe("?fields[]=date&fields[]=time&filterByFormula=test=1234" +
            "&maxRecords=10&pageSize=10&sort[0][field]=Date&sort[0][direction]=desc&view=Grid&cellFormat=json&" +
            "timeZone=Eu&userLocale=nl-Nl&offset=ereih1");
    }
);


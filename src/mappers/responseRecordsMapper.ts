import {AirtableRecord} from "../interfaces/global.interface";

export const map = (responseRecord: any) : AirtableRecord => {
    return {
        ...responseRecord,
        getId: () => responseRecord.id,
        id: responseRecord.id,
        get: name => responseRecord.fields[name]
    }
}
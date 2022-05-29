
//jest.mock('../services/dataManager');
const DataManager = require("../services/dataManager");
describe("---------> Tests DataManager", () => {
    jest.spyOn(DataManager, 'GetAllTags').mockReturnValue(22222);
    test("Testing", () => {
        //DataManager.GetAllTags.functionToMock = jest.fn().mockReturnValue(2323);
        let result = DataManager.GetAllTags();
        console.log(result);
        expect(1).toBe(1);
    })
})


//jest.mock('../services/cacheManager');
const CacheManager = require("../services/cacheManager");
describe("---------> Tests CacheManager", () => {
    jest.spyOn(CacheManager, 'GetAllTags').mockReturnValue(22222);
    test("Testing", () => {
        //CacheManager.GetAllTags.functionToMock = jest.fn().mockReturnValue(2323);
        let result = CacheManager.GetAllTags();
        console.log(result);
        expect(1).toBe(1);
    })
})
